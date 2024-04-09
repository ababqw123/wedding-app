module.exports = {
  apps: [
    {
      // 운영 환경변수 (yarn pm2start)
      name: "wedding-frontend",
      script: "node_modules/next/dist/bin/next",
      instances: 4,
      exec_mode: "cluster",
      max_memory_restart: "500M",
      env: {
        PORT: 80,
        MODE: "production",
      },
    },
  ],
};
