const express = require("express");
const router = express.Router();

const {
  getPtsListByRef,
  addPoints,
  getRefIds,
  getPoints,
  updatePoints,
  deletePoints,
  addPointsByRef,
  getPointsByRef,
} = require("../controllers/pointsController");
const { protect, checkAdmin } = require("../middleware/authMiddleware");

router.get("/:refId", protect, getPtsListByRef);
router.get("/user/:userId", protect, getRefIds);
router.get("/point/:_id", protect, checkAdmin, getPoints);
router.post("/addPoints", protect, checkAdmin, addPoints);
router.post("/addPointsByRef/:refId", addPointsByRef);
router.get("/getPointsByRef/:refId", getPointsByRef);
router.put("/update-points", protect, checkAdmin, updatePoints)
router.delete("/delete-points/:_id", protect, checkAdmin, deletePoints)

module.exports = router;
