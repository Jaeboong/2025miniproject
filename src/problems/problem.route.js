// src/routes/problem.route.js
const express = require("express");
const router = express.Router();
const db = require("../global/models.js");

// ✅ 전체 문제 조회
router.get("/", async (req, res) => {
  try {
    const problems = await db.problem.findAll(); // 소문자 db.problem
    res.json(problems);
  } catch (err) {
    console.error("문제 조회 오류:", err);
    res.status(500).json({ error: "서버 오류 발생" });
  }
});

// ✅ 문제 정답 제출
router.post("/:problemId/submit", async (req, res) => {
  try {
    const problemId = parseInt(req.params.problemId);
    const { answer } = req.body;

    const problem = await db.problem.findByPk(problemId);

    if (!problem) {
      return res.status(404).json({ error: "문제를 찾을 수 없습니다." });
    }

    const isCorrect =
      problem.answer.trim().toLowerCase() === answer.trim().toLowerCase();

    res.json({
      problemId: problem.problemId,
      isCorrect,
      correctAnswer: problem.answer,
    });
  } catch (err) {
    console.error("정답 제출 오류:", err);
    res.status(500).json({ error: "서버 오류 발생" });
  }
});

module.exports = router;
