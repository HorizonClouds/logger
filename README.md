# Logger Centralizado

Este proyecto es un logger centralizado que se encarga de leer mensajes desde Kafka y procesarlos. Consta de tres componentes principales:
1. Un microservicio que imprime logs por consola (este proyecto).
2. Dos contenedores adicionales: Zookeeper y Kafka.
3. Los microservicios que quieran enviar logs a Kafka.

El logger se encuentra en la carpeta `src/exporter-example`.

## Añadir el Logger a un Nuevo Repositorio

Para usar el logger en un nuevo repositorio, sigue estos pasos:

1. Copia el archivo `logger.js` desde la carpeta `src/exporter-example/utils` a tu nuevo repositorio.
2. Importa el archivo `logger.js` en tu archivo principal de entrada (por ejemplo, `server.js`).
3. Configura las variables de entorno en el archivo `.env` según sea necesario. Puedes encontrar un ejemplo en el archivo `src/exporter-example/.env.example`. Asegúrate de incluir las siguientes variables:
   ```
   KAFKA_SERVICE_NAME=nombre_del_servicio
   LOGLEVEL=INFO
   KAFKA_ENABLED=true
   KAFKA_BROKER=localhost:9092
   KAFKA_TOPIC=logs
   ```

4. Instala las dependencias necesarias:
    ```sh
    npm install kafkajs dotenv
    ```

5. Ejecuta el microservicio:

    Reemplaza `my-microservice.js` con el nombre de tu archivo principal de entrada:
    ```sh
    node my-microservice.js
    ```

    Alternativamente, puedes usar los scripts definidos en tu archivo `package.json`:

    Si tienes un script de inicio configurado:
    ```sh
    npm start
    ```

    Si tienes un script de desarrollo configurado:
    ```sh
    npm run dev
    ```

## Requisitos y Configuración de este Proyecto

Para que el logger funcione correctamente, es necesario tener configurados Zookeeper y Kafka. A continuación, se muestran los comandos para ejecutar Zookeeper y Kafka utilizando Docker:

1. Ejecutar Zookeeper:
   ```sh
   docker run -d --name zookeeper -p 2181:2181 zookeeper:3.4.13
   ```

2. Ejecutar Kafka:
   ```sh
   docker run -d --name kafka -p 9092:9092 --link zookeeper:zookeeper -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka:latest
   ```

Estos comandos inician contenedores de Docker para Zookeeper y Kafka. Zookeeper es un servicio centralizado para mantener información de configuración, nombres distribuidos y proporcionar sincronización distribuida. Kafka depende de Zookeeper para coordinar y gestionar el clúster de brokers.

3. Ejecutar el logger centralizado (este proyecto):
   ```sh
   npm install
   node src/index.js
   ```

Este microservicio se encargará de imprimir por consola todos los logs que lea de Kafka. Una vez que ambos servicios (Zookeeper y Kafka) estén en funcionamiento, el logger podrá conectarse a Kafka para leer los mensajes y procesarlos según sea necesario.
