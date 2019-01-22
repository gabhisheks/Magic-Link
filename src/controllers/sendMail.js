let nodemailer = require("nodemailer");
require('dotenv').load();

// create mail transporter
let transporter = nodemailer.createTransport({
  "service": "gmail",
  "auth": {
    "user": "gupta137abhishek0@gmail.com",
    "pass": process.env.PASSWORD
  }
});

let mailOptions = {
  "from": "gupta137abhishek0@gmail.com",
  "to": "abhishekg@prdxn.com",
  "subject": `Not a GDPR update ;)`,
  "text": `Hi there, this email was automatically sent by us`
};
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    throw error;
  } else {
    console.log("Email successfully sent!");
  }
});
