const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// express のコード、 `/` に来たら、index.html を返す
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// socket.io のコード、 `chat` メッセージを受信したらクライアント全体に対してブロードキャストする
io.on('connection', (socket) => {
  socket.on('chat', (msg) => {
    io.emit('chat', msg);
  });
});

server.on('listening', () => {
  console.log('listening on 9000');
});

server.listen(9000);
