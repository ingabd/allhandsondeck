const { MongoClient } = require('mongodb')

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
let db

const connect = () => {
  return client.connect()
    .then(() => {
      db = client.db('allhandsondeck')
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

const getDb = () => {
  return db
}

module.exports = {
  connect,
  getDb
}