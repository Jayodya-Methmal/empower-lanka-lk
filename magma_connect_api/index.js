import express from "express";
const app = express();
import http from "http";
const port = process.env.PORT || 8800;
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import adminRoutes from "./routes/admins.js";
import bodyparser from "body-parser";
import stripe from "stripe";
import { Server } from "socket.io";

const stripeInstance = stripe(
  "sk_test_51MjHDhIEmwpzpx2CGoiDIpUEfhrkpP1nVmhlCymV7sABjegHCxctfP1RTyKARhlGaCvDSrACzTYy4QYYttDjobxN00eUIe3RY4"
);

import { v4 as uuidv4 } from "uuid";
const myUuid = uuidv4();

import cors from "cors";
import cookieParser from "cookie-parser";

//middleware routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected to socket", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user joined room", socket.id, data);
  });

  socket.on("send_message", (data) => {
    console.log("message sent", data);
    socket.to(data.room).emit("receive_message", data);
  });


  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
});

app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/admins", adminRoutes);

server.listen(port, () => {
  console.log("API listening on");
});
