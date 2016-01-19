var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "plant.stackstore@gmail.com",
    pass: "1511Fullstack"
  }
});

exports.send = function(req,res){
  var mailOptions = {
    to: "plant.stackstore@gmail.com",
    subject: 'New request on lumbajack from ',
    from: req.data.from,
    html: req.data.body
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
    }else{
      console.log('Message sent: ' + info.response);
    }
  });
}