const express = require("express");
const problemRouter = require("../routes/problemRoute");

const router = express.Router();

// 시험문제 API 라우터 연결
router.use("/api/problems", problemRouter);

// 다른 라우터 추가 예시:
// const userRouter = require("../routes/userRoute");
// router.use("/api/users", userRouter);

module.exports = router;
