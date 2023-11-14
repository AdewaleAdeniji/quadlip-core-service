const express = require("express");
const app = express();
const cors = require("cors");
// const middlewares = require("./middlewares/user");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { loginUser, registerUser, UserProfile } = require("./controllers/UserController");
const { validateUser, validateAPIKey } = require("./middlewares/auth");
const { getTransactionHistory, fundWalletRequest, getPaymentRequestStatus, buyAirtime } = require("./controllers/WalletController");
const { GetWalletAPI, buyAirtimeAPI } = require("./controllers/APIController");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(function (error, _, res, next) {
  //Catch json error
  if (error) {
    return res.status(400).send({ message: "Invalid Request" });
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/health", (_, res) => {
  return res.status(200).send("OK");
});

app.post("/auth/login", loginUser);
app.post("/auth/register", registerUser);

app.get("/user/profile", validateUser, UserProfile);

app.get("/user/transactions", validateUser, getTransactionHistory);
app.get("/user/fund/:amount", validateUser, fundWalletRequest);
app.get("/user/request/:paymentID", validateUser, getPaymentRequestStatus);

//spend

app.post("/wallet/spend/airtime", validateUser, buyAirtime);

//api
app.get("/api/wallet", validateAPIKey, GetWalletAPI)
app.post("/api/spend/airtime/:phone/:amount", validateAPIKey, buyAirtimeAPI);


app.get("*", (_, res) => {
  return res.status(404).send("Not found");
});
app.post("*", (_, res) => {
  return res.status(404).send("Not found");
});




mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.K_DB, // specify the database name here
  })
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("error occured connecting to mongodb"));
// add ability to close mongo connection once app is closed/shutdown

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
