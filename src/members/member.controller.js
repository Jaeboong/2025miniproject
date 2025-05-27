// src/members/member.controller.js
const memberService = require("./member.service");

/**
 * 회원가입
 */
async function register(req, res) {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: "입력 값 누락" });
    }

    const newUser = await memberService.registerMember({
      email,
      name,
      password,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    if (err.message === "DUPLICATE_EMAIL") {
      return res.status(409).json({ error: "중복된 이메일" });
    }

    console.error(err);
    return res.status(500).json({ error: "서버 오류" });
  }
}

/**
 * 로그인
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "입력 값 누락" });
    }

    const result = await memberService.loginMember({ email, password });

    return res.status(200).json(result);
  } catch (err) {
    if (err.message === "INVALID_CREDENTIALS") {
      return res
        .status(401)
        .json({ error: "이메일 또는 비밀번호가 일치하지 않음" });
    }

    console.error(err);
    return res.status(500).json({ error: "서버 오류" });
  }
}

/**
 * 프로필 조회 (토큰 필요)
 */
async function getProfile(req, res) {
  try {
    const memberId = req.user.memberId; // JWT 인증 미들웨어에서 추가됨
    const profile = await memberService.getProfile(memberId);

    return res.status(200).json(profile);
  } catch (err) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "사용자 정보를 찾을 수 없음" });
    }

    console.error(err);
    return res.status(500).json({ error: "서버 오류" });
  }
}

/**
 * 프로필 수정
 */
async function updateProfile(req, res) {
  try {
    const memberId = req.user.memberId;
    const { name } = req.body;

    const updated = await memberService.updateProfile(memberId, { name });

    return res.status(200).json(updated);
  } catch (err) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "사용자 정보 없음" });
    }
    if (err.message === "NO_CHANGE") {
      return res.status(400).json({ error: "변경할 정보가 없습니다" });
    }

    console.error(err);
    return res.status(500).json({ error: "서버 오류" });
  }
}

/**
 * 회원 탈퇴
 */
async function deleteAccount(req, res) {
  try {
    const memberId = req.user.memberId;
    await memberService.deleteMember(memberId);

    return res.status(204).send();
  } catch (err) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "사용자 정보 없음" });
    }

    console.error(err);
    return res.status(500).json({ error: "서버 오류" });
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  deleteAccount,
};
