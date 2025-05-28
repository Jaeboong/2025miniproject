const express = require("express");
const router = express.Router();
const db = require("../global/models.js");

// 문제 리스트 조회 (GET /api/problems)
router.get("/", async (req, res) => {
  try {
    const problems = await db.Problem.findAll();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: "서버 오류 발생" });
  }
});

// 답안 제출 (POST /api/problems/:problemId/submit)
router.post("/:problemId/submit", async (req, res) => {
  try {
    const problemId = parseInt(req.params.problemId);
    const { answer } = req.body;
    const problem = await db.Problem.findByPk(problemId);
    
    if (!problem) {
      return res.status(404).json({ error: "문제를 찾을 수 없습니다." });
    }
    
    const isCorrect = problem.answer === answer;
    res.json({
      problemId: problem.problemId,
      isCorrect,
      answer: problem.answer,
    });
  } catch (err) {
    res.status(500).json({ error: "서버 오류 발생" });
  }
});

module.exports = router;
