const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//importing routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");
const bookRouter = require("./routes/bookmark");
const messageRouter = require("./routes/messages");
const chatRouter = require("./routes/chat");

dotenv.config();
//process.env.VARIABLE

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/", authRouter);
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/bookmarks", bookRouter);
app.use("/api/messages", messageRouter);
app.use("/api/chats", chatRouter);

const server = app.listen(process.env.PORT || 5002, () =>
  console.log(`Connection Established at Port = ${process.env.PORT}!`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    //localhost
    origin: 'http://192.168.1.3:5002/'
    //hosted server
    // origin: "https://jobhubrest-production-7c08.up.railway.app/",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket");

  socket.on("setup", (userId) => {
    socket.join(userId);
    socket.broadcast.emit("online-user", userId);
    console.log(userId);
  });

  socket.on("typing", (room) => {
    console.log("typing");
    console.log("room");
    socket.to(room).emit("typing", room);
  });

  socket.on("stop typing", (room) => {
    console.log("stop typing");
    console.log("room");
    socket.to(room).emit("stop typing", room);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user Joined : " + room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    var room = chat._id;

    var sender = newMessageReceived.sender;
    if (!sender || sender._id) {
      console.log("Sender not defined");
      return;
    }

    var senderId = sender._id;
    console.log(senderId + "Message sender");
    const users = chat.users;

    if (!users) {
      console.log("users not defined");
      return;
    }
    socket.to(room).emit("message received", newMessageReceived);
    socket.to(room).emit("message sent", "New Message");
  });
  socket.off("setup", () => {
    console.log("user offline");
    socket.leave(userId);
  });
});
