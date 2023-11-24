const axios = require("axios");
async function callApi(payload) {
  const apiUrl = "http://192.168.152.1:8081/api/event-hyper";

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Xử lý phản hồi từ API ở đây, nếu cần thiết
    console.log("API Response:", response.data);

    return response.data; // Trả về dữ liệu từ API nếu cần
  } catch (error) {
    // Xử lý lỗi ở đây
    console.error("API Error:", error.message);
    throw error;
  }
}

function showTransactionData(transactionData) {
  console.log(JSON.stringify(transactionData));
  const creator = transactionData.actions[0].header.creator;
  console.log(
    `    - submitted by: ${creator.mspid}-${creator.id_bytes.toString("hex")}`
  );
  for (const endorsement of transactionData.actions[0].payload.action
    .endorsements) {
    console.log(
      `    - endorsed by: ${
        endorsement.endorser.mspid
      }-${endorsement.endorser.id_bytes.toString("hex")}`
    );
  }
  const chaincode =
    transactionData.actions[0].payload.chaincode_proposal_payload.input
      .chaincode_spec;
  console.log(`    - chaincode:${chaincode.chaincode_id.name}`);
  console.log(`    - function:${chaincode.input.args[0].toString()}`);
  for (let x = 1; x < chaincode.input.args.length; x++) {
    console.log(`    - arg:${chaincode.input.args[x].toString()}`);
  }
}

contractListener = async (event) => {
  if (
    event.eventName === "AddTransEvent" ||
    event.eventName === "UpdateTransEvent" ||
    event.eventName === "DeleteTransEvent"
  ) {
    const eventTransaction = event.getTransactionEvent();
    const payload = event.payload;
    await callApi({
      eventHyperType: event.eventName,
      data: JSON.parse(payload),
    });

    console.log(`*** Event: ${event.eventName}:${payload}`);
    // if (eventTransaction.transactionData) {
    //   showTransactionData(eventTransaction.transactionData);
    // }
    // console.log(
    //   `*** transaction: ${eventTransaction.transactionId} status:${eventTransaction.status}`
    // );
  }
};

blockListener = async (event) => {
  console.log("--------------------------------------------------------------");
  console.log(
    `<-- Block Event Received - block number: ${event.blockNumber.toString()}`
  );

  const transEvents = event.getTransactionEvents();
  for (const transEvent of transEvents) {
    console.log(`*** transaction event: ${transEvent.transactionId}`);
    // if (transEvent.privateData) {
    //     for (const namespace of transEvent.privateData.ns_pvt_rwset) {
    //         console.log(`    - private data: ${namespace.namespace}`);
    //         for (const collection of namespace.collection_pvt_rwset) {
    //             console.log(`     - collection: ${collection.collection_name}`);
    //             if (collection.rwset.reads) {
    //                 for (const read of collection.rwset.reads) {
    //                     console.log(`       - read set - ${BLUE}key:${RESET} ${read.key}  ${BLUE}value:${read.value.toString()}`);
    //                 }
    //             }
    //             if (collection.rwset.writes) {
    //                 for (const write of collection.rwset.writes) {
    //                     console.log(`      - write set - ${BLUE}key:${RESET}${write.key} ${BLUE}is_delete:${RESET}${write.is_delete} ${BLUE}value:${RESET}${write.value.toString()}`);
    //                 }
    //             }
    //         }
    //     }
    // }
    if (transEvent.transactionData) {
      showTransactionData(transEvent.transactionData);
    }
  }
};

module.exports = {
  contractListener,
  blockListener,
};
