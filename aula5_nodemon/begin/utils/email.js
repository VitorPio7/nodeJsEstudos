const nodemailer = require('nodemailer');

const sendEmail = async options => {
  //Criação do transporter (a ferramenta que vai ser usada para enviar o email);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  // Definir as opcioes de email//
  const mailOptions = {
    from: 'Vitor Pio <hello@jonas.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  // Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;