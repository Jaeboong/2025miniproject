const express = require("express");
const router = express.Router();

const studyController = require("./studyController");

router.get("/user-studyset/:member_id", studyController.getUserStudySummary);
router.get("/wrongproblems/:member_id", studyController.getWrongNotes);

module.exports = router;