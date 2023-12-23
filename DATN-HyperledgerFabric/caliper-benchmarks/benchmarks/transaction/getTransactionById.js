"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");

class GetTransactionByIdWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }
  /**
   * Assemble TXs for the round.
   * @return {Promise<TxStatus[]>}
   */
  async submitTransaction() {
    let id = "faa5d98df4";
    let time = "2023-12-07T00:22:27Z";
    let args = {
      contractId: "transaction_cc",
      contractVersion: "v1",
      contractFunction: "GetTransactionById",
      contractArguments: [id, time],
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
  return new GetTransactionByIdWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
