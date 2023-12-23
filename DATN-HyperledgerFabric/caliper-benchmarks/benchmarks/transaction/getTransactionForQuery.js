"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");

const query = [
  '{"selector":{"ID":{"$in":["TX123456","TX123457"]}}}',
  '{"selector":{"ID":{"$gt":null}}}',
  '{"selector": {"ID":"TX123456","CreateTime":"2023-09-22T11:50:10Z"}}',
];
class GetTransactionForQueryWorkload extends WorkloadModuleBase {
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
      contractFunction: "GetTransactionForQuery",
      contractArguments: [query[Math.floor(Math.random() * query.length)]],
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
  return new GetTransactionForQueryWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
