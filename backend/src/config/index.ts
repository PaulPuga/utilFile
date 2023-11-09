import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("🔴 Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT || '3000'),
  hostName: process.env.HOST_NAME || 'http://localhost',
  /**
   * Logs configs
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
    morganLogType:
      process.env.MORGAN_LOG_TYPE ||
      'dev' /* Morgan module log type, such as: dev, convined, common, short, tiny */,
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * upload file configs
   */
  uploadFiles: {
    uploadLimit: 10,
    mbLimitSize: 10,
  },
};
