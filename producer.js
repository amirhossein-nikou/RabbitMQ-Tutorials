const amqp = require('amqplib')
async function connectToService1() {
    const queueName = 'service1'
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel()
    // when this option is true, after we turn off system when we turn on service save data and write them in queue
    // but when this option is false after turning of system or any problems data remove and despiser
    await channel.assertQueue(queueName, { durable: true })
    channel.sendToQueue(queueName, Buffer.from("hello from rabbitMQ"))
    setTimeout(()=> {
        connection.close()
        process.exit(0)
    },1000)
}
for (let i = 0; i < 20; i++) {
      connectToService1()
}