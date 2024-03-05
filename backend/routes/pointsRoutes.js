const express = require("express");
const router = express.Router();

const {
  getPtsListByRef,
  addPoints,
  getRefIds,
  getPoints,
  updatePoints,
  deletePoints,
} = require("../controllers/pointsController");
const { protect, checkAdmin } = require("../middleware/authMiddleware");

router.get("/:refId", protect, getPtsListByRef);
router.get("/user/:userId", protect, getRefIds);
router.get("/point/:_id", protect, checkAdmin, getPoints);
router.post("/addPoints", protect, checkAdmin, addPoints);
router.put("/update-points", updatePoints)
router.delete("/delete-points/:_id", protect, checkAdmin, deletePoints)

module.exports = router;
