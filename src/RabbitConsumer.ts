import * as Amqp from 'amqp-ts';
import * as dotenv from 'dotenv';
import LogstashClient from './LogstashClient';
import { on } from 'cluster';
import { isNull } from 'util';
import Utils from './Utils';

class RabbitConsumer {
  private amqpHost: string;
  private amqpPort: string;
  private exchangeName: string;
  private exchangeType: string;
  private connection: any;
  private exchange: any;
  private queueName: string;
  private logstashClient: any;
  private queue: any;
  private routingKey: any;

  constructor(
    amqpHost: string | null = null,
    amqpPort: string | null = null,
    exchangeName: string | null = null,
    exchangeType: string | null = null,
    queueName: string | null = null,
    routingKey: any | null = null,
  ) {
    dotenv.config();
    this.amqpHost = Utils.getPropertyValueComparing(amqpHost, "AMQP_HOST", "localhost");
    this.amqpPort = Utils.getPropertyValueComparing(amqpPort, "AMQP_PORT", 5672);
    this.exchangeName = Utils.getPropertyValueComparing(exchangeName, "AMQP_EXCHANGE_NAME", "exchange");
    this.exchangeType = Utils.getPropertyValueComparing(exchangeType, "AMQP_EXCHANGE_TYPE", "default");
    this.queueName = Utils.getPropertyValueComparing(queueName, "AMQP_QUEUE", "queue");
    this.routingKey = Utils.getPropertyValueComparing(routingKey, "AMQP_ROUTING_KEY", undefined);
  }

  public startConnection(startConsumer: boolean = false) {
    this.connection = new Amqp.Connection('amqp://' + this.amqpHost + ':' + this.amqpPort);
    this.connection.on('error_connection', (err: any) => {
      console.log(err);
    });
    this.connection.on('open_connection', () => {
      console.log('open');
    });

    this.connection.on('close_connection', () => {
      console.log('close');
    });

    this.connection.on('lost_connection', () => {
      console.log('lost');
    });

    this.connection.on('trying_connect', () => {
      console.log('try');
    });

    this.connection.on('re_established_connection', () => {
      console.log('re');
    });
    this.exchange = this.connection.declareExchange(this.exchangeName, this.exchangeType);
    this.queue = this.connection.declareQueue(this.queueName);
    this.queueBind();
  }

  private queueBind() {
    this.queue.bind(this.exchange, this.routingKey);
  }

  public queueActivateConsumer(callback: any) {
    this.queue.activateConsumer(
      (message: any) => {
        console.log('Message received: ', message.getContent());
        callback(message);
      },
      { noAck: false },
    );
  }

  public queueCompleteConfiguration() {
    this.connection.completeConfiguration().then(() => {
      this.connection.on('error_connection', (err: any) => {
        console.log(err);
      });
    });
  }
}

export default RabbitConsumer;
