const nodemailer = require("nodemailer");

/**
 * Sends an email using a transport as defined in config file.
 * @param {Object} options
 */
const sendEmail = async (options) => {
  // Create transporter object
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  const message = {
    from: `'${process.env.FROM_NAME}' <${process.env.FROM_EMAIL}>`,
    to: options.recipients.join(","),
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
