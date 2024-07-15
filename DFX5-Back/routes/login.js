const express = require('express');
const User = require('../schema/User');
const { jsonResponse } = require('../lib/jsonResponse');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body; 

  try {

    const user = await User.findOne({ username });

  
    if (!user) {
      return res.status(401).json(
        jsonResponse(401, {
          error: 'Nombre de usuario no existe',
        })
      );
    }

    const passwordCorrect = await user.isCorrectPassword(password);

    if (!passwordCorrect) {
      return res.status(401).json(
        jsonResponse(401, {
          error: 'Nombre de usuario y/o contraseña incorrectos',
        })
      );
    }


    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();

    
    res.json(
      jsonResponse(200, {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
       
        },
      })
    );
  } catch (err) {
    
    console.error('Error al autenticar usuario:', err);
    res.status(500).json(
      jsonResponse(500, {
        error: 'Error interno del servidor al autenticar usuario',
      })
    );
  }
});

module.exports = router;
