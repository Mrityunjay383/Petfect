const nodemailer = require('nodemailer');

function recieveMessage(req, res){

  const output = `
      Mail from ${req.contactDetails.name}, ${req.contactDetails.email}
      <br />
      ${req.contactDetails.message}
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
    from:  `${req.contactDetails.name} <mrityunjayvyasmhl@gmail.com>`,
    to: `mrityunjayvyasbhl@gmail.com`, //Change reciving email here
    subject: `${req.contactDetails.subject}`,
    text: '',
    html: output
  };

   transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      res.redirect("/");
      console.log('Email sent: ' + info.response);
    }
  });

}

module.exports = {recieveMessage}
