const express = require('../');
const app = express();

app.get('/', function (req, res) {
    res.send('hello world');
});
app.get('/test', function (req, res) {
    res.send('this is test');
});

app.listen(3006, function () {
    console.log('Example app listening on port 3006!');
});