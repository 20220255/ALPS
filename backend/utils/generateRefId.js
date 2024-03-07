const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const generateRefId = asyncHandler(async () => {
  const numDocs = await  User.countDocuments();
  const generateRandomString = function (length = 6) {
    return Math.random().toString(20).substr(2, length).toLocaleUpperCase();
  };
  const rnd = generateRandomString();
  return rnd + "-" + numDocs;
});

module.exports = { generateRefId };
