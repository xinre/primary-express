const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3003;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World\n')
// });

// server.listen(port, () => {
//     console.log(`Server running at http://:${port}/`);
// });

let router = [{
    path: '*',
    method: '*',
    handle: function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('404')
    }
}];

function createApplication() {
    return {
        get: function (path, fn) {
            router.push({
                path: path,
                method: 'GET',
                handle: fn
            });
        },
        listen: function (port, cb) {
            let server = http.createServer(function (req, res) {
                if (!res.send) {
                    res.send = function (body) {
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        });
                        res.end(body);
                    };
                }
                for (var i = 1, len = router.length; i < len; i++) {
                    if ((req.url === router[i].path) &&
                        (req.method === router[i].method)) {
                        router[i].handle && router[i].handle(req, res);
                    }
                }
                router[0].handle && router[0].handle(req, res);
            });
            server.listen.apply(server, arguments);
        }
    }
}

module.exports = createApplication;