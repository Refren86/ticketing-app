import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { app } from "../app";

let mongo: MongoMemoryServer;

// runs once before all tests
beforeAll(async () => {
  process.env.JWT_KEY = "asdqwe";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// runs before each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections(); // get all collections from mock db

  // reset all data inside mock db
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// runs once after all tests
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
