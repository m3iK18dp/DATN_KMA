"use strict";
const log4js = require("log4js");
const logger = log4js.getLogger("BasicNetwork");
const bodyParser = require("body-parser");
const http = require("http");
const util = require("util");
const express = require("express");
const app = express();
const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");
const bearerToken = require("express-bearer-token");
const cors = require("cors");
const constants = require("./config/constants.json");

const host = process.env.HOST || constants.host;
const port = process.env.PORT || constants.port;

const helper = require("./app/helper");
const invoke = require("./app/invoke");
const qscc = require("./app/qscc");
const query = require("./app/query");

app.options("*", cors());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// set secret variable
app.set("secret", "thisismysecret");
app.use(
  expressJWT({
    secret: "thisismysecret",
  }).unless({
    path: ["/users", "/users/login", "/register"],
  })
);
app.use(bearerToken());

logger.level = "debug";

app.use((req, res, next) => {
  logger.debug("New req for %s", req.originalUrl);
  if (
    req.originalUrl.indexOf("/users") >= 0 ||
    req.originalUrl.indexOf("/users/login") >= 0 ||
    req.originalUrl.indexOf("/register") >= 0
  ) {
    return next();
  }
  var token = req.token;
  jwt.verify(token, app.get("secret"), (err, decoded) => {
    if (err) {
      console.log(`Error ================:${err}`);
      res.send({
        success: false,
        message:
          "Failed to authenticate token. Make sure to include the " +
          "token returned from /users call in the authorization header " +
          " as a Bearer token",
      });
      return;
    } else {
      req.username = decoded.username;
      req.orgname = decoded.orgName;
      logger.debug(
        util.format(
          "Decoded from JWT token: username - %s, orgname - %s",
          decoded.username,
          decoded.orgName
        )
      );
      return next();
    }
  });
});

var server = http.createServer(app).listen(port, function () {
  console.log(`Server started on ${port}`);
});
logger.info("****************** SERVER STARTED ************************");
logger.info("***************  http://%s:%s  ******************", host, port);
server.timeout = 240000;

function getErrorMessage(field) {
  var response = {
    success: false,
    message: field + " field is missing or Invalid in the request",
  };
  return response;
}

// Register and enroll user
app.post("/users", async function (req, res) {
  var username = req.body.username;
  var orgName = req.body.orgName;
  logger.debug("End point : /users");
  logger.debug("User name : " + username);
  logger.debug("Org name  : " + orgName);
  if (!username) {
    res.json(getErrorMessage("'username'"));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage("'orgName'"));
    return;
  }

  var token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + parseInt(constants.jwt_expiretime),
      username: username,
      orgName: orgName,
    },
    app.get("secret")
  );

  let response = await helper.getRegisteredUser(username, orgName, true);

  logger.debug(
    "-- returned from registering the username %s for organization %s",
    username,
    orgName
  );
  if (response && typeof response !== "string") {
    logger.debug(
      "Successfully registered the username %s for organization %s",
      username,
      orgName
    );
    response.data = token;
    res.json(response);
  } else {
    logger.debug(
      "Failed to register the username %s for organization %s with::%s",
      username,
      orgName,
      response
    );
    res.json({ status: "failed", message: response, data: null });
  }
});

// Register and enroll user
app.post("/users/register", async function (req, res) {
  var username = req.body.username;
  var orgName = req.body.orgName;
  logger.debug("End point : /users");
  logger.debug("User name : " + username);
  logger.debug("Org name  : " + orgName);
  if (!username) {
    res.json(getErrorMessage("'username'"));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage("'orgName'"));
    return;
  }

  var token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + parseInt(constants.jwt_expiretime),
      username: username,
      orgName: orgName,
    },
    app.get("secret")
  );

  let response = await helper.registerAndGerSecret(username, orgName);

  logger.debug(
    "-- returned from registering the username %s for organization %s",
    username,
    orgName
  );
  if (response && typeof response !== "string") {
    logger.debug(
      "Successfully registered the username %s for organization %s",
      username,
      orgName
    );
    if (response.data) response.data = { token: token, secret: response.data };
    else response.data = token;
    res.json(response);
  } else {
    logger.debug(
      "Failed to register the username %s for organization %s with::%s",
      username,
      orgName,
      response
    );
    res.json({ status: "failed", message: response, data: null });
  }
});

