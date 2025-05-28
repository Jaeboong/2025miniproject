const http = require("http");
const fs = require("fs");
const path = require("path");
const db = require("./src/global/models.js");

// HTML 경로 설정
const filePath = path.join(__dirname, "client", "index.html");

// 서버 생성
/* const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("서버 내부 오류 발생");
      } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("페이지를 찾을 수 없습니다");
  }
});
*/

// Sequelize 동기화 후 http 서버 실행
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 동기화 완료");
    server.listen(3000, () => {
      console.log("✅ 서버가 http://localhost:3000 에서 실행 중입니다!");
    });
  })
  .catch((err) => {
    console.error("데이터베이스 동기화 오류:", err);
  });
