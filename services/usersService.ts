import { MessagesModel } from "../models/messages";
import { UsersModel } from "../models/users";

export const addAndGetUser = async (sender: string) => {
  let user = await UsersModel.findOne({ sender: sender });
  if (!user) {
    user = await UsersModel.create({ sender });
  }
  return user;
};

export const deactivateBot = async (sender: string, usersId: object) => {
  await MessagesModel.deleteMany({ usersId });
  return UsersModel.findOneAndUpdate({ sender: sender }, { mode: false });
};

export const activateBot = async (sender: string, usersId: object) => {
  await MessagesModel.deleteMany({ usersId });
  return UsersModel.findOneAndUpdate({ sender: sender }, { mode: true });
};
