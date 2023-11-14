const configs = require("../utils/configs");
const apiConfig = configs.config;
var axios = require("axios");

exports.CreateWallet = async (userID, email) => {
  var config = {
    method: "post",
    url: apiConfig.WALLET_SERVICE_URL + "/wallets/create",
    headers: {
        'Authorization':  `Bearer ${apiConfig.WALLET_SERVICE_TOKEN}`, 
    },
    data: {
      walletRef: userID,
      isPermanent: true,
      isVirtualAccount: false,
      amount: "0",
      email: email,
    },
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    return {
      success: false,
      ...err.response.data,
    };
  }
};