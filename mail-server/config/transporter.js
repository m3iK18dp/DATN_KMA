const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  auth: {
    user: "support@finystyle.com",
    pass: "R1csR6u9G4jm",
    // "BUHdQp5uSRS9",
  },
});

module.exports = transporter;
