const amqp = require('amqplib')
async function receiveFromService1() {
    const queueName = 'service1'
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel()
    // when this option is true, after we turn off system when we turn on service save data and write them in queue
    // but when this option is false after turning of system or any problems data remove and despiser
    await channel.assertQueue(queueName, { durable: true })
    let index = 0;
    await channel.consume(queueName, msg => {
        console.log(`${index}: `,msg.content.toString());
        index++
        channel.ack(msg)
    }) // noAck option: this option confirm the received message and remove message from queue

}
receiveFromService1()
