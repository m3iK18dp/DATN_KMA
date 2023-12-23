"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");
const uuid = require("uuid");
// const fs = require("fs");
// const generateRandomNumber = () => {
// const min = 0;
// const max = 9999999999;
// const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
// return String(randomNumber).padStart(6, "0");
// };
// const filePath = "ids.json";
// function addToJsonArray(value) {
//   let jsonData;
//   try {
//     jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   } catch (error) {
//     jsonData = [];
//   }
//   if (!jsonData.includes(value)) {
//     jsonData.push(value);
//     fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
//   }
// }
class CreateTransactionWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }
  /**
   * Assemble TXs for the round.
   * @return {Promise<TxStatus[]>}
   */
  async submitTransaction() {
    // const id = generateRandomNumber();
    const id = uuid.v4();
    let args = {
      contractId: "transaction_cc",
      contractVersion: "v1",
      contractFunction: "CreateTransaction",
      contractArguments: [
        `TEST${id}`,
        "2023-12-23T00:20:10Z",
        "$2a$12$TGDSnLWrdqFTKDiTYESNFelNajEonwX7wtdZwYOz3WW/1QlWcxRFKs",
      ],
      timeout: 30,
    };
    // addToJsonArray(id);
    // try {
    await this.sutAdapter.sendRequests(args);
    // } catch (error) {
    //   if (error.message.includes("Asset already exists")) {
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
  return new CreateTransactionWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
