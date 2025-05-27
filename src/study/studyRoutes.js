const express = require("express");
const router = express.Router();

const studyController = require("./studyController");

router.get("/user-studyset/:member_id", studyController.getUserStudySummary);
router.get("/wrongproblems/:member_id", studyController.getWrongNotes);

router.get("/test", (req, res) => {
  res.send("라우터 작동 확인됨!");
});

module.exports = router;