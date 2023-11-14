// buy airtime
// get transaction history
// fund account here

const {
  GetWalletByWalletID,
  GetWalletHistory,
  FundWalletRequest,
  GetPaymentRequest,
  BuyAirtime,
} = require("../services/wallet.service");
const { WrapHandler, validateRequest } = require("../utils");

const getTransactionHistory = WrapHandler(async (req, res) => {
  const userID = req.userID;
  const wallet = await GetWalletByWalletID(userID);
  if (!wallet.success)
    return res.status(400).json({
      transactions: [],
      response: "Wallet Not found",
      success: false,
      ...wallet,
    });
  const walletID = wallet.walletID;
  const history = await GetWalletHistory(walletID);
  if (!history.success)
    return res.status(400).json({
      transactions: [],
      success: false,
      ...history,
    });
  return res.json({
    success: true,
    ...history,
  });
});
// fund wallet
const fundWalletRequest = WrapHandler(async (req, res) => {
  const userID = req.userID;

  const amount = req.params.amount;

  const wallet = await GetWalletByWalletID(userID);
  if (!wallet.success)
    return res.status(400).json({
      transactions: [],
      response: "Wallet Not found",
      success: false,
      ...wallet,
    });
  const walletID = wallet.walletID;

  const fund = await FundWalletRequest(walletID, amount);
  if (!fund.success)
    return res
      .status(400)
      .json({ message: "Unable to create fund request", ...fund });
  return res.json({
    success: true,
    ...fund,
  });
});
// get payment request

const getPaymentRequestStatus = WrapHandler(async (req, res) => {
  const paymentID = req.params.paymentID;

  const payment = await GetPaymentRequest(paymentID);
  if (!payment.success)
    return res.status(400).json({
      success: false,
      ...payment,
    });
  return res.json({
    success: true,
    ...payment,
  });
});

// buy airtime

const buyAirtime = WrapHandler(async (req, res) => {
  const userID = req.userID;
  const wallet = await GetWalletByWalletID(userID);
  const val = validateRequest(req.body, ["amount", "phone"]);
  if (val) return res.status(400).send(val);
  const { amount, phone } = req.body;
  if (!wallet.success)
    return res.status(400).json({
      response: "Wallet Not found",
      success: false,
      ...wallet,
    });
  const walletID = wallet.walletID;
  const buy = await BuyAirtime(walletID, phone, amount);
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
  getTransactionHistory,
  fundWalletRequest,
  getPaymentRequestStatus,
  buyAirtime,
};
