
const jwt = require('jsonwebtoken');
const User = require('../routes/user'); 

const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !await user.comparePassword(password)) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const { accessToken, refreshToken } = generateTokens(user);
  res.json({ user: { _id: user._id, username: user.username }, accessToken, refreshToken });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ error: 'No se proporcionó token de actualización' });

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { accessToken } = generateTokens({ _id: payload.userId });

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ error: 'Token de actualización inválido' });
  }
};

module.exports = { login, refreshToken };

