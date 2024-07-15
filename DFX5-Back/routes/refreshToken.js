const express = require('express');
const { verifyRefreshToken } = require('../auth/verify');
const { generateAccessToken } = require('../auth/generateTokens');
const router = express.Router();

router.post('/', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json(
      jsonResponse(401, { error: 'Token de actualización no proporcionado' })
    );
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken({ userId: payload.userId });

    res.json(jsonResponse(200, { accessToken }));
  } catch (error) {
    res.status(403).json(jsonResponse(403, { error: 'Token de actualización inválido' }));
  }
});

module.exports = router;
