const express = require("express");
const router = express.Router();

const studyController = require("./studyController");

// md 설계에 맞게 라우트 경로 수정
router.get("/user-studyset/:member_id", studyController.getUserStudySummary);
router.get("/wrongproblems/:member_id", studyController.getWrongNotes);

module.exports = router;
