"use strict";
const { WorkloadModuleBase } = require("@hyperledger/caliper-core");
// const fs = require("fs");
// const filePath = "ids.json";
// function readJsonArrayFromFile() {
//   let jsonData;
//   try {
//     jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   } catch (error) {
//     jsonData = [];
//   }
//   return jsonData;
// }
// function deleteValueInJsonArray(value) {
//   let jsonData;
//   try {
//     jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   } catch (error) {
//     jsonData = [];
//   }
//   if (jsonData.includes(value)) {
//     jsonData = jsonData.filter((d) => d != value);
//     fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
//   }
// }
class DeleteTransactionWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }
  /**
   * Assemble TXs for the round.
   * @return {Promise<TxStatus[]>}
   */
  async submitTransaction() {
    let argsGet = {
      contractId: "transaction_cc",
      contractVersion: "v1",
      contractFunction: "GetAllTransaction",
      contractArguments: [],
      timeout: 30,
      readOnly: true,
    };
    const value = await this.sutAdapter.sendRequests(argsGet);
    // const ids = readJsonArrayFromFile();
    const ids = JSON.parse(value.status.result.toString()).map((r) => r.ID);
    const id = ids[Math.floor(Math.random() * ids.length)];
    let args = {
      contractId: "transaction_cc",
      contractVersion: "v1",
      contractFunction: "DeleteTransactionById",
      contractArguments: [id],
      timeout: 30,
    };
    // deleteValueInJsonArray(id);
    // try {
    await this.sutAdapter.sendRequests(args);
    // } catch (error) {
    //   console.log(error);
    //   if (error.message.includes("does not exist")) {
    //     console.log("Transaction already exists. Ignoring...");
    //   } else {
    //     throw error;
    //   }
    // }
  }
}
/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
  return new DeleteTransactionWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
