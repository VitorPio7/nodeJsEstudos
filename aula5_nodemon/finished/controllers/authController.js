const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel'); /*pegar o model user*/
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

/*funcao responsável por criar o token */
const signToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

/*criação de um novo usuário com um novo token*/
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');/*'+password serve para definir que isso nao é para mostrar no retorno' */
  //verificacao do JWT apartir do middleware criado//
  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new AppError('Incorrect email or password', 401));
  }
  console.log(user);
  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // 2) Verification token, como o pacote do jwt nao retorna uma promise, precisamos colocar o promisify para poder retornar uma promise
  const decoded = await promisify(jwt.verify(token, process.env.JW_SECRET));
  // 3) Check if user still exists
  const foundUser = await User.findById(decoded.id);
  if (!foundUser) {
    return next(
      new AppError('The user belonging to this user does no longer exist.', 401)
    );
  }
  // 4) Check if user changed password after the JWT was issued
  if (foundUser.changesPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please log in again', 401)
    );
  }
  req.user = foundUser;
  next();
});
exports.restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      );
    }
    next();
  };
};
exports.forgotPassword = catchAsync(async (req, res, next) => {
  /*pega o usario baseado no corpo da requisicao */
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }
  //Gera um reset token aleatório
  //Envia para o email do usuário
  next();
});