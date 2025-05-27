require("dotenv").config();
const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const db = require("./src/global/models.js");

const app = express(); // ✅ Express 앱 선언

// 미들웨어 설정
app.use(express.json()); // ✅ JSON 바디 파싱

// 라우터 연결
const memberRoutes = require("./src/members/member.route");
app.use("/api/users", memberRoutes);

// HTML 파일 응답
const filePath = path.join(__dirname, "client", "index.html");
app.get("/", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send("서버 내부 오류 발생");
    } else {
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.send(data);
    }
  });
});

// 나머지 요청 404 처리
app.use((req, res) => {
  res.status(404).send("페이지를 찾을 수 없습니다");
});

// Sequelize 동기화 후 서버 실행
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("✅ 데이터베이스 동기화 완료");
    app.listen(3000, () => {
      console.log("🚀 서버가 http://localhost:3000 에서 실행 중입니다!");
    });
  })
  .catch((err) => {
    console.error("데이터베이스 동기화 오류:", err);
  });
