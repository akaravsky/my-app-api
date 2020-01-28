const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:8080'
  }));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/about/ab', (req, res) => res.json({text: 'This is about!'}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
