const { getUser } = require("../services/auth.service");
const {
  GetWalletByWalletID,
  BuyAirtime,
  CreateWallet,
} = require("../services/wallet.service");
const { WrapHandler, validateRequest } = require("../utils");

const GetWalletAPI = WrapHandler(async (req, res) => {
  const userID = req.userID;
  // get user
  // get user wallet
  const user = await getUser(userID);
  if (!user.success) {
    return res.status(400).json(user);
  }
  const wallet = await CreateWallet(userID, user.email);
  var walletResponse = {
    balance: 0,
    walletStatus: false,
  };
  if (wallet.success) {
    walletResponse.balance = wallet?.walletBalance;
    walletResponse.walletStatus = wallet?.walletStatus;
  }
  return res.send({ ...walletResponse });
});
const buyAirtimeAPI = WrapHandler(async (req, res) => {
  const userID = req.userID;
  const wallet = await GetWalletByWalletID(userID);
  const { phone, amount } = req.params;
  if (!wallet.success)
    return res.status(400).json({
      response: "Wallet Not found",
      success: false,
      ...wallet,
    });
  const walletID = wallet.walletID;
  const buy = await BuyAirtime(walletID, phone, parseInt(amount));
  if (!buy.success)
    return res.status(400).json({
      success: false,
      ...buy,
    });
  return res.json({
    success: true,
    ...buy,
  });
});
module.exports = {
  buyAirtimeAPI,
  GetWalletAPI,
};
