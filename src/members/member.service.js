// src/members/member.service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { member: Member } = require("../global/models"); // ✅ 소문자 member import 후 대문자 변수로 사용

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET 값이 설정되지 않았습니다 (.env 확인)");
  process.exit(1);
}

/**
 * 회원 가입 처리
 */
async function registerMember({ email, name, password }) {
  const existing = await Member.findOne({ where: { email } });
  if (existing) {
    throw new Error("DUPLICATE_EMAIL");
  }

  const hashedPw = await bcrypt.hash(password, 10);

  const newMember = await Member.create({
    email,
    name,
    password: hashedPw,
  });

  return {
    memberId: newMember.memberId, // ✅ 수정됨
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

  const token = jwt.sign(
    {
      memberId: member.memberId, // ✅ 수정됨
      email: member.email,
      name: member.name,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      memberId: member.memberId, // ✅ 수정됨
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
    memberId: member.memberId,
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
  member.modifiedAt = new Date(); // ✅ 수정: 카멜케이스
  await member.save();

  return {
    memberId: member.memberId,
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
