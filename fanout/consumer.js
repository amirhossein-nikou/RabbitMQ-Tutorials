const amqp = require("amqplib")
const exchangeName = 'logs'
async function receiveMsg() {
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, 'fanout')
    const assertedQueue = await channel.assertQueue('', { exclusive: true })
    console.log("binding queue: ", assertedQueue.queue);
    channel.bindQueue(assertedQueue.queue, exchangeName, '')
    await channel.consume(assertedQueue.queue, msg => {
        if(msg.content){
            console.log("message: ", msg.content.toString());
        }
    })
}
receiveMsg()