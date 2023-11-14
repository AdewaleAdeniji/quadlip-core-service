const { getFromCache, setToCache } = require("../utils/cache");
const configs = require("../utils/configs");
const apiConfig = configs.config;
var axios = require("axios");

exports.verifyToken = async (token) => {
  //TODO: implement caching here
  const user = getFromCache(token);
  if (user) {
    return user;
  }
  var config = {
    method: "get",
    url: apiConfig.USER_SERVICE_URL + "/token",
    headers: {
      appKey: apiConfig.USER_SERVICE_API_KEY,
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const req = await axios(config);
    setToCache(token, {
      success: true,
      ...req.data,
    });
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    console.log(err?.response);
    return {
      success: false,
      message: err?.response?.data?.message || "Unauthorized User ",
    };
  }
};
exports.verifyAPIKey = async (publicKey, privateKey) => {
  //TODO: implement caching here
  const user = getFromCache(publicKey + "-" + privateKey);
  if (user) {
    return user;
  }
  var config = {
    method: "get",
    url: apiConfig.USER_SERVICE_URL + "/key",
    headers: {
      appKey: apiConfig.USER_SERVICE_API_KEY,
      authPublickey: publicKey,
      authPrivatekey: privateKey,
    },
  };
  try {
    const req = await axios(config);
    setToCache(publicKey + "-" + privateKey, {
      success: true,
      ...req.data,
    });
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Unauthorized User ",
    };
  }
};
exports.getUser = async (userID) => {
  var config = {
    method: "get",
    url: apiConfig.USER_SERVICE_URL + "/auth/user/" + userID,
    headers: {
      appKey: apiConfig.USER_SERVICE_API_KEY,
    },
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err?.response?.data?.message || "Unauthorized User ",
    };
  }
};
exports.LoginUser = async (email, password) => {
  var config = {
    method: "post",
    url: apiConfig.USER_SERVICE_URL + "/auth/login",
    headers: {
      appKey: apiConfig.USER_SERVICE_API_KEY,
    },
    data: {
      email,
      password,
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
exports.getUserAPIKeys = async (userID) => {
  const keys = getFromCache(userID + "-apikeys");
  if (keys) {
    return {
      success: true,
      ...keys,
    };
  }
  const apiKeyPayload = {
    method: "get",
    url: `${apiConfig.USER_SERVICE_URL}/auth/create/api/${userID}`,
    headers: {
      appKey: apiConfig.USER_SERVICE_API_KEY,
    },
  };
  try {
    const req = await axios(apiKeyPayload);
    setToCache(userID + "-apikeys", req.data);
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
