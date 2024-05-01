const nodeemailer = require("nodemailer");

const sendEmail = async (options) => {
  //Crete a transporter
  const transporter = nodeemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //Define the email options
  const emailOptions = {
    from: "AFADMIN <nisal.nn24@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //send the email
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
