const mongoose = require('mongoose');
const dotenv = require('dotenv');

/*lida com os error do mogoose */
process.on('uncaughtException', err => {
  console.log('UNHANDLER EXCEPTION! 💥 Shutting down...');
  /*permite fechar o servidor primeiro e depois o DB */
  process.exit(1); /**processo que realiza o desligamento do DB */
});
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.log('ERROR'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
/*lida com os error do mogoose */
process.on('unhandledRejection', err => {
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  /*permite fechar o servidor primeiro e depois o DB */
  server.close(() => {
    process.exit(1); /**processo que realiza o desligamento do DB */
  });
});
