const {
  Gateway,
  Wallets,
  TxEventHandler,
  GatewayOptions,
  DefaultEventHandlerStrategies,
  TxEventHandlerFactory,
} = require("fabric-network");
const fs = require("fs");
const EventStrategies = require("fabric-network/lib/impl/event/defaulteventhandlerstrategies");
const path = require("path");
const log4js = require("log4js");
const logger = log4js.getLogger("BasicNetwork");
const util = require("util");

const helper = require("./helper");
const { blockListener, contractListener } = require("./Listeners");

const invokeTransaction = async (
  channelName,
  chaincodeName,
  fcn,
  args,
  username,
  org_name,
  transientData
) => {
  try {
    const ccp = await helper.getCCP(org_name);
    console.log(
      "==================",
      channelName,
      chaincodeName,
      fcn,
      args,
      username,
      org_name
    );

    const walletPath = await helper.getWalletPath(org_name);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    let identity = await wallet.get(username);
    if (!identity) {
      console.log(
        `An identity for the user ${username} does not exist in the wallet, so registering user`
      );
      await helper.getRegisteredUser(username, org_name, true);
      identity = await wallet.get(username);
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    const connectOptions = {
      wallet,
      identity: username,
      discovery: { enabled: true, asLocalhost: true },
      // eventHandlerOptions: EventStrategies.NONE
    };

    const gateway = new Gateway();
    await gateway.connect(ccp, connectOptions);

    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);

    let result;
    let message;

    switch (fcn) {
      case "CreateTransaction":
        result = await contract.submitTransaction(
          "TransactionContract:" + fcn,
          args[0],
          args[1],
          args[2]
        );
        console.log(result.toString());
        result = { txid: result.toString() };
        break;
      case "UpdateTransactionById":
        console.log("=============");
        result = await contract.submitTransaction(
          "TransactionContract:" + fcn,
          args[0],
          args[1],
          args[2]
        );
        result = { txid: result.toString() };
        break;
      case "DeleteTransactionById":
        console.log("=============");
        result = await contract.submitTransaction(
          "TransactionContract:" + fcn,
          args[0]
        );
        result = { txid: result.toString() };
        break;
      default:
        break;
    }

    await gateway.disconnect();

    let response = {
      message: fcn + " success",
      result,
    };

    return response;
  } catch (error) {
    console.log(`Getting error: ${error}`);
    let response = {
      message: error.message,
      result: null,
    };
    return response;
  }
};

exports.invokeTransaction = invokeTransaction;
