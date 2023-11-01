import callApi from "./Request";
const accountService = {
  get: async (params, navigate) => {
    return await callApi(navigate, "account", "get", null, params);
  },
};
export default accountService;
