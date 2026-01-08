import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://mehank7214_db_user:mehank@cluster0.rg0hjsx.mongodb.net/?appName=Cluster0";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('[MongoDB] Connection established');
      return mongoose;
    }).catch((err) => {
      console.error('[MongoDB] Connection failed:', err.message);
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    const errorMessage = e instanceof Error ? e.message : 'Unknown connection error';
    console.error('[MongoDB] Connection error:', errorMessage);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
