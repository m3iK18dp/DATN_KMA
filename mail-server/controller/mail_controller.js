const MailService = require("../config/transporter");

const sendMailResetPassword = async (req, res, next) => {
  const { email, token } = req.body;
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
      console.error(error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailOTPLogin = async (req, res, next) => {
  const { email, otp } = req.body;
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
      console.error(error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailOTPRegister = async (req, res, next) => {
  const { email, otp } = req.body;
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
      console.error(error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailOTPTransaction = async (req, res, next) => {
  const { email, otp } = req.body;
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
      console.error(error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
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
          <div style="margin: 10px 10px 10px 200px">
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; font-style: italic; margin: 15px 0px">  
              Your account information
            </div> 
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">First Name</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.firstName}</div>
            </div>
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Last Name</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.lastName}</div>
            </div>
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Email</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.email}</div>
            </div>
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Password</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.password}</div>
            </div>
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Address</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.address}</div>
            </div>
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Phone Number</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.phoneNumber}</div>
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
      console.error(error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailTransactionVerify = async (req, res, next) => {
  const { email, transaction } = req.body;
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
            Thank You
          </div>
          <hr style="border: 2px solid black; width: 100%">
          <div style="text-align: justify; padding: 15px; font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; margin-left: 50px; font-style: italic;">
            Thank you for choosing HyperWallet!
          </div> 
          <hr style="border: 2px solid black; width: 100%">
          <div style="margin: 10px 10px 10px 200px">
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 20px; line-heigh: 25px; font-style: italic; margin: 15px 0px">  
              Your account information
            </div> 
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">First Name</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.firstName}</div>
            </div>
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Last Name</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.lastName}</div>
            </div>
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Email</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.email}</div>
            </div>
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Password</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.password}</div>
            </div>
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Address</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.address}</div>
            </div>
            <div style="display: flex; margin: 5px">
              <div style="width: 140px; font-weight: bold; font-family: 'Times New Roman'; font-size: 20px; font-style: italic">Phone Number</div>
              <div style="font-family: 'Times New Roman'; font-size: 20px">:</div>
              <div style="padding-left: 20px; font-size: 20px;  font-family: 'Times New Roman'">${user.phoneNumber}</div>
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
      console.error(error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
      res.send(`Send mail to Email: ${email} - Success`);
    }
  });
};
const sendMailTransactionUnVerify = async (req, res, next) => {
  const { email, token } = req.body;
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
      console.error(error);
      res.status(500).send(`Send mail to Email: ${email} - Failed`);
    } else {
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
  sendMailTransactionUnVerify,
};
