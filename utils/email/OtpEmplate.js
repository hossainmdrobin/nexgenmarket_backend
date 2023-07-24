const jwt = require("jsonwebtoken");

exports.otpTemplate = (otpObj) => {
  const token = jwt.sign(otpObj, process.env.JWT_SECRET);
  const link = `${process.env.CLIENT_URL}/verify_link/${token}?use_case=signup`;
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <p style="text-align: center;">Thank you for signing up. Now click The "Verify" button to verify your email</p>
        <div style="text-align: center;"><a  href="${link}">Verify account</a></div>


    </div>
</body>
</html>
  `;
};
