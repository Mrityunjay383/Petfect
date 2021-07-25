const nodemailer = require('nodemailer');

function sendOtp(emailId){

  let otp = Math.floor(Math.random() * 10000);

  const output = `
      <p>Your Otp for registering on Petfect is: ${otp}</p>
  `;

  var transporter = nodemailer.createTransport({

    service: 'gmail',
    secureConnection: true,
    auth: {
      user: 'mrityunjayvyasmhl@gmail.com',
      pass: 'bsgyfpjawmvxajtn'
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
      secureProtocol: "TLSv1_method"
    }
  });

  var mailOptions = {
    from:  `<mrityunjayvyasmhl@gmail.com>`,
    to: emailId, //Change reciving email here
    subject: `Petfect Register`,
    text: '',
    html: output
  };

   transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return otp;
}

module.exports = { sendOtp };
