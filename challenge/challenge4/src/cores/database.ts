import { Db } from "mongodb";
import mongoose from "mongoose";
import configs from "../configs";

export async function start() {
  const db = mongoose.connection;
  db.on("connecting", () => {
    console.info("connecting to MongoDB...");
  });
  db.on("error", (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
  });
  db.on("connected", () => {
    console.info("MongoDB connected!");
  });
  db.once("open", () => {
    console.info("MongoDB connection opened!");
  });
  db.on("reconnected", () => {
    console.info("MongoDB reconnected!");
  });
  db.on("disconnected", () => {
    console.warn("MongoDB disconnected!");
  });

  await mongoose.connect(configs.dbUri);
}
export async function stop() {
  await mongoose.connection.close();
}

export function getIns(): Db {
  return mongoose.connection.db;
}
