const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3200;

app.use(cors());
app.use(express.json());

async function startServer() {
  let connected = false;
  let attempts = 0;

  while (!connected && attempts < 5) {
    try {
      await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Conectado a MongoDB");
      connected = true;
    } catch (error) {
      console.error('Error de conexión a MongoDB:', error);
      attempts++;
      console.log(`Reintentando (${attempts}/5)...`);
      await new Promise(res => setTimeout(res, 5000)); // Espera 5 segundos antes de reintentar
    }
  }

  if (!connected) {
    console.error('No se pudo conectar a MongoDB después de varios intentos.');
    process.exit(1); // Salir del proceso si no se pudo conectar
  }

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

  app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto: ${port}`);
  });
}

startServer();
