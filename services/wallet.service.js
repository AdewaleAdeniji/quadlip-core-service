const configs = require("../utils/configs");
const apiConfig = configs.config;
var axios = require("axios");

exports.CreateWallet = async (userID, email) => {
  var config = {
    method: "post",
    url: apiConfig.WALLET_SERVICE_URL + "/wallets/create",
    headers: {
      Authorization: `Bearer ${apiConfig.WALLET_SERVICE_TOKEN}`,
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
      ...err.response?.data,
    };
  }
};
exports.GetWalletByWalletID = async (walletID) => {
  var config = {
    method: "get",
    url: apiConfig.WALLET_SERVICE_URL + `/wallets/walletRef/${walletID}`,
    headers: {
      Authorization: `Bearer ${apiConfig.WALLET_SERVICE_TOKEN}`,
    },
  };
  console.log(config.url);
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    return {
      success: false,
      ...err.response?.data,
    };
  }
};
exports.GetWalletHistory = async (walletID) => {
  var config = {
    method: "get",
    url: apiConfig.WALLET_SERVICE_URL + `/wallets/transactions/${walletID}`,
    headers: {
      Authorization: `Bearer ${apiConfig.WALLET_SERVICE_TOKEN}`,
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
      ...err.response?.data,
    };
  }
};
exports.FundWalletRequest = async (walletID, amount) => {
  var config = {
    method: "post",
    url: apiConfig.WALLET_SERVICE_URL + `/wallets/fund/${walletID}`,
    headers: {
      Authorization: `Bearer ${apiConfig.WALLET_SERVICE_TOKEN}`,
    },
    data: {
      amount,
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
      ...err.response?.data,
    };
  }
};
exports.GetPaymentRequest = async (paymentID) => {
  var config = {
    method: "get",
    url: apiConfig.WALLET_SERVICE_URL + `/wallets/payment/${paymentID}`,
    headers: {
      Authorization: `Bearer ${apiConfig.WALLET_SERVICE_TOKEN}`,
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
      ...err.response?.data,
    };
  }
};

exports.BuyAirtime = async (walletID, number, amount) => {
  var config = {
    method: "post",
    url: apiConfig.WALLET_SERVICE_URL + `/wallets/spend/airtime/${walletID}`,
    headers: {
      Authorization: `Bearer ${apiConfig.WALLET_SERVICE_TOKEN}`,
    },
    data: {
      number,
      amount,
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
      ...err.response?.data,
    };
  }
};
