const amqp = require("amqplib/callback_api")

amqp.connect(
  "amqp://localhost",
  function(err, conn) {
    conn.createChannel(function(err, ch) {
      const q = "task_queue"
      const message = process.argv.slice(2).join(" ") || "Hello World!"

      ch.assertQueue(q, { durable: true })
      ch.sendToQueue(q, Buffer.from(message), { persistent: true })
      console.log("[X] Sent '%s'", message)
    })

    setTimeout(function() {
      conn.close()
      process.exit(0)
    }, 500)
  }
)
