import mongoose, { MongooseError } from "mongoose"

interface ConnectionStatus {
  isConnected: number
  lastConnected?: Date
}

const connection: ConnectionStatus = { isConnected: 0 }

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Using existing connection")
    return { success: true, message: "Already connected" }
  }

  const conString = process.env.MONGO_URL ?? ""
  if (!conString) {
    console.error("MongoDB connection string is missing")
    return { success: false, message: "Connection string is missing" }
  }
  try {
    const db = await mongoose.connect(conString)
    connection.isConnected = db.connections[0].readyState
    connection.lastConnected = new Date()
    console.log("New MongoDB connection established")
    return { success: true, message: "Connected successfully" }
  } catch (error) {
    if (error instanceof MongooseError) {
      console.error("Mongoose Error:", error.message)
    } else {
      console.error("Unknown Error:", error)
    }
    return { success: false, message: "Failed to connect to MongoDB", error }
  }
}

export { dbConnect }
