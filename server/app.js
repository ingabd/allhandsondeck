if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const { connect } = require('./config/mongoConnection')
const { createServer } = require("http")
const { Server } = require("socket.io")
// const router = require('./routes')
// const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`
  Welcome to allhandsondeck ..
  Online collaborative tool for you to reduce frictions in working remotely.
  This tool consist of interactive whiteboard, VoIP, and transcriber.
  `)
})

// app.use(router)
// app.use(errorHandler)

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true
})

io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on('chat', (data) => {
    socket.broadcast.emit('chat', data)
  })
  // socket.on('draw', function (data) {
  //   socket.broadcast.emit('draw', data)
  // })
  // socket.on('mouseDown', function () {
  //   socket.broadcast.emit('mouseDown')
  // })
  // socket.on('reset', function () {
  //   socket.broadcast.emit('reset')
  // })
})

connect()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log('Allhandsondeck runninng on port:', PORT)
    })
  })
  .catch(err => {
  console.log(err)
  })

