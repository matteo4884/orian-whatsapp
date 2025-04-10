import {
  addAndGetUser,
  deactivateBot,
  activateBot,
} from "../services/usersService";
import { generateMessage } from "../ai/ai";
import { addUserMessageToDB } from "../services/messagesService";
import { WASocket, proto } from "baileys";

export async function handleChat(
  sock: WASocket,
  message: proto.IWebMessageInfo
) {
  // data
  let sender = message.key.remoteJid;
  let senderMessage = message.message?.conversation;

  console.log(senderMessage);

  const user = await addAndGetUser(sender!);
  console.log(message);
  if (message.message?.conversation === "/start") {
    await sock.sendMessage(sender!, {
      text: `🤖 \`\`\`ᴼᴿᴵᴬᴺ\`\`\` 🤖
\`Orian operativo!\`

> _\`\`\`Commands: /start /stop \`\`\`_`,
    });
    await activateBot(sender!);
  } else if (message.message?.conversation === "/stop") {
    await sock.sendMessage(sender!, {
      text: `🤖 \`\`\`ᴼᴿᴵᴬᴺ\`\`\` 🤖
\`Orian spento!\`

> _\`\`\`Commands: /start /stop \`\`\`_`,
    });
    await deactivateBot(sender!, user._id);
  } else if (!message.key.fromMe && user?.mode) {
    const result = await generateMessage(senderMessage!, user._id);
    await addUserMessageToDB(user._id, senderMessage!);
    // if (sender === "393317037949@s.whatsapp.net") {
    await sock.sendMessage(sender!, {
      text: `🤖 \`\`\`ᴼᴿᴵᴬᴺ\`\`\` 🤖
\`${result.text}\`

> _\`\`\`Commands: /start /stop \`\`\`_`,
    });
    if (result.needsHuman) await deactivateBot(sender!, user._id);

    // }
  }
}
