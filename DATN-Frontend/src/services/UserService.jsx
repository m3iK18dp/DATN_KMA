import callApi from "./Request";

const userService = {
  get: async (params, navigate) => {
    return await callApi(navigate, "user", "get", null, params);
  },
  getUserInformation: async (navigate) => {
    return await callApi(navigate, "user/information");
  },
  getUserFullNameByAccountNumber: async (accountNumber, navigate) => {
    return await callApi(
      navigate,
      `user/getFullNameByAccount/${accountNumber}`
    );
  },
  insertUser: async (user, navigate) => {
    return await callApi(navigate, "user", "post", user);
  },
  updateUser: async (id, user, navigate) => {
    return await callApi(navigate, `user/${id}`, "put", user);
  },

  changeStatusUser: async (id, userStatus, navigate) => {
    // NOT_YET_ACTIVE,
    // ACTIVE,
    // INACTIVE,
    // DELETED,
    return await callApi(
      navigate,
      `user/change_status/${id}`,
      "put",
      userStatus
    );
  },
  resetPasswordUser: async (id, navigate) => {
    return await callApi(navigate, `user/reset_password/${id}`, "put");
  },
  updateEmailToMyUser: async (password, newEmail, navigate) => {
    const formData = new FormData();
    formData.append("password", password);
    formData.append("newEmail", newEmail);
    const headers = { "Content-Type": "multipart/form-data" };
    return await callApi(
      navigate,
      `user/update_email`,
      "put",
      formData,
      {},
      headers
    );
  },
  updatePasswordToMyUser: async (id, listPassword, navigate) => {
    return await callApi(navigate, `user/update_password`, "put", listPassword);
  },
  checkPin: async (navigate) => {
    return await callApi(navigate, `pin/check`);
  }, checkPinCorrect: async (pin, navigate) => {
    return await callApi(navigate, `pin/check-correct`, 'get', null, { pin: pin });
  },
  createPin: async (pin, navigate) => {
    const formData = new FormData();
    formData.append("pin", pin);
    const headers = { "Content-Type": "multipart/form-data" };
    return await callApi(navigate, `pin/create`, "post", formData, {}, headers);
  },
  updatePin: async (password, oldPin, newPin, navigate) => {
    const formData = new FormData();
    formData.append("oldPin", oldPin);
    formData.append("password", password);
    formData.append("newPin", newPin);
    const headers = { "Content-Type": "multipart/form-data" };
    return await callApi(navigate, `pin/update`, "post", formData, {}, headers);
  },
};
export default userService;
