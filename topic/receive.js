const amqp = require("amqplib")
const exchangeName = "direct"
const logType = process.argv.slice(2)
async function receiveMsg() {
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, "topic")
    const assertedQueue = await channel.assertQueue('', { exclusive: true })
    for (const pattern of logType) {
        await channel.bindQueue(assertedQueue.queue, exchangeName, pattern)
    }
    await channel.consume(assertedQueue.queue, msg => {
        console.log(msg.content.toString());
    })
}
receiveMsg()