const express = require('express')
const dist = 'dist'
const app = express()
app.get('/', (req, res) => {
  res.sendfile(`${__dirname}/${dist}/index.html`)
})

app.use(express.static(dist))
app.listen('1234', () => {
  console.log(`server is running at port 1234`)
})
