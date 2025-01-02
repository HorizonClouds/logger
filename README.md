# logger

Este proyecto es un logger centralizado que se encarga de leer mensajes desde Kafka y procesarlos. Consta de tres componentes principales:
1. Un microservicio que imprime logs por consola (este proyecto).
2. Dos contenedores adicionales: Zookeeper y Kafka.
3. Los microservicios que quieran enviar logs a Kafka.

Para usarlo, solo necesitas añadir el archivo `logger-example.js` a un microservicio y configurar las variables de entorno especificadas en el archivo `.env`.

## Requisitos

Para que el logger funcione correctamente, es necesario tener configurados Zookeeper y Kafka. A continuación, se muestran los comandos para ejecutar Zookeeper y Kafka utilizando Docker:

1. Ejecutar Zookeeper:
   ```sh
   docker run -d --name zookeeper -p 2181:2181 zookeeper:3.4.13
   ```

2. Ejecutar Kafka:
   ```sh
   docker run -d --name kafka -p 9092:9092 --link zookeeper:zookeeper -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka:latest
   ```

3. Ejecutar el logger centralizado (este proyecto):
   ```sh
   npm install
   node src/index.js
   ```

Estos comandos inician contenedores de Docker para Zookeeper y Kafka. Zookeeper es un servicio centralizado para mantener información de configuración, nombres distribuidos y proporcionar sincronización distribuida. Kafka depende de Zookeeper para coordinar y gestionar el clúster de brokers.

## Configuración del Microservicio

Para configurar el microservicio que utilizará el logger centralizado, sigue estos pasos:

1. Añadir el archivo `logger-example.js` a tu microservicio.
2. Configurar las variables de entorno en el archivo `.env` según sea necesario. Asegúrate de incluir las siguientes variables:
   ```
   KAFKA_BROKER=localhost:9092
   KAFKA_TOPIC=logs
   ```

3. Instalar las dependencias necesarias y ejecutar el microservicio:
   ```sh
   npm install kafkajs dotenv
   node my-microservice.js
   ```

Este microservicio se encargará de imprimir por consola todos los logs que lea de Kafka. Una vez que ambos servicios (Zookeeper y Kafka) estén en funcionamiento, el logger podrá conectarse a Kafka para leer los mensajes y procesarlos según sea necesario.
