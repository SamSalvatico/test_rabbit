import RabbitConsumer from './RabbitConsumer';
import LogstashClient from './LogstashClient';

var logstashClient = new LogstashClient();
var rabbitConsumer = new RabbitConsumer();
var sendNackOnError: any = process.env.AMQP_SEND_NACK_ON_ERROR;

rabbitConsumer.startConnection(false);
rabbitConsumer.queueActivateConsumer((message: any) => {
  logstashClient.makePost(message.getContent(), (result: any) => {
    console.log(result);
    if (result) {
      message.ack();
    } else {
      console.log(sendNackOnError);
      if (sendNackOnError == true) {
        message.nack();
        console.log('ack send');
      }
    }
  });
});
