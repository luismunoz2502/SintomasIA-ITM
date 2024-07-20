# DFX5Login

## Descripción
Este proyecto se basa en una aplicación web que incluye funcionalidades de login y signup. Después de iniciar sesión, el usuario accede a una interfaz donde puede usar el micrófono para interactuar con la aplicación. La aplicación integra Deepgram para transcribir audio a texto y luego utiliza la API de ChatGPT para generar respuestas basadas en el texto transcrito. El usuario puede ver la respuesta generada en la interfaz de chat después de enviar su mensaje.


## Estructura del Proyecto
El proyecto está dividido en tres directorios principales:

1. **dfx5-back**: Directorio que contiene el backend del proyecto, responsable de conectar con MongoDB.
2. **dfx5prueba**: Directorio que contiene el frontend del proyecto, desarrollado con React.
3. **serverdfx**: Directorio que contiene el servidor WebSocket para la transcripción en tiempo real.

## Instalación
Sigue estos pasos para instalar y configurar cada parte del proyecto:


## En general
 Clonar el repositorio del backend:
   
    git clone https://github.com/luismunoz2502/DFX5Login.git
 


### Backend (dfx5-back)


1 Navegar al directorio del proyecto:
    ```bash
    cd dfx5-back
    ```

2. Instalar las dependencias:
    ```bash
    npm install
    ```

3. Configurar las variables de entorno en un archivo `.env`:
    ```env
    DB_CONNECTION_STRING=your-mongodb-connection-string
    DG_KEY='Your DEEPGRAM key'
    CHATGPT_API_KEY= 'yor OPEN AI API key'
    ```

1. Iniciar el servidor:
    ```bash
    npm start
    ```

### Frontend (dfx5prueba)


1. Navegar al directorio del proyecto:
    ```bash
    cd dfx5prueba
    ```

2. Instalar las dependencias:
    ```bash
    npm install
    ```

3. Iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```

### WebSocket Server (serverdfx)


1. Navegar al directorio del proyecto:
    ```bash
    cd serverdfx
    ```

2. Instalar las dependencias:
    ```bash
    npm install
    ```

3. Configurar las variables de entorno en un archivo `.env`:
    ```env
   DG_KEY=your-deepgram-api-key
    ```

4. Iniciar el servidor WebSocket:
    ```bash
    npm start
    ```

## Uso
Para usar la aplicación, sigue estos pasos:

1. Asegúrate de tener todos los servidores (backend, frontend, WebSocket) en funcionamiento.
2. Accede a `http://localhost:5173` en tu navegador.
3. Regístrate o inicia sesión con tus credenciales.
4. Una vez autenticado, accederás a la interfaz principal.
5. Presiona el botón de grabar para comenzar a usar el micrófono.
6. Habla y espera a que la aplicación transcriba tu voz a texto.
7. Envía el mensaje transcrito para recibir una respuesta generada por ChatGPT.
8. La respuesta aparecerá en la interfaz de chat.

## Contribución
Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agregar nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.


## Contacto
Tu nombre - [@LuisMunoz2502] - Ldavid.munoz@udea.edu.co

## Reconocimientos
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Deepgram](https://www.deepgram.com/)
- [ChatGPT](https://www.openai.com/chatgpt)