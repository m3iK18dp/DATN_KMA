import callApi from "./Request";
const authenticationService = {
  login: async (authenticationRequest, navigate) => {
    try {
      const res = await callApi(
        navigate,
        "auth/authenticate",
        "post",
        authenticationRequest
      );
      if (res.status === "ok") {
        localStorage.setItem("token", res.data[0]);
        sessionStorage.setItem("username", authenticationRequest.username);
        sessionStorage.setItem("roles", res.data[1]);
        sessionStorage.setItem("isRevoked", false);
      }
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
  loginByOTP: async (authenticationRequest, navigate) => {
    try {
      const res = await callApi(
        navigate,
        "auth/authenticate_by_otp",
        "post",
        authenticationRequest
      );
      if (res.status === "ok") {
        localStorage.setItem("token", res.data[0]);
        sessionStorage.setItem("username", authenticationRequest.username);
        sessionStorage.setItem("roles", res.data[1]);
        sessionStorage.setItem("isRevoked", false);
      }
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
  register: async (user, otp, navigate) => {
    try {
      const res = await callApi(navigate, "auth", "post", user, { otp: otp });
      if (res.status === "ok") {
        localStorage.setItem("token", res.data[0]);
        sessionStorage.setItem("username", user.email);
        sessionStorage.setItem("roles", res.data[1]);
        sessionStorage.setItem("isRevoked", false);
      }
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
  logout: async (navigate) => {
    const res = await callApi(navigate, "auth/logout");
    if (res.status === "ok") {
      localStorage.clear();
      sessionStorage.clear();
    }
    return res;
  },
  getAccountInformation: async (navigate, token) => {
    return await callApi(navigate, "auth/account_information", "post", token);
  },
  logoutAllInOtherDevices: async (navigate, password) => {
    return await callApi(
      navigate,
      "auth/logout_on_all_other_devices",
      "post",
      password
    );
  },
  submitResetPassword: async (username, navigate) => {
    return await callApi(
      navigate,
      "auth/submit_reset_password",
      "post",
      null,
      { username: username }
    );
  },
  changePasswordForForgerPassword: async (password, token, navigate) => {
    return await callApi(
      navigate,
      "auth/change_password_for_forget_password",
      "post",
      { password: password, token: token }
    );
  },
};
export default authenticationService;
