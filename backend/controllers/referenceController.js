const asyncHandler = require("express-async-handler");
const Points = require("../models/pointsModel");
const User = require("../models/userModel");
const { error } = require("console");
const { generateRefId } = require("../utils/generateRefId");
const Reference = require("../models/referenceModel");

// Create reference IDs
const createRefId = asyncHandler(async (req, res) => {
  const refId = await Reference.create({
    refId: await generateRefId(),
  });

  if (refId) {
    res.status(201).json({
      _id: refId._id,
      refId: refId.refId,
      claimDate: refId.claimDate,
      refPoints: refId.refPoints,
      pointsIds: [{}],
    });
  } else {
    res.status(400);
    throw new error("Invalid reference data");
  }
});

module.exports = {
  createRefId,
};
