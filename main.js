const express = require('express');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 등록
app.use('/api/users', userRoutes);

// 루트 엔드포인트
app.get('/', (req, res) => {
  res.send('서버가 실행 중입니다!');
});

// 데이터베이스 연결 테스트
app.get('/db-test', async (req, res) => {
  try {
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

// 글로벌 에러 핸들러 등록 (모든 라우트 이후에 등록해야 함)
app.use(errorHandler);

// Sequelize 동기화 및 서버 시작
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 동기화 완료');
    app.listen(PORT, () => {
      console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
    });
  })
  .catch(err => {
    console.error('데이터베이스 동기화 오류:', err);
  }); 