// Login and get jwt
app.post("/users/login", async function (req, res) {
  var username = req.body.username;
  var orgName = req.body.orgName;
  logger.debug("End point : /users");
  logger.debug("User name : " + username);
  logger.debug("Org name  : " + orgName);
  if (!username) {
    res.json(getErrorMessage("'username'"));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage("'orgName'"));
    return;
  }

  var token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + parseInt(constants.jwt_expiretime),
      username: username,
      orgName: orgName,
    },
    app.get("secret")
  );

  let isUserRegistered = await helper.isUserRegistered(username, orgName);

  if (isUserRegistered) {
    res.json({
      status: "ok",
      message: "Login user " + username + " success",
      data: token,
    });
  } else {
    res.json({
      status: "failed",
      message: `User with username ${username} is not registered with ${orgName}, Please register first.`,
      data: null,
    });
  }
});

// Invoke transaction on chaincode on target peers
app.post(
  "/channels/:channelName/chaincodes/:chaincodeName",
  async function (req, res) {
    try {
      logger.debug(
        "==================== INVOKE ON CHAINCODE =================="
      );
      var peers = req.body.peers;
      var chaincodeName = req.params.chaincodeName;
      var channelName = req.params.channelName;
      var fcn = req.body.fcn;
      var args = req.body.args;
      var transient = req.body.transient;
      console.log(`Transient data is ;${transient}`);
      logger.debug("channelName  : " + channelName);
      logger.debug("chaincodeName : " + chaincodeName);
      logger.debug("fcn  : " + fcn);
      logger.debug("args  : " + args);
      //   if (!chaincodeName) {
      //     res.json(getErrorMessage("'chaincodeName'"));
      //     return;
      //   }
      //   if (!channelName) {
      //     res.json(getErrorMessage("'channelName'"));
      //     return;
      //   }
      if (!fcn) {
        res.json(getErrorMessage("'fcn'"));
        return;
      }
      if (!args) {
        res.json(getErrorMessage("'args'"));
        return;
      }

      let data = await invoke.invokeTransaction(
        channelName,
        chaincodeName,
        fcn,
        args,
        req.username,
        req.orgname,
        transient
      );
      console.log(`message result is : ${data}`);

      const response_payload = {
        status: data.result != null ? "ok" : "failed",
        message: data.message,
        data: data.result,
      };
      res.send(response_payload);
    } catch (error) {
      const response_payload = {
        status: "error",
        message: error.name + ": " + error.message,
        data: null,
      };
      res.send(response_payload);
    }
  }
);

