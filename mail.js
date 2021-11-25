const nodemailer = require('nodemailer'); 
var format = require('date-format');


var emailService = {};

transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iamherepadma',
    pass: 'Iam_herePadma'
  }
});

var mailOptions = {
  from: 'iamherepadma@gmail.com',
  to: '',
  subject: 'Interview Scheduled!',
  text: ''
};
emailService.rawData = function(reciver1,reciver2,start_time,end_time){
    mailOptions.to = reciver1 + ", " + reciver2;
    start_time = format('dd-MM-yyyy hh:mm', start_time);
    end_time = format('dd-MM-yyyy hh:mm', end_time);
    mailOptions.text = "Your interview is scheduled from " + start_time.toString() + " to " + end_time.toString();
    transporter.sendMail(mailOptions,  function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = emailService;