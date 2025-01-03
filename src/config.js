require('dotenv').config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  backendPort: process.env.BACKEND_PORT || 6901,
  kafkaBroker: process.env.KAFKA_BROKER || 'localhost:9092',
  kafkaTopic: process.env.KAFKA_TOPIC || 'logs',
  logFilePath: process.env.LOG_FILE_PATH || 'src/logs/logfile.log'
};

module.exports = config;
