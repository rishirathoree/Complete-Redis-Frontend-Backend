const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'pawlies',
  brokers: ['192.168.1.43:9092'],
})


module.exports = {
    kafka,
}