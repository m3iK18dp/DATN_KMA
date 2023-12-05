const moment = require("moment");
const MailService = require("../config/transporter");

const sendMailResetPassword = async (req, res, next) => {
  const { email, token, time } = req.body;
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "Reset Password",
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center">
            Reset Password
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            This mail is sent from the Hyper Wallet application, effective within 3 minutes from the time you receive this mail. Please do not share this email with anyone. Click the key below to change the password:
          </div>
        </div>
        <div style="margin-top: 20px; text-align: center;">
          <a href="http://localhost:5173/forget-password?token=${token}">
            <button class="button-normal"
              style="width: 200px; height: 40px; background-color: #3c5638cc; color: white; border-radius: 5px; margin: 0 5px; padding: 8px; font-family: 'Times New Roman', Times, serif;"
              onMouseOver="(e) => { e.currentTarget.style.backgroundColor = '#3c5638e5'; e.currentTarget.style.cursor = 'pointer';}"
              onMouseOut="(e) => { e.currentTarget.style.backgroundColor = '#3c5638cc'; }"
            >
              Reset Your Password
            </button>
          </a>
        </div>
        <div style="text-align: right; width: 100%; font-family: 'Times New Roman', Times, serif; font-size: 15px; line-heigh: 15px; font-style: italic; margin: 15px 0px">  
              Time: ${time}
        </div> 
      </div>
    </div>
    <style>
      /* Thêm CSS cho trạng thái khác nhau */
      .button-normal:hover {
        background-color: #3c5638e5;
        cursor: pointer;
      }
      .button-disabled {
        background-color: #999999;
        cursor: not-allowed;
      }
    </style>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail Reset Password to " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail Reset Password to " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailOTPLogin = async (req, res, next) => {
  const { email, otp, time } = req.body;
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "Login OTP",
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center">
            Login OTP
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            Welcome to HyperWallet!
          </div>
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            This mail is sent from the Hyper Wallet application, effective within 2 minutes from the time you receive this mail. Please do not share this email with anyone.
          </div>
        </div>
        <div style="margin-top: 20px; text-align: center; font-size: 20px; font-family: 'Times New Roman'; font-style: italic">
          Your OTP for login is: <strong style="font-size: 25px; font-style: none">${otp}</strong>
        </div>
        <div style="text-align: right; width: 100%; font-family: 'Times New Roman', Times, serif; font-size: 15px; line-heigh: 15px; font-style: italic; margin: 15px 0px">  
              Time: ${time}
        </div> 
      </div>
    </div>
    <style>
      /* Thêm CSS cho trạng thái khác nhau */
      .button-normal:hover {
        background-color: #3c5638e5;
        cursor: pointer;
      }
      .button-disabled {
        background-color: #999999;
        cursor: not-allowed;
      }
    </style>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail OTP Login to " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail OTP Login to " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailOTPRegister = async (req, res, next) => {
  const { email, otp, time } = req.body;
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "Registration OTP",
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center">
            Registration OTP
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            Welcome to HyperWallet!
          </div>
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            This mail is sent from the Hyper Wallet application, effective within 2 minutes from the time you receive this mail. Please do not share this email with anyone.
          </div>
        </div>
        <div style="margin-top: 20px; text-align: center; font-size: 20px; font-family: 'Times New Roman'; font-style: italic">
          Your OTP for registration is: <strong style="font-size: 25px; font-style: none">${otp}</strong>
        </div>
        <div style="text-align: right; width: 100%; font-family: 'Times New Roman', Times, serif; font-size: 15px; line-heigh: 15px; font-style: italic; margin: 15px 0px">  
              Time: ${time}
        </div> 
      </div>
    </div>
    <style>
      /* Thêm CSS cho trạng thái khác nhau */
      .button-normal:hover {
        background-color: #3c5638e5;
        cursor: pointer;
      }
      .button-disabled {
        background-color: #999999;
        cursor: not-allowed;
      }
    </style>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail OTP Register to " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail OTP Register to " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailOTPTransaction = async (req, res, next) => {
  const { email, otp, time } = req.body;
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "Confirmation OTP",
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center">
            Confirmation OTP
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            Welcome to HyperWallet!
          </div>
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            This mail is sent from the Hyper Wallet application, effective within 2 minutes from the time you receive this mail. Please do not share this email with anyone.
          </div>
        </div>
        <div style="margin-top: 20px; text-align: center; font-size: 20px; font-family: 'Times New Roman'; font-style: italic">
          Your OTP to confirm the transaction is: <strong style="font-size: 25px; font-style: none">${otp}</strong>
        </div>
        <div style="text-align: right; width: 100%; font-family: 'Times New Roman', Times, serif; font-size: 15px; line-heigh: 15px; font-style: italic; margin: 15px 0px">  
              Time: ${time}
        </div> 
      </div>
    </div>
    <style>
      /* Thêm CSS cho trạng thái khác nhau */
      .button-normal:hover {
        background-color: #3c5638e5;
        cursor: pointer;
      }
      .button-disabled {
        background-color: #999999;
        cursor: not-allowed;
      }
    </style>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail OTP Transaction to " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail OTP Transaction to " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailThankyou = async (req, res, next) => {
  const { email, user } = req.body;
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "Thank You",
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center">
            Thank You
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            Thank you for choosing HyperWallet!
          </div> 
          <hr style="border: 2px solid black; width: 100%">
          <div style="margin: 10px auto; width: 600px">
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; font-style: italic; margin: 15px 0px">  
              Your account information
            </div> 
            <div style="display: flex; margin: 5px">
              <span style="display: inline-block; width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">First Name</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.firstName}</span>
            </div>
            <div style="display: flex; margin: 5px">
              <span style="display: inline-block; width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Last Name</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.lastName}</span>
            </div>
            <div style="display: flex; margin: 5px">
              <span style="display: inline-block; width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Email</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.email}</span>
            </div>
            <div style="display: flex; margin: 5px">
              <span style="display: inline-block; width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Password</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.password}</span>
            </div>
            <div style="display: flex; margin: 5px">
              <span style="display: inline-block; width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Address</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.address}</span>
            </div>
            <div style="display: flex; margin: 5px">
              <span style="display: inline-block; width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Phone Number</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style>
      /* Thêm CSS cho trạng thái khác nhau */
      .button-normal:hover {
        background-color: #3c5638e5;
        cursor: pointer;
      }
      .button-disabled {
        background-color: #999999;
        cursor: not-allowed;
      }
    </style>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail Thank You to " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail Thank You to " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailTransactionVerify = async (req, res, next) => {
  const { email, transaction, time } = req.body;
  const styleType = {
    DEPOSIT: "#013462",
    WITHDRAW: "#780000",
    TRANSFER: "#007812",
    CREDITED: "#777800",
  };
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "Verify Transaction",
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center; color: green">
            Verify Transaction
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            Thank you for banking with HyperWallet!
          </div> 
          <hr style="border: 2px solid black; width: 100%">
          <div style="margin: 10px auto; width: 600px">
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; font-style: italic; margin: 15px 0px">  
              Transaction Information
            </div> 
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Transaction Code</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.transactionCode
      }</span>
            </div>
             <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Transaction Type</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; color:${styleType[transaction.transactionType]
      }">${transaction.transactionType}</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Transaction Time</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${moment(
        transaction.transactionTime
      ).format("MMMM DD, YYYY hh:mm A")}</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Amount</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.amount.toLocaleString(
        "vi-VN",
        {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        }
      )}</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">${transaction.transactionType === "TRANSFER" ? "Sender" : "Source"
      }</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.senderAccountNumber +
      " - " +
      transaction.senderFullName
      }</span>
            </div>
            ${transaction.transactionType === "TRANSFER"
        ? `<div style="margin: 5px">
                <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Recipient</span>
                <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
                <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">` +
        transaction.recipientAccountNumber +
        " - " +
        transaction.recipientFullName +
        `</span>
              </div>`
        : ""
      }
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Description</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.description
      }</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Status</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; color:${transaction.transactionStatus === "SUCCESS" ? "green" : "red"
      }">${transaction.transactionStatus}</span>
            </div>
            <div style="text-align: right; width: 100%; font-family: 'Times New Roman', Times, serif; font-size: 15px; line-heigh: 15px; font-style: italic; margin: 15px 0px">  
              Time: ${moment(time).format("MMMM DD, YYYY hh:mm A")}
            </div> 
          </div>
        </div>
      </div>
    </div>
    <style>
      /* Thêm CSS cho trạng thái khác nhau */
      .button-normal:hover {
        background-color: #3c5638e5;
        cursor: pointer;
      }
      .button-disabled {
        background-color: #999999;
        cursor: not-allowed;
      }
    </style>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail Transaction Verify to " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail Transaction Verify to " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailTransactionVerifyToAdmin = async (req, res, next) => {
  const { email, transaction, time } = req.body;
  const styleType = {
    DEPOSIT: "#013462",
    WITHDRAW: "#780000",
    TRANSFER: "#007812",
    CREDITED: "#777800",
  };
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "Verify Transaction",
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center; color: green">
            Verify Transaction
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            Event listened to from Database
          </div> 
          <hr style="border: 2px solid black; width: 100%">
          <div style="margin: 10px auto; width: 600px">
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; font-style: italic; margin: 15px 0px">  
              Transaction Information
            </div> 
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Transaction Code</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.transactionCode
      }</span>
            </div>
             <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Transaction Type</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; color:${styleType[transaction.transactionType]
      }">${transaction.transactionType}</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Transaction Time</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${moment(
        transaction.transactionTime
      ).format("MMMM DD, YYYY hh:mm A")}</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Amount</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.amount.toLocaleString(
        "vi-VN",
        {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        }
      )}</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">${transaction.transactionType === "TRANSFER" ? "Sender" : "Source"
      }</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.senderAccountNumber +
      " - " +
      transaction.senderFullName
      }</span>
            </div>
            ${transaction.transactionType === "TRANSFER"
        ? `<div style="margin: 5px">
                <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Recipient</span>
                <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
                <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">` +
        transaction.recipientAccountNumber +
        " - " +
        transaction.recipientFullName +
        `</span>
              </div>`
        : ""
      }
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Description</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.description
      }</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Status</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; color:${transaction.transactionStatus === "SUCCESS" ? "green" : "red"
      }">${transaction.transactionStatus}</span>
            </div>
            <div style="text-align: right; width: 100%; font-family: 'Times New Roman', Times, serif; font-size: 15px; line-heigh: 15px; font-style: italic; margin: 15px 0px">  
              Time: ${moment(time).format("MMMM DD, YYYY hh:mm A")}
            </div> 
          </div>
        </div>
      </div>
    </div>
    <style>
      /* Thêm CSS cho trạng thái khác nhau */
      .button-normal:hover {
        background-color: #3c5638e5;
        cursor: pointer;
      }
      .button-disabled {
        background-color: #999999;
        cursor: not-allowed;
      }
    </style>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail Transaction Verify to " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail Transaction Verify to " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailTransactionVerifyToRecipient = async (req, res, next) => {
  const { email, transaction, time } = req.body;
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "Verify Transaction",
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center; color: green">
            Verify Transaction
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            Thank you for banking with HyperWallet!
          </div> 
          <hr style="border: 2px solid black; width: 100%">
          <div style="margin: 10px auto; Width: 600px">
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; font-style: italic; margin: 15px 0px">  
              Transaction Information
            </div> 
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Transaction Code</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.transactionCode
      }</span>
            </div>
             <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Transaction Type</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; color: #777800">CREDITED</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Transaction Time</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${moment(
        transaction.transactionTime
      ).format("MMMM DD, YYYY hh:mm A")}</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Amount</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.amount.toLocaleString(
        "vi-VN",
        {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        }
      )}</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Sender</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.senderAccountNumber +
      " - " +
      transaction.senderFullName
      }</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Recipient</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">
                ${transaction.recipientAccountNumber +
      " - " +
      transaction.recipientFullName
      }
              </span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Description</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${transaction.description
      }</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Status</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; color:${transaction.transactionStatus === "SUCCESS" ? "green" : "red"
      }">${transaction.transactionStatus}</span>
            </div>
            <div style="text-align: right; width: 100%; font-family: 'Times New Roman', Times, serif; font-size: 15px; line-heigh: 15px; font-style: italic; margin: 15px 0px">  
              Time: ${moment(time).format("MMMM DD, YYYY hh:mm A")}
            </div> 
          </div>
        </div>
      </div>
    </div>
    <style>
      /* Thêm CSS cho trạng thái khác nhau */
      .button-normal:hover {
        background-color: #3c5638e5;
        cursor: pointer;
      }
      .button-disabled {
        background-color: #999999;
        cursor: not-allowed;
      }
    </style>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail Transaction Verity to Recipient: " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail Transaction Verity to Recipient: " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailTransactionNotVerify = async (req, res, next) => {
  const { email, transaction, changedTransaction, time, type } = req.body;
  const styleType = {
    DEPOSIT: "#013462",
    WITHDRAW: "#780000",
    TRANSFER: "#007812",
    CREDITED: "#777800",
  };
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "IMPORTANT! NOT Verify Transaction",
    headers: { "X-Priority": "1 (Highest)" },
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center; color: red">
            NOT Verify Transaction
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            Your transaction history has been tampered with! But don't worry too much, because our HyperWallet system has automatically restored the transaction to the old state.
          </div> 
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            We sincerely apologize for disturbing you! To clarify the issue, please contact HyperWallet to better understand this issue.
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="margin: 10px 10px 10px 20%">
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; font-style: italic; margin: 15px 0px">  
              Transaction history information has been ${type}D  
            </div> 
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.transactionCode !==
        changedTransaction.transactionCode
        ? "color: red"
        : ""
      }">Transaction Code</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.transactionCode !==
        changedTransaction.transactionCode
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.transactionCode !==
        changedTransaction.transactionCode
        ? "color: red"
        : ""
      }">
                ${transaction.transactionCode +
      (transaction.transactionCode !==
        changedTransaction.transactionCode
        ? " &rarr; " + changedTransaction.transactionCode
        : "")
      }
              </span>
            </div>
             <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.transactionType !==
        changedTransaction.transactionType
        ? "color: red"
        : ""
      }">Transaction Type</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.transactionType !==
        changedTransaction.transactionType
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; 
                ${transaction.transactionType !==
        changedTransaction.transactionType
        ? "color: red"
        : `color:${styleType[transaction.transactionType]}`
      }
              ">
                ${transaction.transactionType +
      (transaction.transactionType !==
        changedTransaction.transactionType
        ? " &rarr; " + changedTransaction.transactionType
        : "")
      }
              </span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.transactionTime !==
        changedTransaction.transactionTime
        ? "color: red"
        : ""
      }">Transaction Time</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.transactionTime !==
        changedTransaction.transactionTime
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.transactionTime !==
        changedTransaction.transactionTime
        ? "color: red"
        : ""
      }">
                ${moment(transaction.transactionTime).format(
        "MMMM DD, YYYY hh:mm A"
      ) +
      (transaction.transactionTime !==
        changedTransaction.transactionTime
        ? " &rarr; " +
        moment(changedTransaction.transactionTime).format(
          "MMMM DD, YYYY hh:mm A"
        )
        : "")
      }
              </span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.amount !== changedTransaction.amount
        ? "color: red"
        : ""
      }">Amount</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.amount !== changedTransaction.amount
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.amount !== changedTransaction.amount
        ? "color: red"
        : ""
      }">
                ${transaction.amount +
      (transaction.amount !== changedTransaction.amount
        ? " &rarr; " + changedTransaction.amount
        : ""
      ).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      })
      }
              </span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.senderAccountNumber !==
        changedTransaction.senderAccountNumber ||
        transaction.senderFullName !== changedTransaction.senderFullName
        ? "color: red"
        : ""
      }">${transaction.transactionType === "TRANSFER" ? "Sender" : "Source"
      }</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.senderAccountNumber !==
        changedTransaction.senderAccountNumber ||
        transaction.senderFullName !== changedTransaction.senderFullName
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.senderAccountNumber !==
        changedTransaction.senderAccountNumber ||
        transaction.senderFullName !== changedTransaction.senderFullName
        ? "color: red"
        : ""
      }">
                ${transaction.senderAccountNumber +
      (transaction.senderAccountNumber !==
        changedTransaction.senderAccountNumber
        ? " &rarr; " + changedTransaction.senderAccountNumber
        : "") +
      " - " +
      (transaction.senderFullName +
        (transaction.senderFullName !==
          changedTransaction.senderFullName
          ? " &rarr; " + changedTransaction.senderFullName
          : ""))
      }
              </span>
            </div>
            ${transaction.transactionType === "TRANSFER"
        ? `<div style="margin: 5px">
                <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.recipientAccountNumber !==
          changedTransaction.recipientAccountNumber ||
          transaction.recipientFullName !==
          changedTransaction.recipientFullName
          ? "color: red"
          : ""
        }">Recipient</span>
                <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.recipientAccountNumber !==
          changedTransaction.recipientAccountNumber ||
          transaction.recipientFullName !==
          changedTransaction.recipientFullName
          ? "color: red"
          : ""
        }">:</span>
                <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.recipientAccountNumber !==
          changedTransaction.recipientAccountNumber ||
          transaction.recipientFullName !==
          changedTransaction.recipientFullName
          ? "color: red"
          : ""
        }">` +
        (transaction.recipientAccountNumber +
          (transaction.recipientAccountNumber !==
            changedTransaction.recipientAccountNumber
            ? " &rarr; " + changedTransaction.recipientAccountNumber
            : "")) +
        " - " +
        (transaction.recipientFullName +
          (transaction.recipientFullName !==
            changedTransaction.recipientFullName
            ? " &rarr; " + changedTransaction.recipientFullName
            : "")) +
        `</span>
              </div>`
        : ""
      }
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.description !== changedTransaction.description
        ? "color: red"
        : ""
      }">Description</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.description !== changedTransaction.description
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.description !== changedTransaction.description
        ? "color: red"
        : ""
      }">
                ${transaction.description +
      (transaction.description !== changedTransaction.description
        ? " &rarr; " + changedTransaction.description
        : "")
      }
              </span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.transactionStatus !==
        changedTransaction.transactionStatus
        ? "color: red"
        : ""
      }">Status</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.transactionStatus !==
        changedTransaction.transactionStatus
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.transactionStatus !==
        changedTransaction.transactionStatus
        ? "color: red"
        : `color:${transaction.transactionStatus === "SUCCESS"
          ? "green"
          : "red"
        }`
      }">
                ${transaction.transactionStatus +
      (transaction.transactionStatus !==
        changedTransaction.transactionStatus
        ? " &rarr; " + changedTransaction.transactionStatus
        : "")
      }
              </span>
            </div>
            <div style="text-align: right; width: 100%; font-family: 'Times New Roman', Times, serif; font-size: 15px; line-heigh: 15px; font-style: italic; margin: 15px 0px">  
              Time: ${moment(time).format("MMMM DD, YYYY hh:mm A")}
            </div> 
          </div>
        </div>
      </div>
    </div>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail Transaction NOT Verity to " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail Transaction NOT Verity to " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailTransactionNotVerifyToAdmin = async (req, res, next) => {
  const { email, transaction, changedTransaction, time, type } = req.body;
  const styleType = {
    DEPOSIT: "#013462",
    WITHDRAW: "#780000",
    TRANSFER: "#007812",
    CREDITED: "#777800",
  };
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "IMPORTANT! NOT Verify Transaction",
    headers: { "X-Priority": "1 (Highest)" },
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center; color: red">
            NOT Verify Transaction
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
             Event listened to from Database
          </div> 
          <hr style="border: 2px solid black; width: 100%">
          <div style="margin: 10px 10px 10px 20%">
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; font-style: italic; margin: 15px 0px">  
              Transaction history information has been ${type}D  
            </div> 
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.transactionCode !==
        changedTransaction.transactionCode
        ? "color: red"
        : ""
      }">Transaction Code</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.transactionCode !==
        changedTransaction.transactionCode
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.transactionCode !==
        changedTransaction.transactionCode
        ? "color: red"
        : ""
      }">
                ${transaction.transactionCode +
      (transaction.transactionCode !==
        changedTransaction.transactionCode
        ? " &rarr; " + changedTransaction.transactionCode
        : "")
      }
              </span>
            </div>
             <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.transactionType !==
        changedTransaction.transactionType
        ? "color: red"
        : ""
      }">Transaction Type</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.transactionType !==
        changedTransaction.transactionType
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; 
                ${transaction.transactionType !==
        changedTransaction.transactionType
        ? "color: red"
        : `color:${styleType[transaction.transactionType]}`
      }
              ">
                ${transaction.transactionType +
      (transaction.transactionType !==
        changedTransaction.transactionType
        ? " &rarr; " + changedTransaction.transactionType
        : "")
      }
              </span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.transactionTime !==
        changedTransaction.transactionTime
        ? "color: red"
        : ""
      }">Transaction Time</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.transactionTime !==
        changedTransaction.transactionTime
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.transactionTime !==
        changedTransaction.transactionTime
        ? "color: red"
        : ""
      }">
                ${moment(transaction.transactionTime).format(
        "MMMM DD, YYYY hh:mm A"
      ) +
      (transaction.transactionTime !==
        changedTransaction.transactionTime
        ? " &rarr; " +
        moment(changedTransaction.transactionTime).format(
          "MMMM DD, YYYY hh:mm A"
        )
        : "")
      }
              </span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.amount !== changedTransaction.amount
        ? "color: red"
        : ""
      }">Amount</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.amount !== changedTransaction.amount
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.amount !== changedTransaction.amount
        ? "color: red"
        : ""
      }">
                ${transaction.amount +
      (transaction.amount !== changedTransaction.amount
        ? " &rarr; " + changedTransaction.amount
        : ""
      ).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      })
      }
              </span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.senderAccountNumber !==
        changedTransaction.senderAccountNumber ||
        transaction.senderFullName !== changedTransaction.senderFullName
        ? "color: red"
        : ""
      }">${transaction.transactionType === "TRANSFER" ? "Sender" : "Source"
      }</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.senderAccountNumber !==
        changedTransaction.senderAccountNumber ||
        transaction.senderFullName !== changedTransaction.senderFullName
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.senderAccountNumber !==
        changedTransaction.senderAccountNumber ||
        transaction.senderFullName !== changedTransaction.senderFullName
        ? "color: red"
        : ""
      }">
                ${transaction.senderAccountNumber +
      (transaction.senderAccountNumber !==
        changedTransaction.senderAccountNumber
        ? " &rarr; " + changedTransaction.senderAccountNumber
        : "") +
      " - " +
      (transaction.senderFullName +
        (transaction.senderFullName !==
          changedTransaction.senderFullName
          ? " &rarr; " + changedTransaction.senderFullName
          : ""))
      }
              </span>
            </div>
            ${transaction.transactionType === "TRANSFER"
        ? `<div style="margin: 5px">
                <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.recipientAccountNumber !==
          changedTransaction.recipientAccountNumber ||
          transaction.recipientFullName !==
          changedTransaction.recipientFullName
          ? "color: red"
          : ""
        }">Recipient</span>
                <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.recipientAccountNumber !==
          changedTransaction.recipientAccountNumber ||
          transaction.recipientFullName !==
          changedTransaction.recipientFullName
          ? "color: red"
          : ""
        }">:</span>
                <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.recipientAccountNumber !==
          changedTransaction.recipientAccountNumber ||
          transaction.recipientFullName !==
          changedTransaction.recipientFullName
          ? "color: red"
          : ""
        }">` +
        (transaction.recipientAccountNumber +
          (transaction.recipientAccountNumber !==
            changedTransaction.recipientAccountNumber
            ? " &rarr; " + changedTransaction.recipientAccountNumber
            : "")) +
        " - " +
        (transaction.recipientFullName +
          (transaction.recipientFullName !==
            changedTransaction.recipientFullName
            ? " &rarr; " + changedTransaction.recipientFullName
            : "")) +
        `</span>
              </div>`
        : ""
      }
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.description !== changedTransaction.description
        ? "color: red"
        : ""
      }">Description</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.description !== changedTransaction.description
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.description !== changedTransaction.description
        ? "color: red"
        : ""
      }">
                ${transaction.description +
      (transaction.description !== changedTransaction.description
        ? " &rarr; " + changedTransaction.description
        : "")
      }
              </span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic; ${transaction.transactionStatus !==
        changedTransaction.transactionStatus
        ? "color: red"
        : ""
      }">Status</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px; ${transaction.transactionStatus !==
        changedTransaction.transactionStatus
        ? "color: red"
        : ""
      }">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${transaction.transactionStatus !==
        changedTransaction.transactionStatus
        ? "color: red"
        : `color:${transaction.transactionStatus === "SUCCESS"
          ? "green"
          : "red"
        }`
      }">
                ${transaction.transactionStatus +
      (transaction.transactionStatus !==
        changedTransaction.transactionStatus
        ? " &rarr; " + changedTransaction.transactionStatus
        : "")
      }
              </span>
            </div>
            <div style="text-align: right; width: 100%; font-family: 'Times New Roman', Times, serif; font-size: 15px; line-heigh: 15px; font-style: italic; margin: 15px 0px">  
              Time: ${moment(time).format("MMMM DD, YYYY hh:mm A")}
            </div> 
          </div>
        </div>
      </div>
    </div>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail Transaction NOT Verity to " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail Transaction NOT Verity to " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailEvent = async (req, res, next) => {
  const { email, eventHyper, time } = req.body;
  const styleType = {
    AddTransEvent: "#013462",
    UpdateTransEvent: "#780000",
    DeleteTransEvent: "#007812",
  };
  const mailOptions = {
    from: "HyperWallet <support@finystyle.com>",
    to: email,
    subject: "Transaction Fabric",
    headers: { "X-Priority": "1 (Highest)" },
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
      <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
        <div>
          <div style="margin-top: 40px; margin-bottom: 15px; text-align: center; padding: 5px">
            <span style="width: 140px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: black; color: white; border: 1px solid #000000; border-top-left-radius: 5px; border-bottom-left-radius: 5px; text-align: center">
              HYPER
            </span>
            <span style="width: 180px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-top-right-radius: 5px; border-bottom-right-radius: 5px; text-align: center">
              WALLET
            </span>
          </div>
          <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; font-weight: bold; text-align: center; color: red">
            Transaction Fabric
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            Event listened to from Chaincode on Hyperledger Fabric Network
          </div> 
          <hr style="border: 2px solid black; width: 100%">
          <div style="margin: 10px 10px 10px 20%">
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; font-style: italic; margin: 15px 0px">  
              Transaction Fabric information  
            </div> 
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic;">Transaction Code</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px;">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman';">
                ${eventHyper.data.ID}
              </span>
            </div>
             <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic;">Transaction Time</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px;">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman';">${eventHyper.data.CreateTime}</span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic;">Transaction Hash</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px;">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman';">
                ${eventHyper.data.DataHash}
              </span>
            </div>
            <div style="margin: 5px">
              <span style="display: inline-block; width: 170px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic;">Event Type</span>
              <span style="display: inline-block; font-family: 'Times New Roman'; font-size: 20px;">:</span>
              <span style="display: inline-block; padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'; ${`color:${styleType[eventHyper.eventHyperType]}`}">
                ${eventHyper.eventHyperType}
              </span>
            </div>
            <div style="text-align: right; width: 100%; font-family: 'Times New Roman', Times, serif; font-size: 15px; line-heigh: 15px; font-style: italic; margin: 15px 0px">  
              Time: ${moment(time).format("MMMM DD, YYYY hh:mm A")}
            </div> 
          </div>
        </div>
      </div>
    </div>
    `,
  };
  MailService.sendMail(mailOptions, (error, info) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (error) {
      console.log("Send Mail Event to " + email + " Failed. Error: " + error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      console.log("Send Mail Event to " + email + " Success.");
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
module.exports = {
  sendMailOTPLogin,
  sendMailOTPRegister,
  sendMailThankyou,
  sendMailOTPTransaction,
  sendMailResetPassword,
  sendMailTransactionVerify,
  sendMailTransactionVerifyToRecipient,
  sendMailTransactionNotVerify,
  sendMailTransactionVerifyToAdmin,
  sendMailTransactionNotVerifyToAdmin,
  sendMailEvent
};
