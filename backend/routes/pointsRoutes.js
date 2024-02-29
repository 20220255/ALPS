const express = require("express");
const router = express.Router();

const { getPtsListByRef } = require("../controllers/pointsController");

router.get("/:refId", getPtsListByRef);

module.exports = router;
