const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
    pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
  },
});

exports.sendMail = async (receiver, content, subject) => {
  try {
    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: receiver, // list of receivers
      subject: subject, // Subject line
      text: "Hello world?", // plain text body
      html: content, // html body
    });
  } catch (e) {
    console.log(e);
  }
};
