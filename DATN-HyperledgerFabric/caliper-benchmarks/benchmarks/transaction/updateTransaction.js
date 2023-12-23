"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");

// const fs = require("fs");
// const generateRandomNumber = (min, max, length) => {
//   const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
//   return String(randomNumber).padStart(length, "0");
// };
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
class UpdateTransactionWorkload extends WorkloadModuleBase {
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
      contractFunction: "UpdateTransactionById",
      contractArguments: [id, "2023-12-23T00:25:10Z", "updated-" + id],
      timeout: 30,
    };
    // try {
    await this.sutAdapter.sendRequests(args);
    // } catch (error) {
    //   console.log(error.message);
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
  return new UpdateTransactionWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
