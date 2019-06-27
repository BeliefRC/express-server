# express-server
使用express搭建的简单静态资源服务器

可以在本地快速创建一个服务器,此项目解决的问题有：
1.前端打包后生成的文件，可能会出现意料之外的bug（比如静态资源404等），我们可以先在本地创建一个服务，检查是否出现问题，避免文件部署到服务器才发现问题。
2.提供了代理功能，可以将请求直接代理到服务器，或者是你小伙伴的本机ip，来解决跨域问题，以及提供能了接口请求代理能力。

## 使用说明
`dist`变量代表着带包后的文件夹，通常是dist或者是build，将打包后的文件夹复制到此项目的根目录下，然后根据文件名做修改即可
```
const dist = 'dist'
```

默认处理的是spa，如果有多个html文件，增加对应的路由即可
```
app.get('/', (req, res) => {
  res.sendfile(`${__dirname}/${dist}/index.html`)
})
```
代理配置
使用了`http-proxy-middleware`，代理方式和webpack的proxy是一致的。
```
app.use(
  '/api',
  proxy({ target: 'http://www.example.org', changeOrigin: true })
);
```
