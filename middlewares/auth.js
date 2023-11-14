const { verifyToken, verifyAPIKey } = require("../services/auth.service");

exports.validateUser = async (req, res, next) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  if (!authorization) {
    return res.status(403).send({ message: "Forbidden access, login first" });
  }
  //validate the token itself
  const val = await verifyToken(authorization.split(" ")[1]);
  if (!val || !val.success) {
    return res.status(403).send({ message: "Access expired, login first" });
  }
  req.userID = val.userID;
  req.user = val;
  next();
};

exports.validateAPIKey = async (req, res, next) => {
    const headers = req.headers;
    const privateKey = headers.authprivatekey;
    const publicKey = headers.authpublickey;
    const appKey = headers.appkey;
    // console.log('here', headers);
    if (!privateKey || !publicKey) {
      return res.status(403).send({ message: "Forbidden ACCESS" });
    }
    //validate the token itself
    const val = await verifyAPIKey(publicKey, privateKey)
    if (!val) {
      return res.status(403).send({ message: "Invalid API key access" });
    }
    req.userID = val.userID;
    req.user = val;
    next();
  };