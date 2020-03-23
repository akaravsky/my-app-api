const express = require('express')
const cors = require('cors')
const expressGraphQL = require('express-graphql');
const schema = require('./src/schema/schema')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:8080'
  }));

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.get('/', (req:any, res:any) => res.send('Hello World!'));

app.get('/about/ab', (req:any, res:any) => res.json({text: 'This is about!'}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
