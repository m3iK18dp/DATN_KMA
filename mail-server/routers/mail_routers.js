const router = require("express").Router();

const MailController = require("../controller/mail_controller");

router.post("/send-mail-otp-login", MailController.sendMailOTPLogin);
router.post("/send-mail-otp-register", MailController.sendMailOTPRegister);
router.post("/send-mail-thankyou", MailController.sendMailThankyou);
router.post(
  "/send-mail-otp-transaction",
  MailController.sendMailOTPTransaction
);
router.post("/send-mail-reset-password", MailController.sendMailResetPassword);
router.post(
  "/send-mail-transaction-verify",
  MailController.sendMailTransactionVerify
);
router.post(
  "/send-mail-transaction-un-verify",
  MailController.sendMailTransactionUnVerify
);
module.exports = router;
