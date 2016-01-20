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
    to: req.body.userID.email,
    subject: 'An Update to your Order',
    from: "plant.stackstore@gmail.com",
    text: 'Your order of ' + req.body.productString + ' has changed to status ' + req.body.status
  };

transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
    }else{
      console.log('Message sent: ' + info.response);
    }
  });
}