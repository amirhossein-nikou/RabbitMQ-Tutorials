const amqp = require("amqplib")
const exchangeName = "topic"
const [logType, message] = process.argv.slice(2, 4)
async function sendMsg() {
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, "topic")
    channel.publish(exchangeName, logType, Buffer.from(message))
    setTimeout(()=> {
        channel.close()
        process.exit(0)
    })
}
sendMsg()