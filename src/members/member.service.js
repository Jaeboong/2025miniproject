// src/members/member.service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Member } = require("../global/models");

const JWT_SECRET = process.env.JWT_SECRET; // 보안용 키
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; // 토큰 유효 기간

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET 값이 설정되지 않았습니다 (.env 확인)");
  process.exit(1); // 서버 강제 종료
}

/**
 * 회원 가입 처리
 */
async function registerMember({ email, name, password }) {
  // 이메일 중복 확인
  const existing = await Member.findOne({ where: { email } });
  if (existing) {
    throw new Error("DUPLICATE_EMAIL");
  }

  // 비밀번호 해시
  const hashedPw = await bcrypt.hash(password, 10);

  // DB 저장
  const newMember = await Member.create({
    email,
    name,
    password: hashedPw,
  });

  return {
    memberId: newMember.member_id,
    email: newMember.email,
    name: newMember.name,
  };
}

/**
 * 로그인 처리
 */
async function loginMember({ email, password }) {
  const member = await Member.findOne({ where: { email } });
  if (!member) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(password, member.password);
  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // JWT 토큰 발급
  const token = jwt.sign(
    {
      memberId: member.member_id,
      email: member.email,
      name: member.name,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      memberId: member.member_id,
      name: member.name,
      email: member.email,
    },
  };
}

/**
 * 프로필 정보 조회
 */
async function getProfile(memberId) {
  const member = await Member.findByPk(memberId);
  if (!member) {
    throw new Error("NOT_FOUND");
  }

  return {
    memberId: member.member_id,
    email: member.email,
    name: member.name,
  };
}

/**
 * 프로필 수정
 */
async function updateProfile(memberId, { name }) {
  const member = await Member.findByPk(memberId);
  if (!member) throw new Error("NOT_FOUND");

  if (!name || name === member.name) {
    throw new Error("NO_CHANGE");
  }

  member.name = name;
  member.modified_at = new Date();
  await member.save();

  return {
    memberId: member.member_id,
    name: member.name,
    email: member.email,
  };
}

/**
 * 계정 삭제
 */
async function deleteMember(memberId) {
  const member = await Member.findByPk(memberId);
  if (!member) throw new Error("NOT_FOUND");

  await member.destroy();
}

module.exports = {
  registerMember,
  loginMember,
  getProfile,
  updateProfile,
  deleteMember,
};
