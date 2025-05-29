require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./src/global/models");
const cors = require("cors");
const app = express();

// 📌 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const globalRoutes = require("./src/global");
app.use("/api", globalRoutes);

// 📌 정적 파일 (index.html) 제공
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

// 📌 404 처리
app.use((req, res) => {
  res.status(404).send("페이지를 찾을 수 없습니다");
});

// 📌 DB 동기화 후 서버 시작
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
