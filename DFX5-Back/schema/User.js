const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../auth/generateTokens');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
});

// Middleware para hashear la contraseña antes de guardar
UserSchema.pre('save', function (next) {
  const user = this;

  // Si la contraseña no ha sido modificada, continuar
  if (!user.isModified('password')) {
    return next();
  }

  // Hashear la contraseña con bcrypt
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash; // Asignar la contraseña hasheada al usuario
    next();
  });
});

// Método para verificar si la contraseña es correcta
UserSchema.methods.isCorrectPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Método para generar un token de acceso utilizando jsonwebtoken
UserSchema.methods.createAccessToken = function () {
  return generateAccessToken({ userId: this._id });
};

// Método para generar un token de actualización utilizando jsonwebtoken
UserSchema.methods.createRefreshToken = async function () {
  return await generateRefreshToken({ userId: this._id });
};

module.exports = mongoose.model('User', UserSchema);
