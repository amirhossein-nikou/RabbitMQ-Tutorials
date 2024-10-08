const amqp = require("amqplib")
const queueName = "RPC"
async function processTask() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName)
    console.log("wait for process");
    channel.consume(queueName, msg => {
        console.log("received: ", msg.content.toString());
        const data = parseInt(msg.content.toString())
        let temp = 0
        for (let i = 1; i <= data; i++) {
            temp += (i* data)
        }
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(temp.toString()), {
            correlationId: msg.properties.correlationId
        })
        channel.ack(msg)
    })
}
processTask()