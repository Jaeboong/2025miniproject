# Mini Project Backend

Node.js/Express 기반의 백엔드 API 서버입니다.

## 🚀 배포 가이드 (Ubuntu Server)

### 전제 조건
- Ubuntu Server 환경
- 도메인: `jhhackathon.store`
- 서버 IP: `1.247.204.214`
- 포트포워딩 설정 완료

### 1단계: 서버 환경 구축

```bash
# 배포 스크립트 실행 권한 부여
chmod +x deploy.sh

# 서버 환경 자동 설정
./deploy.sh
```

### 2단계: 프로젝트 배포

```bash
# 프로젝트 디렉토리로 이동
cd /var/www/miniproject

# 프로젝트 파일 복사 (Git 또는 SCP 사용)
git clone <repository-url> .
# 또는
# scp -r ./2025miniproject/* user@1.247.204.214:/var/www/miniproject/

# 의존성 설치
npm install --production
```

### 3단계: 환경 변수 설정

```bash
# .env 파일 생성
cp .env.example .env

# 환경 변수 수정
nano .env
```

`.env` 파일 내용:
```env
NODE_ENV=production
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mini
DB_USER=mini1234
DB_PASSWORD=mini1234

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Application Configuration
DOMAIN=jhhackathon.store
SERVER_IP=1.247.204.214

# CORS Configuration
CORS_ORIGIN=https://jhhackathon.store
```

### 4단계: SSL 인증서 설정

```bash
# Let's Encrypt SSL 인증서 발급
sudo certbot --nginx -d jhhackathon.store -d www.jhhackathon.store

# 자동 갱신 테스트
sudo certbot renew --dry-run
```

### 5단계: Nginx 설정

```bash
# Nginx 설정 파일 복사
sudo cp nginx.conf /etc/nginx/sites-available/miniproject

# 설정 활성화
sudo ln -s /etc/nginx/sites-available/miniproject /etc/nginx/sites-enabled/

# 기본 설정 비활성화
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl reload nginx
```

### 6단계: 데이터베이스 시작

```bash
# Docker 컨테이너 시작
docker-compose up -d

# 데이터베이스 마이그레이션
npm run migrate:prod
```

### 7단계: 애플리케이션 시작

```bash
# PM2로 애플리케이션 시작
pm2 start ecosystem.config.js --env production

# PM2 프로세스 목록 확인
pm2 list

# PM2 자동 시작 설정
pm2 startup
pm2 save
```

## 🔧 운영 명령어

### 애플리케이션 관리
```bash
# 재시작
pm2 restart miniproject-backend

# 중지
pm2 stop miniproject-backend

# 로그 확인
pm2 logs miniproject-backend

# 모니터링
pm2 monit
```

### 데이터베이스 관리
```bash
# 컨테이너 상태 확인
docker-compose ps

# 데이터베이스 백업
docker exec notice mysqldump -u mini1234 -p mini > backup.sql

# phpMyAdmin 접속
https://jhhackathon.store/phpmyadmin
```

### 시스템 상태 확인
```bash
# 서비스 상태
sudo systemctl status nginx
sudo systemctl status docker

# 서버 리소스 확인
htop
df -h
free -h

# 네트워크 포트 확인
sudo netstat -tlnp | grep :443
sudo netstat -tlnp | grep :3000
```

## 🔒 보안 설정

- SSL/TLS 암호화 (Let's Encrypt)
- 방화벽 설정 (UFW)
- 보안 헤더 (Nginx)
- 프로세스 격리 (PM2 Cluster Mode)

## 📞 문제 해결

### 흔한 문제들

1. **SSL 인증서 문제**
   ```bash
   sudo certbot certificates
   sudo certbot renew
   ```

2. **포트 충돌**
   ```bash
   sudo lsof -i :3000
   sudo lsof -i :443
   ```

3. **Docker 권한 문제**
   ```bash
   sudo usermod -aG docker $USER
   # 로그아웃 후 재로그인
   ```

## 📊 모니터링

### Health Check
- URL: `https://jhhackathon.store/health`
- 응답: `{"status":"OK","timestamp":"...","environment":"production"}`

### 로그 위치
- PM2 로그: `/var/log/pm2/`
- Nginx 로그: `/var/log/nginx/`
- Docker 로그: `docker-compose logs`

## 🎯 접속 URL

- **메인 사이트**: https://jhhackathon.store
- **API 엔드포인트**: https://jhhackathon.store/api
- **Health Check**: https://jhhackathon.store/health
- **phpMyAdmin**: https://jhhackathon.store/phpmyadmin

---

배포 중 문제가 발생하면 로그를 확인하고 위의 문제 해결 가이드를 참조하세요!
