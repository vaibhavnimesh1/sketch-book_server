const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

const isDev = app.settings.env === "development"
const url = isDev ? "http://localhost:3000" : "https://sketch-book-seven.vercel.app"
app.use(cors({ origin: url }));

const server = createServer(app);

const io = new Server(server, { cors: url });

io.on("connection", (socket) => {
  socket.emit("hello", "wewe");

  socket.on("drawPath", (arg) => {
    socket.broadcast.emit("drawPath", arg);
  });
  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });
  socket.on("changeConfig", (arg) => {
    console.log(arg);
    socket.broadcast.emit("changeConfig", arg);
  });
});

server.listen(5000, () => {
  console.log("server running at http://localhost:5000");
});
