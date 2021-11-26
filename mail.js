const nodemailer = require('nodemailer');

var emailService = {};

"use strict";
async function main(mailOptions) {
  let transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
      user: 'iamherepadma',
      pass: 'Iam_herePadma',
    },
  });

  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
}

emailService.rawData = function (reciver1, reciver2, start_time, end_time) {
  var mailOptions = {
    from: 'iamherepadma@gmail.com',
    to: reciver1 + ", " + reciver2,
    subject: 'Interview Scheduled!',
    text: "Your interview is scheduled from " + start_time.toString() + " to " + end_time.toString(),
  };
  main(mailOptions).catch(console.error);
}


module.exports = emailService;