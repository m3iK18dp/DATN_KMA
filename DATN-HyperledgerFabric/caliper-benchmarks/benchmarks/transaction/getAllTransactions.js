"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");
// const fs = require("fs");
// const filePath = "ids.json";
// function addToJsonArray(array) {
//   if (!fs.existsSync(filePath))
//     fs.writeFileSync(filePath, JSON.stringify(array, null, 2), "utf-8");
// }
class GetAllTransactionWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }
  /**
   * @return {Promise<TxStatus[]>}
   */
  async submitTransaction() {
    let args = {
      contractId: "transaction_cc",
      contractVersion: "v1",
      contractFunction: "GetAllTransaction",
      contractArguments: [],
      timeout: 30,
      readOnly: true,
    };
    await this.sutAdapter.sendRequests(args);
    // const value = await this.sutAdapter.sendRequests(args);
    // addToJsonArray(JSON.parse(value.status.result.toString()).map((r) => r.ID));
  }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
  return new GetAllTransactionWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
