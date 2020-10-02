const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connect", (socket) => {
  console.log("user connected", socket.id);
  socket.on("chat-msg", function (data) {
    io.emit("chat-msg", data);
  });
});
server.listen(3001, function () {
  console.log("listening on port 3001");
});

// node src/server/index.js

// client connection
//Server emit events from client
//broadcast so all clients get data
//messages recieved 