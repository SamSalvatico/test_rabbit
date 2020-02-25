// import * as Amqp from "amqp-ts";
// import * as dotenv from 'dotenv';
// import { exitOnError } from "winston";

// dotenv.config();
// //console.log("1");
// // npm run build-ts
// // npm run rabbit

// var amqpHost = process.env.AMQP_HOST ? process.env.AMQP_HOST : "localhost";
// var amqpPort = process.env.AMQP_PORT ? process.env.AMQP_PORT : "5672";
// var connection = new Amqp.Connection("amqp://" + amqpHost + ":" + amqpPort);
// var exchangeName = process.env.AMQP_EXCHANGE_NAME ? process.env.AMQP_EXCHANGE_NAME : "exchange";
// var exchangeType = process.env.AMQP_EXCHANGE_TYPE ? process.env.AMQP_EXCHANGE_TYPE : "default";
// var exchange = connection.declareExchange(exchangeName, exchangeType);
// var queueName = process.env.AMQP_QUEUE ?
//     process.env.AMQP_QUEUE :
//     (exchangeType == "topic" ? "" : "queue");
// var queue = connection.declareQueue(queueName);
// var routingKey = process.env.AMQP_ROUTING_KEY ? process.env.AMQP_ROUTING_KEY : undefined;

// queue.bind(exchange, routingKey);

// /*queue.activateConsumer((message) => {
//     console.log("Message received: ", message);
// });*/

// //console.log("2");

// // it is possible that the following message is not received because
// // it can be sent before the queue, binding or consumer exist
// var msg = new Amqp.Message("Test");
// exchange.send(msg,routingKey);
// console.log("Sent");
// process.exit(-1);
// //connection.completeConfiguration().then(() => {
// //    // the following message will be received because
// //    // everything you defined earlier for this connection now exists
// //        var msg2 = new Amqp.Message("Test2");
// //        exchange.send(msg2);
// //    console.log("Ciao");
// //});
