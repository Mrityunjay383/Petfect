const nodemailer = require('nodemailer');

function sendOtp(emailId){

  let otp = Math.floor(Math.random() * 10000);

  const output = `
    <div style="text-align: center">
      <h3>OTP: ${otp}</h3>
      <p><b>Thank you for showing interest in Petfect.</b></p>
    </div>
  `;

  var transporter = nodemailer.createTransport({

    service: 'gmail',
    secureConnection: true,
    auth: {
      user: 'petfect1001@gmail.com',
      pass: 'pcxnwevtmmegabog'
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
      secureProtocol: "TLSv1_method"
    }
  });

  var mailOptions = {
    from:  `Petfect<petfect1001@gmail.com>`,
    to: emailId, //Change reciving email here
    subject: `OTP for Registration`,
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
