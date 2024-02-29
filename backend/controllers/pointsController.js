const asyncHandler = require("express-async-handler");
const Points = require("../models/pointsModel");
const User = require("../models/userModel");
const { error } = require("console");

// Get points by reference id
const getPtsListByRef = asyncHandler(async (req, res) => {
  try {
    const { refId } = req.params
    console.log(refId)
    const pointsRef = await Points.find({refId});
    if (pointsRef.length !== 0) {
        res.status(200).json(pointsRef);        
    } else {
        res.status(400)
        throw new Error('Invalid Ref ID')
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)    
  }
});

module.exports = {
    getPtsListByRef,
};
