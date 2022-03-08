const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//Routers
const userRoutes = require("./apis/users/userRoutes");
app.use("/api/users", userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
