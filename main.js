const express = require('express');
const db = require('./src/Global/models');
const globalRouter = require('./src/Global/globalRouter');
const errorHandler = require('./src/Global/errorHandler');

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 글로벌 라우터 등록
app.use('/api', globalRouter);

// 글로벌 에러 핸들러 등록
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