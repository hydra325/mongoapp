var express = require("express");
var bp = require("body-parser");
const mongoose = require("mongoose");
const empcrud = require("./model.js");
const cors = require("cors");
// mongoose.connect("mongodb://127.0.0.1:27017/MERNDB");

var app = express();
app.use(bp.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to MongoDB App");
});

app.post("/adduser", (req, res) => {
  const users = new empcrud({
    ...req.body,
  });
  users.save().then(() => res.send("user added..."));
});

app.get("/loadusers", async (req, res) => {
  const users = await empcrud.find({});
  return res.status(200).send(users);
});

app.get("/loadusers/:id", async (req, res) => {
  const uid = parseInt(req.params.id);
  const users = await empcrud.findById(uid);
  return res.status(200).json(users);
});

app.delete("/deleteuser/:id", async (req, res) => {
  // const uid = parseInt(req.params.id);
  const uid = req.params.id;
  await empcrud.findById(uid).deleteOne();
  return res.status(200).send("User Deleted...");
});

app.put("/updateuser/:id", async (req, res) => {
  const uid = parseInt(req.params.id);
  await empcrud.updateOne({ uid }, req.body);

  const updateuser = await empcrud.findById(uid);
  return res.status(200).json(updateuser);
});

const startServer = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:admin123@mern-cluster.4l4zlqx.mongodb.net/merndb?retryWrites=true&w=majority"
  );
  app.listen(4000, () => {
    console.log("Server is ready...");
  });
};

startServer();
