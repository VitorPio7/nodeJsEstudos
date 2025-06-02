const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
//name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You have to put a name']
  },
  email: {
    type: String,
    required: [true, 'An email has to be send'],
    unique: true,
    trim: true,
    lowercase: true,
    validator: [validator.isEmail, 'Please provid a valid email'] /*verifica se esse email é válido */
  },
  photo: String,
  password: {
    type: String,
    trim: true,
    required: [true, 'You must have to put the password.'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'You must have to confirm the password.'],
    validate: {
      //This only works on SAVE!!!
      validator: function(el) {
        return el === this.password; //verificacao pra ver se as senhas sao iguais//
      },
      message: 'Passwords are not the same'
    }
  },
  passwordChangedAt: Date,
  role:{/*rega pelo qual define o tipo de usuário do site */
    type: String,
    enum: {
      values: ['user', 'guide', 'lead-guide', 'admin'],
      message: 'Role must be either user, guide, lead-guide, or admin'
    },
    default: 'user'
  },
  active: { /*novo campo para definir se o usuário vai desativar a conta */
    type: Boolean,
    default: true,
    select: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date
});
/*esse midleware tem o papel de encripitar a senha antes de ser processada para o DB */
userSchema.pre('save', async function(next) {
  //Roda essa funcao se a senha for de fato modificada
  if (!this.isModified('password')) return next();
  //Hash a senha com o custo de 12, sendo esse número escolhido para velocidade e segurança
  this.password = await bcrypt.hash(this.password, 12);
  //Deleta o campo do passwordConfirm garante que não seja salvo no DB pois nao tem necessidade.
  this.passwordConfirm = undefined;
  next();
});

/*middleware responsável por dizer se a senha do JWT é igual ao do usuário, para isso é necessário usar o bcrypt para descriptar novamente*/
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.pre('save', function(next) {
  /*roda somente essa funcao se a senha estiver se fato modificada */
  if (!this.isModified(`password`) || this.isNew) return next();
  /*esse milissegundos serve para deixar a data mais apurada */
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
/*Schema que verifica se mudou a senha */
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function() {
  /*criacao do resetToken, que é um token simples aleatório*/
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;