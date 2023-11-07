import callApi from "./Request";
const transactionService = {
  get: async (params, navigate) => {
    return await callApi(navigate, "transaction", "get", null, params);
  },
  getAllTransactionsByAccountNumber: async (accountNumber, navigate) => {
    return await callApi(navigate, `transaction/${accountNumber}`);
  },
  deposit: async (accountNumber, pin, amount, otp, navigate) => {
    const formData = new FormData();
    formData.append("accountNumber", accountNumber);
    formData.append("pin", pin);
    formData.append("amount", amount);
    const headers = { "Content-Type": "multipart/form-data" };
    return await callApi(
      navigate,
      `transaction/deposit`,
      "post",
      formData,
      { otp: otp },
      headers
    );
  },
  withdraw: async (accountNumber, pin, amount, otp, navigate) => {
    const formData = new FormData();
    formData.append("accountNumber", accountNumber);
    formData.append("pin", pin);
    formData.append("amount", amount);
    const headers = { "Content-Type": "multipart/form-data" };
    return await callApi(
      navigate,
      `transaction/withdraw`,
      "post",
      formData,
      { otp: otp },
      headers
    );
  },
  transfer: async (
    senderAccountNumber,
    recipientAccountNumber,
    pin,
    amount,
    description,
    otp,
    navigate
  ) => {
    const formData = new FormData();
    formData.append("senderAccountNumber", senderAccountNumber);
    formData.append("recipientAccountNumber", recipientAccountNumber);
    formData.append("pin", pin);
    formData.append("amount", amount);
    formData.append("description", description);
    const headers = { "Content-Type": "multipart/form-data" };
    return await callApi(
      navigate,
      `transaction/transfer`,
      "post",
      formData,
      { otp: otp },
      headers
    );
  },
};
export default transactionService;
