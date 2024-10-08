const amqp = require("amqplib")
const exchangeName = 'logs'
async function sendMsg() {
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, 'fanout')
    channel.publish(exchangeName, '', Buffer.from("message from rabbit"))
    setTimeout(() => {
        channel.close()
        process.exit(0)
    }, 500)
}
sendMsg()