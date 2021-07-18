require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const cors = require("cors");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learn-it.5sbjt.mongodb.net/learn-it?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(err.message);
    process.exit(1);
  }
};

connectDB();
const app = express();
app.use(express.json()); // để server có thể đọc được data từ request có header là application/json
app.use(cors());

// using router
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

// start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
