const serve = require('koa-static');
const Koa = require('koa');
const path = require('path');

/* Init Koa instance */
const app = new Koa();

/* Serve assets from folder */
app.use(serve(path.join(__dirname, '/public'), {
    setHeaders(res) {
        res.setHeader('cache-control', 'public, max-age=31536000');
    }
}));

app.listen(3000, () => console.log('Server started on port 3000'));