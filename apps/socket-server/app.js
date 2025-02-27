import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 4000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("hello socket ");
});

io.on("connection", (socket) => {
  console.log("User connected");
  console.log("Id", socket.id);
  socket.emit("welcome", `welcome to the server, ${socket.id}`);
  socket.broadcast.emit("get started", `start chatting, ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  socket.on("message", (data) => {
    console.log(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
