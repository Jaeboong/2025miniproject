// 글로벌 에러 핸들러 미들웨어
const errorHandler = (err, req, res, next) => {
  console.error('에러 발생:', err);

  // Sequelize 유효성 검사 에러 처리
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: '유효성 검사 실패',
      errors: err.errors.map(e => e.message)
    });
  }
  
  // Sequelize 고유 제약 조건 위반 에러 처리
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      message: '이미 존재하는 데이터입니다',
      errors: err.errors.map(e => e.message)
    });
  }
  
  // 기본 에러 응답
  return res.status(err.statusCode || 500).json({
    message: err.message || '서버 내부 오류가 발생했습니다',
    error: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler; 