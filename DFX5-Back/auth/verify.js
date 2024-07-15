const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido.' });
    }

    req.user = user;
    next();
  });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
}

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
};
