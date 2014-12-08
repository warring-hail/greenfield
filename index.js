var app = require('./server/server');
var port = process.env.port || 8000;

app.listen(port);

console.log('listening on port', port);
