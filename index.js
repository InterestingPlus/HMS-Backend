const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const mongoose = require("mongoose");

const {
  getDoctor,
  getAllDoctors,
  addDoctor,
  loginDoctor,
  getAuthenticatedDoctor,
} = require("./controllers/doctor.controller.js");

const app = express();
app.use(cors());
// app.use(cors({
//   origin: "http://127.0.0.1:5500"
// }));

app.use(express.json());

const db_uri = process.env.DATABASE_URI;

const PORT = process.env.PORT || 2000;

mongoose
  .connect(db_uri)
  .then(() => {
    console.log("Connected to MongoDB...!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB : ", error);
  });

app.get("/get-doctor", getAllDoctors);
app.post("/doctor", getDoctor);
app.post("/auth-doctor", getAuthenticatedDoctor);
app.post("/create-doctor", addDoctor);
app.post("/login-doctor", loginDoctor);

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
