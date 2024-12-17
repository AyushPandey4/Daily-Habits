const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./dbConnection");
const userRoute = require("./routes/user");
const notesRoute = require("./routes/notes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONT_END_URL, // frontend url
    credentials: true, // Enable credentials (cookies)
  })
);

app.use(express.json()); // because of post request

connection(); // connection to db

app.get("/", (req, res) => {
  res.send("backend");
});

// connecting to routes
app.use("/api/user", userRoute);
app.use("/api/notes", notesRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
