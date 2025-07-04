# TradinAI2

Esta aplicación contiene un backend en Node.js y un frontend en React para mostrar datos de mercado.

## Variables de entorno

No se requiere autenticación ni configuración adicional.

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

## Actualización automática de datos

La aplicación vuelve a solicitar los datos de la API cada minuto para mantener el gráfico actualizado.

## Datos en tiempo real

Se agregó un endpoint `/api/realtime/:symbol` en el backend que permite obtener
velas recientes de distintos mercados sin necesidad de credenciales. Para
criptomonedas se usan datos de CoinGecko y para acciones se consultan precios de
Stooq.
