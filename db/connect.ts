import mongoose from "mongoose";

export async function connectDB() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error("❌ MONGO_URL non è definito");
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connessione MongoDB riuscita!");
  } catch (error) {
    console.log("Errore durante connessione MongoDB: ", error);
  }
}
