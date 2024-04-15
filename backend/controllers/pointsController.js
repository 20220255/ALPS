const asyncHandler = require("express-async-handler");
const Points = require("../models/pointsModel");
const User = require("../models/userModel");
const Reference = require("../models/referenceModel");
const { error } = require("console");
const { json } = require("express");

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
    const { pointsId } = req.params;
    const { refId } = req.body;
    await Reference.findByIdAndUpdate(refId, {
      $pull: { pointsIds: pointsId },
    });
    const resp = await Points.findByIdAndDelete(pointsId);
    res.status(200).json(resp);
  } catch (error) {
    throw new Error(error);
  }
});

//////////////////////////////////////////////////////////////////

// Get points array obj with ref id
const getPointsByRef = asyncHandler(async (req, res) => {
  try {
    const { refId } = req.params;
    const points = await Reference.find({ _id: refId }).populate("pointsIds");
    res.status(200).json(points);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// Add points by ref
const addPointsByRef = asyncHandler(async (req, res) => {
  try {
    const { refId } = req.params;
    const { pointsDate, points, comments, userId } = req.body;
    // add points
    const pointsObj = await Points.create({
      pointsDate,
      points,
      comments,
      userId,
    });

    // find related ref id and add the points obj to the ref id
    const refIdObj = await Reference.findOneAndUpdate(
      { _id: refId },
      { $push: { pointsIds: pointsObj._id } }
    );

    // populate points ids on the ref id
    const refIdObjAddPts = await Reference.find({ _id: refId }).populate(
      "pointsIds"
    );
    res.status(200).json(refIdObjAddPts);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// get overall total points
const findTotalPoints = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    // get all ref ids of user from User
    const refIds = await User.findById(userId).select("refIds");
    // get all reference objects from Reference of the ref ids found from User
    const pointIds = await Reference.find({ _id: { $in: refIds.refIds } });
    // get all the pointsId
    const ptsIds = pointIds.map((p) => p.pointsIds);

    // convert to pointsId into array - myPtsArray
    const myPtsArray = [];
    const getPtsId = async () => {
      for (let index = 0; index < ptsIds.length; index++) {
        const element = ptsIds[index];
        for (let i = 0; i < element.length; i++) {
          const myElement = element[i];
          myPtsArray.push(myElement);
        }
      }
    };
    await getPtsId();

    // use myPtsArray as a criteria to get the points from Points table
    // points from Points document
    const points = await Points.find({ _id: { $in: myPtsArray } });

    // add all points from selected pointsId
    const totalPoints = points.reduce((accumulator, object) => {
      return accumulator + object.points;
    }, 0);
    res.status(200).json(totalPoints);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// get total points per customer ToDo task
const getTotalPtsPerCust = asyncHandler(async (req, res) => {
  try {
    const ptsPerCust = await Points.find({}).select("userId points");
    res.status(200).json(ptsPerCust);
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
  getPointsByRef,
  findTotalPoints,
  getTotalPtsPerCust,
};
