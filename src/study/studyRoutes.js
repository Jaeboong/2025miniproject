const express = require("express");
const router = express.Router();

const studyController = require("./studyController");

router.get("/summary/:member_id", studyController.getUserStudySummary);
router.get("/wrong/:member_id", studyController.getWrongNotes);

module.exports = router;
