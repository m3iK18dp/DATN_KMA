const router = require("express").Router();

const MailController = require("../controller/mail_controller");

router.post("/send-mail-otp-login", MailController.sendMailOTPLogin);
router.post("/send-mail-otp-register", MailController.sendMailOTPRegister);
router.post("/send-mail-thank-you", MailController.sendMailThankyou);
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
  "/send-mail-transaction-verify-to-recipient",
  MailController.sendMailTransactionVerifyToRecipient
);
router.post(
  "/send-mail-transaction-not-verify",
  MailController.sendMailTransactionNotVerify
);
router.post(
  "/send-mail-transaction-verify-to-admin",
  MailController.sendMailTransactionVerifyToAdmin
);
router.post(
  "/send-mail-transaction-not-verify-to-admin",
  MailController.sendMailTransactionNotVerifyToAdmin
);
router.post(
  "/send-mail-event",
  MailController.sendMailEvent
);
module.exports = router;
