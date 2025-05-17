// 사용자 정보 유효성 검사 미들웨어
const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;
  
  // 필수 필드 검사
  if (!username || !email || !password) {
    return res.status(400).json({ 
      message: '모든 필드를 입력해주세요.'
    });
  }
  
  // 이메일 형식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      message: '유효한 이메일 주소를 입력해주세요.'
    });
  }
  
  // 비밀번호 길이 검사
  if (password.length < 6) {
    return res.status(400).json({ 
      message: '비밀번호는 최소 6자 이상이어야 합니다.'
    });
  }
  
  // 다음 미들웨어로 진행
  next();
};

module.exports = validateUser; 