import RabbitConsumer from './RabbitConsumer';
import LogstashClient from './LogstashClient';
import Utils from './Utils';

var logstashClient = new LogstashClient();
var rabbitConsumer = new RabbitConsumer();
var temp: any = Utils.getPropertyValueComparing(null, 'AMQP_SEND_NACK_ON_ERROR', false);
temp = String(temp);
var sendNackOnError = JSON.parse(temp);
rabbitConsumer.startConnection(false);
rabbitConsumer.queueActivateConsumer((message: any) => {
  logstashClient.makePost(message.getContent(), (result: any) => {
    console.log(result);
    if (result) {
      message.ack();
    } else {
      if (sendNackOnError) {
        message.nack();
        console.log('ack send');
      }
    }
  });
});
