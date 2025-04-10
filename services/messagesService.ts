import { MessagesModel } from "../models/messages";

export const addUserMessageToDB = async (usersId: object, text: string) => {
  return MessagesModel.create({
    usersId: usersId,
    role: "user",
    content: text,
  });
};
