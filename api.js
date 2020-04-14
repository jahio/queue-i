const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const wsApp = express()
const port = 3000

// Set up the websocket server
const wsServer = http.createServer(wsApp)
const wss = new WebSocket.Server({ server: wsServer })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('WS: Received Message -- %s', message)
    ws.send(`Hello, you sent -> ${message}`)
  })
  ws.send('Connected to WebSocket Server')
})

wsServer.listen(process.env.WS_PORT || 8999, () => {
  console.log(`Server started on port ${wsServer.address().port}`)
})

// Get Express to parse request bodies
app.use(express.json())

// Set access control headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

var queue = [
  {
    "countrycode": "1",
    "phone": "5558675309",
    "enteredAt": 1586373000
  },
  {
    "countrycode": "353",
    "phone": "555555555",
    "enteredAt": 1586374000
  }
]

app.get('/queue', (req, res) => {
  res.send(queue)
})

app.delete('/queue/:countrycode/:phone', (req, res) => {
  // Remove the given number/countrycode combination from
  // the queue and send out the new state of the queue.
  for(var i = 0; i < queue.length; i++) {
    if (queue[i].countrycode == req.params.countrycode && queue[i].phone == req.params.phone) {
      queue.splice(i, 1)
    }
  }

  // Tell websocket clients about the new state of queue
  wss.clients.forEach(client => {
    client.send(JSON.stringify(queue))
  })

  res.send(queue)
})

app.post('/queue', (req, res) => {
  var newEntry = {
    "countrycode": req.body.countrycode,
    "phone": req.body.phone,
    "enteredAt": Math.round(new Date().getTime() / 1000)
  }

  queue.push(newEntry)

  // Tell websocket clients about the new state of queue
  wss.clients.forEach(client => {
    client.send(JSON.stringify(queue))
  })

  res.send(newEntry)
})

app.get('/', (req, res) => res.send('API is under /queue'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
