import {
  addAndGetUser,
  deactivateBot,
  activateBot,
} from "../services/usersService";
import { generateMessage } from "../ai/ai";
import { addUserMessageToDB } from "../services/messagesService";
import { updateSystemDynamic } from "../services/agentService";
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
    if (!user.mode) {
      await activateBot(sender!, user._id);
      await sock.sendMessage(sender!, {
        text: `🤖 \`\`\`ᴼᴿᴵᴬᴺ\`\`\` 🤖
\`Orian operativo!\`

🟢 ᴀᴛᴛɪᴠᴏ
> _\`\`\`Commands: /start /stop \`\`\`_`,
      });
    } else {
      await sock.sendMessage(sender!, {
        text: `🤖 \`\`\`ᴼᴿᴵᴬᴺ\`\`\` 🤖
\`Giá attivo! 🤦‍♂️\`

🟢 ᴀᴛᴛɪᴠᴏ
> _\`\`\`Commands: /start /stop \`\`\`_`,
      });
    }
  } else if (message.message?.conversation === "/stop") {
    await deactivateBot(sender!, user._id);
    await sock.sendMessage(sender!, {
      text: `🤖 \`\`\`ᴼᴿᴵᴬᴺ\`\`\` 🤖
\`Orian spento!\`

🔴 sᴘᴇɴᴛᴏ
> _\`\`\`Commands: /start /stop \`\`\`_`,
    });
  } else if (
    message.message?.conversation?.includes("/edit ") &&
    message.key.fromMe
  ) {
    let dynamic = message.message?.conversation.replace("/edit ", "");
    await updateSystemDynamic(dynamic);
    await sock.sendMessage(sender!, {
      text: `🤖 \`\`\`ᴼᴿᴵᴬᴺ\`\`\` 🤖 
\`Orian aggiornato!\`

${user.mode ? "🟢 ᴀᴛᴛɪᴠᴏ" : "🔴 sᴘᴇɴᴛᴏ"}
> _\`\`\`Commands: /start /stop \`\`\`_`,
    });
  } else if (!message.key.fromMe && user?.mode) {
    const result = await generateMessage(senderMessage!, user._id);
    await addUserMessageToDB(user._id, senderMessage!);
    // if (sender === "393317037949@s.whatsapp.net") {
    await sock.sendMessage(sender!, {
      text: `🤖 \`\`\`ᴼᴿᴵᴬᴺ\`\`\` 🤖
\`${result.text}\`
 
${user.mode && !result.needsHuman ? "🟢 ᴀᴛᴛɪᴠᴏ" : "🔴 sᴘᴇɴᴛᴏ"}
> _\`\`\`Commands: /start /stop \`\`\`_`,
    });
    if (result.needsHuman) await deactivateBot(sender!, user._id);

    // }
  }
}
