import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  if (globalThis._mongoose && globalThis._mongoose.conn) {
    return globalThis._mongoose.conn;
  }

  if (!globalThis._mongoose) {
    globalThis._mongoose = { conn: null, promise: null } as any;
  }

  if (!globalThis._mongoose.promise) {
    globalThis._mongoose.promise = mongoose
      .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
      .then((m) => m);
  }

  try {
    globalThis._mongoose.conn = await globalThis._mongoose.promise;
    return globalThis._mongoose.conn;
  } catch (err) {
    globalThis._mongoose.promise = null;
    throw err;
  }
}