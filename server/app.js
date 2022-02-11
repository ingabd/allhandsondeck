if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const { connect } = require('./config/mongoConnection')
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

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App berjalan di ${PORT}`)
    })
  })
  .catch(err => {
  console.log(err)
  })

