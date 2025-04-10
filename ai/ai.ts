import OpenAI from "openai";
import { MessagesModel } from "../models/messages";
import { ChatCompletionMessageParam } from "openai/resources/chat";
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMessage(text: string, usersId: object) {
  const messagesFromDb = await MessagesModel.find({ usersId }).sort({
    createdAt: 1,
  });

  const history: ChatCompletionMessageParam[] = messagesFromDb.map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content || "",
  }));
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Sei Orian, un assistente AI progettato da Matteo Beu per assiterlo su Whatsapp. 
Cerca di rispondere sempre tu ma se il messaggio è troppo lungo, urgente, personale, oppure richiede la presenza di Matteo: NON rispondere al contenuto, ma scrivi questo messaggio:
09022000mb`,
      },
      ...history,
      {
        role: "user",
        content: text,
      },
    ],
  });
  const content = completion.choices[0].message.content ?? "";
  console.log(content);
  const isEscalation = content.includes("09022000mb");
  const cleanedText = content.replace(
    "09022000mb",
    "Grazie per il messaggio. Matteo ti risponderà appena possibile."
  );
  await MessagesModel.create({
    usersId: usersId,
    role: "assistant",
    content: cleanedText,
  });
  return {
    text: cleanedText,
    needsHuman: isEscalation,
  };
}
