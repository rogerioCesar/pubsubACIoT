const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const typeDefs = require('./graphQL/schema/index');
const resolvers = require('./graphQL/resolver/index');
const { GraphQLServer } = require('graphql-yoga');
const policyModels = require('./model/policy');
const contextModel = require('./model/contextModel');


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
client.on('message', function (topic, payload) {
    var time;
    
    try {
      var msg = JSON.parse(JSON.stringify(payload.toString())); 
      var timeArduino = msg.split(':')[4];
      time = timeArduino.slice(0,  - 1);
      var getPointsAllowed = [];
      var getAllPointsAllowed = [];
      const getPolicies =  policyModels.find();
      console.log("Get",getPolicies)         
      /* find points that satisfy the policies*/
      
      
    } catch (err) {
      // 👇️ This runs
      console.log('Error: ', err.message);
    }
    var timestamp = new Date().getTime()/1000;
    console.log('timestamp: ',Math.round(timestamp))
    console.log('time: ',time)
    var latency = Math.round(timestamp) - time;
    console.log("latencia", latency)
    var lat = new Date()
    //console.log('Received Message:', topic, packet.payload)
    //console.log(JSON.parse(JSON.stringify(packet.payload.toString()))); 

    //const obj = JSON.parse(JSON.stringify(packet.payload.toString()))
    //console.log(obj[0])
    //var latency = timestamp - Date.parse(obj.timestamp);
    //console.log("latency: ", o.time);
   

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

