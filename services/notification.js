const notifier = require('node-notifier');
const nodemailer = require('nodemailer');
const config = require('../config.json');

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: config.email.auth,
});

const sendNotification = (site, status) => {
  const message = `${site.url} is now ${status}`;
  notifier.notify({ title: 'Site Status Checker', message });

  const mailOptions = {
    from: config.email.auth.user,
    to: config.email.to,
    subject: 'Site Status Update',
    text: message,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) console.error(`Failed to send email: ${error}`);
  });
};

module.exports = { sendNotification };
