module.exports = {
  apps: [
    {
      name: "etransfer-telegram-bot-server-test",
      script: "./src/index.js",
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      ignore_watch: ["node_modules", "logs", ".tmp"],
      max_memory_restart: "1G",
      env: {
        BUILD_ENV: "testnet",
      },
    },
    {
      name: "etransfer-telegram-bot-server",
      script: "./src/index.js",
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      ignore_watch: ["node_modules", "logs", ".tmp"],
      max_memory_restart: "1G",
      env: {
        BUILD_ENV: "mainnet",
      },
    },
  ],
};
