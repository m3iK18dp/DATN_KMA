import callApi from "./Request";
const otpService = {
  createOTP: async (email, type, navigate) => {
    const otpType = {
      1: "LOGIN",
      2: "REGISTER",
      3: "TRANSACTION",
      4: "PIN",
      5: "PASSWORD",
      6: "UPDATE_INFO",
    };
    try {
      return await callApi(navigate, `otp`, "post", null, {
        email: email,
        type: otpType[type],
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};
export default otpService;
