const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectDB } = require('../index');

before(async function () {
  this.timeout(20000); // hasta 20 segundos para conectar a la DB
  await connectDB();
});

after(async function () {
  await mongoose.connection.close();
});

describe('API Express', function () {

  it('POST /api/signup debe registrar un usuario', async function () {
    await request(app)
      .post('/api/signup')
      .send({
        username: `usuarioTest_${Date.now()}`,
        email: `test_${Date.now()}@example.com`,
        password: 'contraseñaSegura'
      })
      .expect(201);
  });

  it('POST /api/signup debe devolver 409 si el usuario ya existe', async function () {
    const userData = {
      username: 'usuer4oDfupelicado',
      email: 'dupfieadeo@example.com',
      password: 'contreseñaSegura'
    };

    // Primero creo el usuario
    await request(app)
      .post('/api/signup')
      .send(userData)
      .expect(201);

    // Luego intento crearlo otra vez
    await request(app)
      .post('/api/signup')
      .send(userData)
      .expect(409);
  });

});


