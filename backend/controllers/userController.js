const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Points = require("../models/pointsModel");
const bcrypt = require("bcryptjs");
const { error, count } = require("console");
const jwt = require("jsonwebtoken");

// Register
const registerUser = asyncHandler(async (req, res) => {
  const { name, lastName, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    // throw new error triggers the errorMiddleware which has an err attribute
    throw new Error("Please include all fields");
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create refId
  const generateRefId = async () => {
    const numDocs = await User.countDocuments();
    const generateRandomString = function (length = 6) {
      return Math.random().toString(20).substr(2, length).toLocaleUpperCase();
    };
    const rnd = generateRandomString();
    return rnd + "-" + numDocs;
  };

  // Create user
  const user = await User.create({
    name,
    lastName,
    email,
    password: hashedPassword,
    // refId: await generateRefId(),
  });

  // Create Ref ID record
  const pointsRefId = await Points.create({
    refId: await generateRefId(),
    userId: user._id
  })


  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      points: user.points,
      refId: pointsRefId.refId,
      lastDateVisited: user.lastDateVisited,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });




  } else {
    res.status(400);
    throw new error("Invalid user data");
  }
});

// Login
const loginUser = asyncHandler(async (req, res) => {
  console.log("api login");
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      points: user.points,
      refId: user.refId,
      lastDateVisited: user.lastDateVisited,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// Update Data
const update = asyncHandler(async (req, res) => {
  const { _id, points, name, lastName, lastDateVisited, email } = req.body;
  const user = await User.findOneAndUpdate(
    { _id },
    { lastName, name, lastDateVisited, email, lastName, points },
    { new: true }
  );
  res.status(200).json(user);
});

// View All Customer
const viewAll = asyncHandler(async (req, res) => {
  const user = await User.find({}).select(
    "name lastName email lastDateVisited points refId createdAt isAdmin"
  );

  res.status(200).json(user);
});

// Get customer details
const getCustomerDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).select(
      "name lastName email lastDateVisited points refId isAdmin"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
});

const getCustDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  res.status(200).json(user);
});

// Add Points
const addCustomerPoints = asyncHandler(async (req, res) => {
  const { pointsDate, washClaimed, points, userId, refId } = req.body;

  // Create refId
  // const generateRefId = async () => {
  //   const numDocs = await User.countDocuments();
  //   const generateRandomString = function (length = 6) {
  //     return Math.random().toString(20).substr(2, length).toLocaleUpperCase();
  //   };
  //   const rnd = generateRandomString();
  //   return rnd + "-" + numDocs;
  // };

  const pointsRef = await Points.create({
    pointsDate,
    washClaimed,
    points,
    userId,
    refId, //: await generateRefId(),
  });

  if (pointsRef) {
    res.status(201).json({
      pointsDate: pointsRef.pointsDate,
      washClaimed: pointsRef.washClaimed,
      points: pointsRef.points,
      userId: pointsRef.userId,
      refId: pointsRef.refId,
    });
  } else {
    res.status(400);
    throw new error("Invalid points entry");
  }
});

// Claim Free Wash
const claimFreeWash = asyncHandler(async (req, res) => {
  const { refId } = req.body;
  const isClaimed = await Points.findOne({ washClaimed: true, refId });
  res.status(201).json({
    isClaimed: isClaimed,
    refId: refId,
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  viewAll,
  update,
  getCustomerDetails,
  getCustDetails,
  addCustomerPoints,
  claimFreeWash,
};
