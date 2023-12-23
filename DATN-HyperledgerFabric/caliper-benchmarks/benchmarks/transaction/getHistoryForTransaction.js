"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");

class GetHistoryForTransactionWorkload extends WorkloadModuleBase {
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
      contractFunction: "GetHistoryForTransaction",
      contractArguments: ["faa5d98df4"],
      timeout: 30,
      readOnly: true,
    };
    await this.sutAdapter.sendRequests(args);
  }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
  return new GetHistoryForTransactionWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
