const express = require('express');
const router = express.Router();
const User = require('../User');

// User 라우터 등록
router.use('/users', User.routes);

// 루트 엔드포인트
router.get('/', (req, res) => {
  res.send('서버가 실행 중입니다!');
});

// 데이터베이스 연결 테스트
router.get('/db-test', async (req, res) => {
  try {
    const db = require('./models');
    await db.sequelize.authenticate();
    res.json({ 
      message: '데이터베이스 연결 성공!' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: '데이터베이스 연결 실패', 
      error: error.message 
    });
  }
});

module.exports = router; 