const asyncHandler = require("express-async-handler");
const Points = require("../models/pointsModel");
const User = require("../models/userModel");
const { error } = require("console");
const { generateRefId } = require("../utils/generateRefId");
const Reference = require("../models/referenceModel");
const { use } = require("../routes/userRoutes");

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

// Update Claim
const updateClaim = asyncHandler(async (req, res) => {
  try {
    const { refId, washClaimed } = req.body;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${day}-${month}-${year}`;

    const reference = await Reference.findOneAndUpdate(
      { _id: refId },
      { claimed: washClaimed, claimDate: currentDate },
      { new: true }
    );
    res.status(200).json(reference);
  } catch (error) {
    throw new Error(error);
  }
});

// Add reference to user
const addReference = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    // Create reference record id
    const refId = await Reference.create({
      refId: await generateRefId(),
    });
    const user = await User.findOneAndUpdate({_id: userId}, {
      $push: { refIds: refId._id },
    });
    const userRef = await User.findById(userId).populate("refIds")
    res.status(200).json(userRef);
  } catch (error) {}
});

module.exports = {
  createRefId,
  updateClaim,
  addReference,
};
