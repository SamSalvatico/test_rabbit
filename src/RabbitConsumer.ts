import * as Amqp from 'amqp-ts';
import * as dotenv from 'dotenv';
import LogstashClient from './LogstashClient';
import { on } from 'cluster';
import { isNull } from 'util';

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
    if (isNull(amqpHost)) {
      this.amqpHost = process.env.AMQP_HOST ? process.env.AMQP_HOST : 'localhost';
    } else {
      this.amqpHost = amqpHost;
    }
    if (isNull(amqpPort)) {
      this.amqpPort = process.env.AMQP_PORT ? process.env.AMQP_PORT : '5672';
    } else {
      this.amqpPort = amqpPort;
    }

    if (isNull(exchangeName)) {
      this.exchangeName = process.env.AMQP_EXCHANGE_NAME ? process.env.AMQP_EXCHANGE_NAME : 'exchange';
    } else {
      this.exchangeName = exchangeName;
    }

    if (isNull(exchangeType)) {
      this.exchangeType = process.env.AMQP_EXCHANGE_TYPE ? process.env.AMQP_EXCHANGE_TYPE : 'default';
    } else {
      this.exchangeType = exchangeType;
    }

    if (isNull(queueName)) {
      this.queueName = process.env.AMQP_QUEUE ? process.env.AMQP_QUEUE : exchangeType == 'topic' ? '' : 'queue';
    } else {
      this.queueName = queueName;
    }

    if (isNull(routingKey)) {
      this.routingKey = process.env.AMQP_ROUTING_KEY ? process.env.AMQP_ROUTING_KEY : undefined;
    } else {
      this.routingKey = routingKey;
    }

    //this.startConnection();

    //this.exchange = this.connection.declareExchange(this.exchangeName, this.exchangeType);
    //this.queue = this.connection.declareQueue(queueName);
    //this.queueBind();
    //this.queueActivateConsumer();
    //this.queueCompleteConfiguration();
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
