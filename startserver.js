import { app } from "./server.js";
const mongoose = require("mongoose");


async function startServer() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MERNDB");
  app.listen(4000, () => {
    console.log("Server is ready...");
  });
}

module.exports.startServer = startServer;
