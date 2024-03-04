const express = require("express");
const router = express.Router();

const {
  getPtsListByRef,
  addPoints,
  getRefIds
} = require("../controllers/pointsController");
const { protect, checkAdmin } = require("../middleware/authMiddleware");

router.get("/:refId", protect, getPtsListByRef);
router.get("/user/:userId", protect, getRefIds);
router.post("/addPoints", protect, checkAdmin, addPoints);


module.exports = router;
