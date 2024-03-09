const asyncHandler = require("express-async-handler");
const Points = require("../models/pointsModel");
const User = require("../models/userModel");
const Reference = require("../models/referenceModel");
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
    console.log(userId + " userId getrefId PointsController");
    const refIdRecords = await Points.find({ userId });
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

// Get the individual points from Points table
const getPoints = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const pointsData = await Points.findOne({ _id });
    if (pointsData.length != 0) {
      res.status(200).json(pointsData);
    } else {
      res.status(400);
      throw new Error("Points ID is invalid");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// Update Points
const updatePoints = asyncHandler(async (req, res) => {
  try {
    const { _id, pointsDate, points, claimed, comments } = req.body;
    const user = await Points.findOneAndUpdate(
      { _id },
      { pointsDate, points, claimed, comments },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Points
const deletePoints = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const resp = await Points.findByIdAndDelete(_id);
    res.status(200).json(resp);
  } catch (error) {
    throw new Error(error);
  }
});


//////////////////////////////////////////////////////////////////

// Get points array obj with ref id
const getPointsByRef = asyncHandler(async(req, res) => {
  try {
    const { refId } = req.params;
    const points = await Reference.find({_id: refId}).populate('pointsIds')
    res.status(200).json(points)
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
}) 

// Add points by ref
const addPointsByRef = asyncHandler(async (req, res) => {
  try {
    const { refId } = req.params;
    const { pointsDate, points, comments } = req.body;

    // add points
    const pointsObj = await Points.create({
      pointsDate,
      points,
      comments,
    });

    // find related ref id and add the points obj to the ref id
    const refIdObj = await Reference.findOneAndUpdate(
      { _id: refId },
      { $push: {pointsIds: pointsObj._id} }
    )
    
    // populate points ids on the ref id
    const refIdObjAddPts = await Reference.find({_id: refId}).populate("pointsIds")
    console.log(refIdObjAddPts + ' 162')  
    res.status(200).json(refIdObjAddPts);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});




module.exports = {
  getPtsListByRef,
  addPoints,
  getRefIds,
  getPoints,
  updatePoints,
  deletePoints,
  addPointsByRef,
  getPointsByRef
};
