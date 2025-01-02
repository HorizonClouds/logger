const { Kafka } = require('kafkajs');
const fs = require('fs');
const config = require('./config');

const kafka = new Kafka({
  clientId: 'logger-service',
  brokers: [config.kafkaBroker]
});

const consumer = kafka.consumer({ groupId: 'log-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: config.kafkaTopic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const logMessage = message.value.toString();
      console.log(logMessage);
      fs.appendFileSync(config.logFilePath, logMessage + '\n');
    },
  });
};

run().catch(console.error);
