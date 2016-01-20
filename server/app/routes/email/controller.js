var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "plant.stackstore@gmail.com",
    pass: "1511Fullstack"
  }
});

exports.send = function(req,res){
  console.log("req", req.body);
  var mailOptions = {
    to: "plant.stackstore@gmail.com",
    subject: 'An Update to your Order',
    from: "plant.stackstore@gmail.com",
    text: 'This is a body' + req.body.body
  };

transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
    }else{
      console.log('Message sent: ' + info.response);
    }
  });
}