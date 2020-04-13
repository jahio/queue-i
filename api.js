const express = require('express')
const app = express()
const port = 3000

// Get Express to parse request bodies
app.use(express.json())

// Set access control headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
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

app.post('/queue', (req, res) => {
  var newEntry = {
    "countrycode": req.body.countrycode,
    "phone": req.body.phone,
    "enteredAt": Math.round(new Date().getTime() / 1000)
  }

  queue.push(newEntry)

  res.send(newEntry)
})

app.get('/', (req, res) => res.send('API is under /queue'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
