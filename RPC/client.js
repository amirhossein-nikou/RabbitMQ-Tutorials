const amqp = require("amqplib")
const { v4: uuidV4 } = require("uuid")
const uuid = uuidV4();
const queueName = "RPC"
const arg = process.argv.slice(2)
async function sendTaskToProcess() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel()
    const assertedQueue = await channel.assertQueue('', { exclusive: true })
    channel.sendToQueue(queueName, Buffer.from(arg[0]), {
        replyTo: assertedQueue.queue,
        correlationId: uuid
    })
    channel.consume(assertedQueue.queue, msg => {
        if (msg.properties.correlationId == uuid) {
            console.log("processed: ", msg.content.toString());
            channel.ack(msg)
            setTimeout(() => {
                process.exit(0)
            },1000)
        }
    })
}
sendTaskToProcess()