import callApi from "./Request";
const statisticService = {
  getStatistics: async (params, navigate) => {
    try {
      return await callApi(
        navigate,
        `transaction/get_statistics`,
        "get",
        null,
        params
      );
    } catch (err) {
      throw new Error(err);
    }
  },
  getStatisticBalance: async (params, navigate) => {
    try {
      return await callApi(
        navigate,
        `transaction/get_statistic_balance`,
        "get",
        null,
        params
      );
    } catch (err) {
      throw new Error(err);
    }
  },
  getStatisticMonth: async (params, navigate) => {
    try {
      return await callApi(
        navigate,
        `transaction/get_statistics_month`,
        "get",
        null,
        params
      );
    } catch (err) {
      throw new Error(err);
    }
  },
};
export default statisticService;
