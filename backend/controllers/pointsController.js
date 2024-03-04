const asyncHandler = require("express-async-handler");
const Points = require("../models/pointsModel");
const User = require("../models/userModel");
const { error } = require("console");

// Get points by reference id
const getPtsListByRef = asyncHandler(async (req, res) => {
  try {
    const { refId } = req.params;
    const pointsRef = await Points.find({ refId });
    if (pointsRef.length !== 0) {
      res.status(200).json(pointsRef);
    } else {
      res.status(400);
      throw new Error("Invalid Ref ID");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// Add points by ref id
const addPoints = asyncHandler(async (req, res) => {
  
  const { refId, pointsDate, claimed, points, userId, comments } = req.body;

  console.log(refId + " refId")
  console.log(pointsDate + " pointsDate")
  console.log(userId + " user ID")
  console.log(claimed + " claimed")
  console.log(points + " points")
  console.log(comments + " comments")

  if (!refId || !pointsDate || !userId || !comments) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const pointsRef = await Points.create({
    refId,
    pointsDate,
    claimed,
    points,
    userId,
    comments,
  });

  if (pointsRef) {
    res.status(201).json({
      refId: pointsRef.refId,
      pointsDate: pointsRef.pointsDate,
      claimed: pointsRef.claimed,
      points: pointsRef.points,
      userId: pointsRef.userId,
      comments: pointsRef.comments,
    });
  } else {
    res.status(400);
    throw new error("Invalid data entry");
  }
});

// Get reference ids by user id
const getRefIds = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const refIdRecords = await Points.find({userId});
    if (refIdRecords.length != 0) {
      res.status(200).json(refIdRecords);
    } else {
      res.status(400);
      throw new Error("Invalid User ID");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  getPtsListByRef,
  addPoints,
  getRefIds,
};
