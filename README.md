# TradinAI2

Esta aplicación contiene un backend en Node.js y un frontend en React para mostrar datos de mercado y autenticación con Google.

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:

```
GOOGLE_CLIENT_ID=tu-client-id-de-google
GOOGLE_CLIENT_SECRET=tu-client-secret-de-google
```

Para el frontend, también crea un archivo `frontend/.env` con:

```
VITE_GOOGLE_CLIENT_ID=tu-client-id-de-google
```

Reemplaza `tu-client-id-de-google` y `tu-client-secret-de-google` con las credenciales obtenidas desde la consola de Google Cloud.

## Instalación

Instala las dependencias para el backend y el frontend:

```bash
npm install --prefix backend
npm install --prefix frontend
```

## Ejecutar en desarrollo

En una terminal inicia el backend:

```bash
npm start --prefix backend
```

En otra terminal inicia el frontend:

```bash
npm run dev --prefix frontend
```
