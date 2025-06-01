#!/bin/bash

# 🚀 Ubuntu 서버 배포 스크립트
# jhhackathon.store (1.247.204.214)

set -e

echo "🔥 Ubuntu 서버 배포 시작..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 함수: 로그 출력
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. 시스템 업데이트
log_info "시스템 업데이트 중..."
sudo apt update && sudo apt upgrade -y

# 2. Docker 설치 확인 및 설치
if ! command -v docker &> /dev/null; then
    log_info "Docker 설치 중..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    log_info "Docker가 이미 설치되어 있습니다."
fi

# 3. Docker Compose 설치 확인 및 설치
if ! command -v docker-compose &> /dev/null; then
    log_info "Docker Compose 설치 중..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    log_info "Docker Compose가 이미 설치되어 있습니다."
fi

# 4. Node.js 설치 확인 및 설치
if ! command -v node &> /dev/null; then
    log_info "Node.js 설치 중..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    log_info "Node.js가 이미 설치되어 있습니다. 버전: $(node -v)"
fi

# 5. PM2 설치
if ! command -v pm2 &> /dev/null; then
    log_info "PM2 설치 중..."
    sudo npm install -g pm2
else
    log_info "PM2가 이미 설치되어 있습니다."
fi

# 6. Nginx 설치
if ! command -v nginx &> /dev/null; then
    log_info "Nginx 설치 중..."
    sudo apt install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
else
    log_info "Nginx가 이미 설치되어 있습니다."
fi

# 7. Certbot 설치 (Let's Encrypt)
if ! command -v certbot &> /dev/null; then
    log_info "Certbot 설치 중..."
    sudo apt install -y certbot python3-certbot-nginx
else
    log_info "Certbot이 이미 설치되어 있습니다."
fi

# 8. 프로젝트 디렉토리 생성
PROJECT_DIR="/var/www/miniproject"
log_info "프로젝트 디렉토리 생성: $PROJECT_DIR"
sudo mkdir -p $PROJECT_DIR
sudo chown -R $USER:$USER $PROJECT_DIR

# 9. 방화벽 설정
log_info "방화벽 설정 중..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000
sudo ufw allow 3306
sudo ufw allow 9008
sudo ufw --force enable

log_info "✅ 서버 환경 설정 완료!"
log_warn "다음 단계를 수행하세요:"
echo "1. 프로젝트 파일을 $PROJECT_DIR 에 업로드"
echo "2. .env 파일 생성 및 설정"
echo "3. SSL 인증서 설정: sudo certbot --nginx -d jhhackathon.store"
echo "4. 데이터베이스 컨테이너 시작: docker-compose up -d"
echo "5. 애플리케이션 시작: pm2 start ecosystem.config.js" 