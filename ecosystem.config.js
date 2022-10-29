module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [{
      name: 'api-server',
      script: 'npm',
      env_production: {
        NODE_ENV: 'development'
      },
      args: 'run start',
    }],
  };