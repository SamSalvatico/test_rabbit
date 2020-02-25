import RabbitConsumer from './RabbitConsumer';
import LogstashClient from './LogstashClient';

var logstashClient = new LogstashClient();
var rabbitConsumer = new RabbitConsumer();

rabbitConsumer.startConnection(false);
rabbitConsumer.queueActivateConsumer((message: any) => {
  logstashClient.makePost(message.getContent(), (result: any) => {
    console.log(result);
    if (result) {
      message.ack();
      console.log('ack send');
    }
  });
});
