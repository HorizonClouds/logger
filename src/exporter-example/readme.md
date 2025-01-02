# Microservicio de Ejemplo con Logger de Kafka

Este es un microservicio de ejemplo que demuestra cómo exportar logs usando Kafka. El microservicio incluye un script simple y un logger que envía logs a un tópico de Kafka.

## Configuración

1. Copia el archivo `logger.js` a tu proyecto.
2. Importa el archivo `logger.js` en tu archivo principal de entrada (por ejemplo, `server.js`).

## Ejemplo

Aquí hay un ejemplo de cómo configurar el servidor:

```javascript
// filepath: /c:/Personal/Master/FIS/logger/src/exporter-example/server.js
import http from 'http';
import './utils/logger.js'; // Se necesita un archivo .env para que esto funcione

logger.info('Iniciando servidor...');
// Resto del código del servidor
```

## Variables de Entorno

Asegúrate de configurar las variables de entorno necesarias en un archivo `.env`. Puedes encontrar un ejemplo en el archivo `src/exporter-example/.env.example`.
