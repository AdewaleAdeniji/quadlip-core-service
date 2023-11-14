// authController.js

const axios = require("axios");
const { config } = require("../utils/configs");
const { WrapHandler, validateRequest } = require("../utils");
const { LoginUser, getUser, getUserAPIKeys } = require("../services/auth.service");
const { CreateWallet } = require("../services/wallet.service");

const loginUser = WrapHandler(async (req, res) => {
  const val = validateRequest(req.body, ["email", "password"]);
  if (val) return res.status(400).send(val);
  const { email, password } = req.body;
  try {
    const resp = await LoginUser(email, password);
    const requestResponse = {
      code: resp.success ? 200 : 400,
      success: resp.success,
    };
    var walletResponse  = {}
    if(resp.success) {
        const wallet = await CreateWallet(resp.userID, email);
        // console.log(wallet);
        walletResponse.balance = wallet?.walletBalance;
        walletResponse.walletStatus = wallet?.walletStatus;
    }
    return res
      .status(requestResponse?.code)
      .json({ ...requestResponse, ...resp, ...walletResponse });
  } catch (error) {
    res.status(400).json({ success: false, ...error.response?.data });
  }
});

const registerUser = WrapHandler(async (req, res) => {
  const val = validateRequest(req.body, ["email", "password", "username"]);
  if (val) return res.status(400).send(val);
  const { email, password, username } = req.body;

  try {
    var payload = {
      method: "post",
      url: `${config.USER_SERVICE_URL}/auth/register`,
      headers: {
        appKey: config.USER_SERVICE_API_KEY,
      },
      data: {
        email,
        password,
        firstName: username,
        lastName: username,
      },
    };
    const response = await axios(payload);
    // setup api ke
    // setup user wallet
    const user = response.data;
    const userID = user?.userID;
    const wallet = await CreateWallet(userID, email);
    res.json(response.data);
  } catch (error) {
    console.log("here");
    res.status(400).json({ success: false, ...error.response.data });
  }
});
const UserProfile = WrapHandler(async (req, res) => {
  const userID = req.userID;
  // get user
  // get user wallet
  const user = await getUser(userID);
  if(!user.success) {
    return res.status(400).json(user);
  }
  const wallet = await CreateWallet(userID, user.email);
  var walletResponse  = {
    balance: 0,
    walletStatus: false,
  }
  if(wallet.success) {
    walletResponse.balance = wallet?.walletBalance;
    walletResponse.walletStatus = wallet?.walletStatus;
  }
  var apiKeys = await getUserAPIKeys(userID);
  if(!apiKeys.success) apiKeys = {}
  return res.send({ ...user, ...walletResponse, ...apiKeys });
});
module.exports = {
  loginUser,
  registerUser,
  UserProfile,
};
