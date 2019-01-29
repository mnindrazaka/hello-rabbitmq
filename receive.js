const amqp = require("amqplib/callback_api")

amqp.connect(
  "amqp://localhost",
  function(err, conn) {
    conn.createChannel(function(err, ch) {
      const q = "hello"
      ch.assertQueue(q, { durable: false })

      console.log("[*] Waiting for messages")
      ch.consume(
        q,
        function(msg) {
          console.log("[x] Received : " + msg.content.toString())
        },
        { noAck: true }
      )
    })
  }
)
