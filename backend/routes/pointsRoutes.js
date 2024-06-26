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
  findTotalPoints,
  getTotalPtsPerCust
} = require("../controllers/pointsController");

const { protect, checkAdmin } = require("../middleware/authMiddleware");
// Todo task getTotalPtsPerCustomer
router.get("/get-total-points", getTotalPtsPerCust);
router.get("/:refId", protect, getPtsListByRef);
router.get("/find-total-points/:userId", findTotalPoints);
router.get("/user/:userId", protect, getRefIds);
router.get("/point/:_id", protect, checkAdmin, getPoints);
router.post("/addPoints", protect, checkAdmin, addPoints);
router.post("/addPointsByRef/:refId", protect, checkAdmin, addPointsByRef);
router.get("/getPointsByRef/:refId", getPointsByRef);
router.put("/update-points", protect, checkAdmin, updatePoints)
router.delete("/delete-points/:pointsId", protect, checkAdmin, deletePoints)

module.exports = router;
