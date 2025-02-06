const express = require('express')
const httpProxy = require('http-proxy')

const app = express();
const PORT = 8000;

const BasePath = 'https://launchpadbuildstorage.blob.core.windows.net/launchpadbuilds/_output/';

const proxy = httpProxy.createProxy()

app.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];
    const resolveTo = `${BasePath}/${subdomain}`
    console.log("proxcy started");
    proxy.web(req, res, {target: resolveTo, changeOrigin: true})
});

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if(url === '/'){
        proxyReq.path += 'index.html';
    }
});

app.listen(PORT, () => console.log("http://localhost:8000/"));