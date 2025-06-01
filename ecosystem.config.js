module.exports = {
  apps: [{
    name: 'miniproject-backend',
    script: 'server.js',
    cwd: '/var/www/miniproject',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: '/var/log/pm2/miniproject-error.log',
    out_file: '/var/log/pm2/miniproject-out.log',
    log_file: '/var/log/pm2/miniproject-combined.log',
    time: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    source_map_support: true,
    merge_logs: true
  }]
}; 