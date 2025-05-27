// src/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // 환경변수 또는 기본값

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Authorization 헤더가 없거나 형식이 틀렸다면
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "인증 토큰이 없습니다" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>" → <token> 추출

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // 컨트롤러에서 req.user로 접근 가능
    next(); // 다음 미들웨어 or 컨트롤러 실행
  } catch (err) {
    return res.status(401).json({ error: "유효하지 않은 토큰입니다" });
  }
}

module.exports = authMiddleware;
