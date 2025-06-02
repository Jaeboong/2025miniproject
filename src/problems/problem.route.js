// src/routes/problem.route.js 
const express = require("express");
const router = express.Router();
const db = require("../global/models.js");
const authMiddleware = require("../middleware/auth.middleware"); // JWT 인증 미들웨어 추가

// 전체 문제 조회
router.get("/", async (req, res) => {
  try {
    const problems = await db.problem.findAll({
      include: [{
        model: db.problemSet,
        attributes: ['title', 'subject', 'questionType', 'difficultyLevel']
      }]
    });
    res.json(problems);
  } catch (err) {
    console.error("문제 조회 오류:", err);
    res.status(500).json({ error: "서버 오류 발생" });
  }
});

// ✅ 문제 정답 제출 (JWT 인증 미들웨어 적용)
router.post("/:problemId/submit", authMiddleware, async (req, res) => {
  try {
    const problemId = parseInt(req.params.problemId);
    const { answer } = req.body;
    const memberId = req.user.memberId; // JWT 인증 미들웨어에서 추가됨

    const problem = await db.problem.findByPk(problemId, {
      include: [{
        model: db.problemSet,
        attributes: ['subject']
      }]
    });

    if (!problem) {
      return res.status(404).json({ error: "문제를 찾을 수 없습니다." });
    }

    const isCorrect =
      problem.answer.trim().toLowerCase() === answer.trim().toLowerCase();

    // 이전 시도 횟수 확인
    const previousAttempt = await db.study.findOne({
      where: {
        memberId,
        problemId
      },
      order: [['createdAt', 'DESC']]
    });

    // studies에 풀이 기록 저장
    await db.study.create({
      memberId,
      problemId,
      userAnswer: answer,
      isCorrect,
      attemptCount: previousAttempt ? previousAttempt.attemptCount + 1 : 1,
      createdAt: new Date()
    });

    res.json({
      problemId: problem.problemId,
      isCorrect,
      correctAnswer: problem.answer,
      explanation: problem.explanation
    });
  } catch (err) {
    console.error("정답 제출 오류:", err);
    res.status(500).json({ error: "서버 오류 발생" });
  }
});

module.exports = router;