app.get(
  "/channels/:channelName/chaincodes/:chaincodeName",
  async function (req, res) {
    try {
      logger.debug(
        "==================== QUERY BY CHAINCODE =================="
      );

      var channelName = req.params.channelName;
      var chaincodeName = req.params.chaincodeName;
      console.log(`chaincode name is :${chaincodeName}`);
      let args = decodeURIComponent(req.query.args);
      let fcn = req.query.fcn;
      let peer = req.query.peer;

      logger.debug("channelName : " + channelName);
      logger.debug("chaincodeName : " + chaincodeName);
      logger.debug("fcn : " + fcn);
      logger.debug("args : " + args);

      //   if (!chaincodeName) {
      //     res.json(getErrorMessage("'chaincodeName'"));
      //     return;
      //   }
      //   if (!channelName) {
      //     res.json(getErrorMessage("'channelName'"));
      //     return;
      //   }
      if (!fcn) {
        res.json(getErrorMessage("'fcn'"));
        return;
      }
      if (fcn != "GetAllTransaction") {
        if (!args) {
          res.json(getErrorMessage("'args'"));
          return;
        }
        console.log("args==========", args);
        args = args.replace(/'/g, '"');
        args = JSON.parse(args);
        logger.debug(args);
      }
      let data = await query.query(
        channelName,
        chaincodeName,
        args,
        fcn,
        req.username,
        req.orgname
      );

      const response_payload = {
        status: data.result != null ? "ok" : "failed",
        message: data.message,
        data: data.result,
      };

      res.send(response_payload);
    } catch (error) {
      const response_payload = {
        status: "error",
        message: error.name + ": " + error.message,
        data: null,
      };
      res.send(response_payload);
    }
  }
);

app.get(
  "/qscc/channels/:channelName/chaincodes/:chaincodeName",
  async function (req, res) {
    try {
      logger.debug(
        "==================== QUERY BY CHAINCODE =================="
      );

      var channelName = req.params.channelName;
      var chaincodeName = req.params.chaincodeName;
      console.log(`chaincode name is :${chaincodeName}`);
      let args = req.query.args;
      let fcn = req.query.fcn;
      // let peer = req.query.peer;

      logger.debug("channelName : " + channelName);
      logger.debug("chaincodeName : " + chaincodeName);
      logger.debug("fcn : " + fcn);
      logger.debug("args : " + args);

      if (!chaincodeName) {
        res.json(getErrorMessage("'chaincodeName'"));
        return;
      }
      if (!channelName) {
        res.json(getErrorMessage("'channelName'"));
        return;
      }
      if (!fcn) {
        res.json(getErrorMessage("'fcn'"));
        return;
      }
      if (!args) {
        res.json(getErrorMessage("'args'"));
        return;
      }
      console.log("args==========", args);
      args = args.replace(/'/g, '"');
      args = JSON.parse(args);
      logger.debug(args);

      let data = await qscc.qscc(
        channelName,
        chaincodeName,
        args,
        fcn,
        req.username,
        req.orgname
      );

      const response_payload = {
        status: data.result != null ? "ok" : "failed",
        message: data.message,
        data: data.result,
      };

      res.send(response_payload);
    } catch (error) {
      const response_payload = {
        status: "error",
        message: error.name + ": " + error.message,
        data: null,
      };
      res.send(response_payload);
    }
  }
);

////////////////////////////////////////
const {
  Gateway,
  Wallets,
  DefaultEventHandlerStrategies,
  DefaultQueryHandlerStrategies,
} = require("fabric-network");
const path = require("path");
const { contractListener } = require("./app/Listeners.js");
async function main() {
  const gateway = new Gateway();

  try {
    const walletPath = path.resolve(__dirname, "org1-wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const identityLabel = "admin"; // Thay thế bằng tên identity của bạn
    const identity = await wallet.get(identityLabel);
    if (!identity) {
      console.log(`Identity '${identityLabel}' not found in wallet`);
      return;
    }

    const connectionProfilePath = path.resolve(
      __dirname,
      "./config/connection-org1.json"
    ); // Đường dẫn đến file connection.json của bạn
    const connectionProfile = require(connectionProfilePath);

    const gatewayOptions = {
      identity,
      wallet,
      discovery: { enabled: true, asLocalhost: true }, // Đảm bảo sự kiện được lắng nghe trên toàn bộ mạng
      eventHandlerOptions: {
        strategy: DefaultEventHandlerStrategies.MSPID_SCOPE_ALLFORTX,
      },
      queryHandlerOptions: {
        strategy: DefaultQueryHandlerStrategies.MSPID_SCOPE_SINGLE,
      },
    };

    await gateway.connect(connectionProfile, gatewayOptions);

    const network = await gateway.getNetwork("mychannel"); // Thay thế 'mychannel' bằng tên kênh của bạn

    const contract = network.getContract("transaction_cc"); // Thay thế 'your_chaincode_name' bằng tên chaincode của bạn
    // Lắng nghe sự kiện
    await contract.addContractListener(contractListener);

    console.log("Listening for events...");
    // Giữ kết nối mở để lắng nghe sự kiện
    await new Promise(() => {});
  } finally {
    // Đảm bảo đóng kết nối sau khi lắng nghe sự kiện
    gateway.disconnect();
  }
}

main()
  .then(() => {
    console.log("Event listener started");
  })
  .catch((e) => {
    console.error(`Error: ${e}`);
    process.exit(1);
  });
