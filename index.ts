import makeWASocket, { DisconnectReason, useMultiFileAuthState } from "baileys";
import { Boom } from "@hapi/boom";
import { connectDB } from "./db/connect";
import { handleChat } from "./lib/chat";

require("dotenv").config();

async function connectToWhatsApp() {
  await connectDB();
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    markOnlineOnConnect: false,
  });
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut;
      console.log(
        "connection closed due to ",
        lastDisconnect?.error,
        ", reconnecting ",
        shouldReconnect
      );
      // reconnect if not logged out
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === "open") {
      console.log("opened connection");
    }
  });
  // ✅ Listener globale, sempre attivo
  sock.ev.on("messages.upsert", async ({ type, messages }) => {
    if (type === "notify") {
      for (const message of messages) {
        // Interrupts if broadcast or group
        if (
          message.key.remoteJid === "status@broadcast" ||
          message.key.remoteJid?.includes("@g.us")
        )
          return;
        // Interrupts if broadcast or group

        await handleChat(sock, message);
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

connectToWhatsApp();
