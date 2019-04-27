module.exports = {
  apps: [
    {
      name: "maps-demo-client",
      cwd: "./client",
      script: "npm",
      args: "run start",
      watch: false,
      max_restarts: 0,
      autorestart: false,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    },
    {
      name: "hyperlocus-server",
      cwd: "./server",
      script: "server.js",
      watch: true,
      env: {
        PORT: 4000,
        NODE_ENV: "development"
      },
      env_production: {
        PORT: 4000,
        NODE_ENV: "production"
      }
    }
  ]
};
