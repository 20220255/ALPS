const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  viewAll,
  update,
  getCustomerDetails,
} = require("../controllers/userController");

const {protect, checkAdmin } = require('../middleware/authMiddleware')

router.post("/", registerUser);
router.get("/customers", checkAdmin, viewAll);
router.get("/customer-details/:id", getCustomerDetails);
router.post("/login", loginUser);
router.put("/update", update);
router.get("/me", protect, getMe);

module.exports = router;
