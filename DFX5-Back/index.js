const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3200;

app.use(cors());
app.use(express.json());

// Importar y usar rutas
const chatHistoryRoutes = require('./routes/chatHistory');
const chatgptRoutes = require('./routes/chatgpt');

app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/user', require('./routes/user'));
app.use('/api/todos', require('./routes/todos'));
app.use('/api/refreshToken', require('./routes/refreshToken'));
app.use('/api/signout', require('./routes/logOut'));
app.use('/api/chatgpt', chatgptRoutes);
app.use('/api/chatHistory', chatHistoryRoutes);

app.get('/', (req, res) => {
  res.send('Hello world');
});

// Función para conectar a MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
}

// Solo inicia el servidor si no está en modo test
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en el puerto: ${port}`);
    });
  });
}

module.exports = { app, connectDB };

