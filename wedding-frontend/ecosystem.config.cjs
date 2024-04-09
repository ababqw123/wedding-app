module.exports = {
  apps: [
    {
      // 운영 환경변수 (yarn pm2start)
      name: "wedding-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 80",
      instances: 4,
      exec_mode: "cluster",
      max_memory_restart: "500M",
      env: {
        MODE: "production",
      },
    },
  ],
};
