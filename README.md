
# logger

Este proyecto es un logger centralizado que se encarga de leer mensajes desde Kafka. Kafka es una plataforma de streaming distribuida que permite publicar, suscribir, almacenar y procesar flujos de registros en tiempo real.

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

3. Ejecutar el logger:
   ```sh
   npm install
   node src/index.js
   ```

Estos comandos inician contenedores de Docker para Zookeeper y Kafka. Zookeeper es un servicio centralizado para mantener información de configuración, nombres distribuidos y proporcionar sincronización distribuida. Kafka depende de Zookeeper para coordinar y gestionar el clúster de brokers.

Una vez que ambos servicios estén en funcionamiento, el logger podrá conectarse a Kafka para leer los mensajes y procesarlos según sea necesario.
