// src/members/member.route.js
const express = require("express");
const router = express.Router();
const memberController = require("./member.controller");
const authMiddleware = require("../middleware/auth.middleware"); // JWT 인증 미들웨어

// 회원가입
router.post("/register", memberController.register);

// 로그인
router.post("/login", memberController.login);

// 프로필 조회 (로그인 필요)
router.get("/profile", authMiddleware, memberController.getProfile);

// 프로필 수정 (로그인 필요)
router.put("/profile", authMiddleware, memberController.updateProfile);

// 회원 탈퇴 (로그인 필요)
router.delete("/account", authMiddleware, memberController.deleteAccount);

module.exports = router;
