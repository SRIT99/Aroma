const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 5000,

  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  admin: {
    creationSecret: process.env.ADMIN_CREATION_SECRET,
  },

  frontend: {
    url: process.env.FRONTEND_URL || "http://localhost:3000",
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    url: process.env.CLOUDINARY_URL,
  },

  upload: {
    maxSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },

  email: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  security: {
    bcryptRounds: 10,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  },

  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },

  apiBasePath: "",
};

// Validate required config
const required = [
  "cloudinary.cloudName",
  "cloudinary.apiKey",
  "cloudinary.apiSecret",
];
required.forEach((key) => {
  const value = key.split(".").reduce((obj, k) => obj?.[k], config);
  if (!value && config.env === "production") {
    throw new Error(`Required configuration missing: ${key}`);
  }
});

module.exports = config;
