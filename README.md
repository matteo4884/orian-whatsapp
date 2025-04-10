# 🤖 ORIAN — Your WhatsApp AI Assistant

Orian is a custom-built virtual assistant designed by **Matteo Beu** to help manage and respond to WhatsApp messages autonomously and intelligently.

Powered by [Baileys](https://github.com/WhiskeySockets/Baileys) and [OpenAI](https://platform.openai.com/), Orian leverages the power of GPT-based language models to deliver context-aware replies, escalate urgent queries, and lighten your daily communication load.

---

## 📌 Features

- **AI-Powered Replies**  
  Generates human-like responses using OpenAI's GPT.
- **Automatic Escalation**  
  When messages are too long or personal, Orian alerts user to take over.
- **Custom Commands**
  - `/start` to activate the assistant
  - `/stop` to disable automatic responses
- **Seamless WhatsApp Connection**  
  Scans a QR code once to stay logged in, thanks to Baileys.

---

## 🚀 Tech Stack

| Technology     | Description                                  |
| -------------- | -------------------------------------------- |
| **TypeScript** | Adds strong typing and better tooling for JS |
| **Baileys**    | WebSocket connection to WhatsApp Web         |
| **OpenAI**     | GPT-based responses for AI conversations     |
| **MongoDB**    | Stores message history & user profiles       |

---

## 🛠️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/matteo4884/orian-whatsapp.git
   cd orian-whatsapp
   ```
2. **Install dependencies**:
   ```bash
   yarn install
   ```
3. **Create a `.env` file**:
   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   MONGO_URL=your_mongodb_uri
   ```
4. **Run the Bot**:
   ```bash
   yarn start
   ```

---

## 🔐 Authentication & Session

- **Baileys** handles WhatsApp session data in the `auth_info_baileys/` folder.
- The folder is added to `.gitignore` to keep credentials private and secure.
- Once you start the bot, you'll see a **QR code** in your terminal. **Scan it** using WhatsApp on your phone to log in.

---

## 💬 How It Works

1. On startup, Orian prints a QR code in the console.
2. **Scan** it using your phone's WhatsApp to link the session.
3. Orian will now automatically reply to messages.
4. If a message is personal or urgent, Orian sends a default text and stops replying until you re-activate it.

---

## ⚠️ Disclaimer

- This project is **unofficial** and **not affiliated** with WhatsApp or Meta.
- It may violate WhatsApp’s Terms of Service to use a reverse-engineered connection.
- Use **at your own risk** for personal and educational purposes.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-new-feature`)
3. Commit your changes (`git commit -m 'Add some awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-new-feature`)
5. Create a new Pull Request

---

## 🏅 License

This project is **free to use** for educational and personal projects. If you distribute a modified version, please make it clear that you’ve done so.

---

## 🙌 Acknowledgments

- [@whiskeysockets](https://github.com/WhiskeySockets) for Baileys
- [OpenAI](https://openai.com/) for GPT models

---

## 📬 Contact

Maintained with 💜 by **Matteo Beu**.  
Feel free to open issues or reach out on [GitHub](https://github.com/matteo4884).

---

By the way, this README was generated with GPT too. Bye guys!
