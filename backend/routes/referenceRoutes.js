const express = require("express");
const router = express.Router();

const { createRefId, updateClaim } = require("../controllers/referenceController");

const { protect, checkAdmin } = require("../middleware/authMiddleware");

router.post("/", protect, checkAdmin, createRefId);
router.patch("/update-claim", updateClaim)
// router.get("/customers", checkAdmin, viewAll);
// router.get("/customer-details/:id", getCustomerDetails);
// router.post("/login", loginUser);
// router.put("/update", update);
// router.get("/me", protect, getMe);
// router.post("/points", addCustomerPoints);
// router.get("/points/claimed", claimFreeWash);

module.exports = router;
