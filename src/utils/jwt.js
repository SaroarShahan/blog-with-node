const { createSecretKey } = require('crypto');
const { SignJWT, jwtVerify, decodeJwt } = require('jose');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

exports.generateToken = async (payload) => {
  const secret = config.jwtSecret;

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  const secretKey = createSecretKey(secret, 'utf-8');

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(config.JWT_EXPIRES_IN || '7d')
    .sign(secretKey);
};

exports.verifyToken = async (token) => {
  const secretKey = createSecretKey(config.jwtSecret, 'utf-8');
  const { payload } = await jwtVerify(token, secretKey);

  return {
    id: payload.id,
    role: payload.role,
  };
};

exports.decodeToken = async (token) => {
  try {
    const payload = decodeJwt(token);

    return {
      id: payload.id,
      role: payload.role,
    };
  } catch {
    return null;
  }
};
