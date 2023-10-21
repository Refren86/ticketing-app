import mongoose from "mongoose";

import { app } from "./app";

const startApp = async () => {
  // checking all private keys
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to database");
  } catch (error) {
    console.log("Db connection error:", error);
  }

  app.listen(3000, () => {
    console.log("Auth service stared and is listening on port 3000!");
  });
};

startApp();
