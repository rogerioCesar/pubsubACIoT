const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const typeDefs = require('./graphQL/schema/index');
const resolvers = require('./graphQL/resolver/index');
const { GraphQLServer } = require('graphql-yoga');

const dataPointModels = require('./model/dataPoint');


const app = express();
const mqtt = require('mqtt')
const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
})

const topic = '/nodejs/mqtt'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
})


//Receber mensagem
client.on('message', (topic, payload) => {
  
    var timestamp = new Date().getTime();
    console.log(timestamp);
    console.log('Received Message:', topic, payload.toString())

    


  })

client.on('connect', () => {
    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var database = "mongodb+srv://root:root@cluster0.s2vfq.mongodb.net/aciot?retryWrites=true&w=majority"

mongoose.connect(database)
    .then(() => {
        console.log('Connection to DB successful');
    })
    .catch(err => {
        console.log('Db connection error====', err);
    });

const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => {
    console.log('GraphQL Listening on port 4000');
});

