const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASS,
  },
});

exports.sendMail = async (receiver, content, subject) => {
  try {  
    await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: receiver, // list of receivers
      subject: subject, // Subject line
      // text: "Hello world", // plain text body
      html: content, // html body
    });
  } catch (e) {
    console.log(e);
  }
};
