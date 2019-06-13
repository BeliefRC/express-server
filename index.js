const express = require('express')
const timeout = require('connect-timeout')
const proxy = require('http-proxy-middleware')
const dist = 'dist'
const app = express()

// 超时时间
const TIME_OUT = 30 * 1e3

// 设置超时 返回超时响应
app.use(timeout(TIME_OUT))

app.use((req, res, next) => {
  if (!req.timedout) next()
})

app.use(proxy(['/tenant/', '/notify/', '/frontend/', '/kb/', '/cmdb/'], {target: 'http://newprod.test.cn'}))
app.use(proxy('/api/v2', {target: 'http://newprod.test.cn/itsm'}))

app.use(express.static(dist))

app.get('/', (req, res) => {
  res.sendfile(`${__dirname}/${dist}/index.html`)
})
app.listen('1234', () => {
  console.log(`server is running at port 1234`)
})
