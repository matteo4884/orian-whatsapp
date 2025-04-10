import OpenAI from "openai";
import { MessagesModel } from "../models/messages";
import { ChatCompletionMessageParam } from "openai/resources/chat";
import { ESCALATION_CODE } from "../constants";
import { ROLE_SYSTEM } from "../roleSystem";
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMessage(text: string, usersId: object) {
  const roleSystem = await ROLE_SYSTEM();

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
        content: `
${roleSystem.defaultContent}

Note di Matteo Beu per il suo assistente Orian:
${roleSystem.dynamicContent}
        `,
      },
      ...history,
      {
        role: "user",
        content: text,
      },
    ],
  });
  const content = completion.choices[0].message.content ?? "";
  const isEscalation = content.includes(ESCALATION_CODE);
  const cleanedText = content.replace(
    ESCALATION_CODE,
    history.length > 1
      ? "Ottimo, vado a dormire. Matteo ti risponderà appena avrà voglia."
      : "Matteo ti risponderà appena smette di fingere di essere occupato."
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
