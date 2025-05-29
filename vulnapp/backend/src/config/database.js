// Multiple hardcoded credentials
const config = {
  development: {
    host: 'localhost',
    username: 'root',
    password: 'password123',
    database: 'vulnapp_dev'
  },
  production: {
    host: 'prod-db.vulnapp.com',
    username: 'admin',
    password: 'Prod_Password_2024!',
    database: 'vulnapp_prod',
    // Database connection with no SSL
    ssl: false,
    // Weak encryption
    encrypt: false
  },
  redis: {
    host: 'redis.vulnapp.com',
    port: 6379,
    password: 'redis_pass_123'
  }
};

module.exports = config;
