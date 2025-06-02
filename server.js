require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./src/global/models");
const cors = require("cors");
const app = express();

// 📌 환경 변수
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// 📌 CORS 설정
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? ['https://jhhackathon.store', 'https://www.jhhackathon.store', 'https://jaeboong.github.io']
    : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// 📌 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// 📌 신뢰할 수 있는 프록시 설정 (Nginx 사용 시)
if (NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

const globalRoutes = require("./src/global");
app.use("/api", globalRoutes);

// 📌 정적 파일 (index.html) 제공
const filePath = path.join(__dirname, "client", "index.html");
app.get("/", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("파일 읽기 오류:", err);
      res.status(500).send("서버 내부 오류 발생");
    } else {
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.send(data);
    }
  });
});

// 📌 Health Check 엔드포인트
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV 
  });
});

// 📌 404 처리
app.use((req, res) => {
  res.status(404).send("페이지를 찾을 수 없습니다");
});

// 📌 DB 동기화 후 서버 시작
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("✅ 데이터베이스 동기화 완료");
    app.listen(PORT, () => {
      console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다! (${NODE_ENV})`);
      if (NODE_ENV === 'production') {
        console.log(`🌐 도메인: https://jhhackathon.store`);
      } else {
        console.log(`🌐 로컬: http://localhost:${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.error("데이터베이스 동기화 오류:", err);
    process.exit(1);
  });
