const express = require('express');
const User = require('../schema/User');
const { jsonResponse } = require('../lib/jsonResponse');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  // Log de datos recibidos
  console.log('Datos recibidos:', { username, email, password });

  if (!username || !email || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: 'Todos los campos son obligatorios',
      })
    );
  }

  try {
    let existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json(
        jsonResponse(409, {
          error: 'El nombre de usuario o correo electrónico ya están en uso',
        })
      );
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json(
      jsonResponse(201, {
        message: 'Usuario creado exitosamente',
      })
    );
  } catch (error) {
    console.error('Error al crear usuario:', error);

    // Manejar errores específicos de MongoDB por clave duplicada
    if (error.code === 11000 && error.keyValue && error.keyValue.email === null) {
      return res.status(400).json(
        jsonResponse(400, {
          error: 'El campo Email no puede ser null',
        })
      );
    }

   
    res.status(500).json(
      jsonResponse(500, {
        error: 'Error interno del servidor al crear usuario',
      })
    );
  }
});

module.exports = router;
