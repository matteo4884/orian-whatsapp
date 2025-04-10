import { AgentModel } from "../models/agent";

export const getSystemDynamic = async () => {
  const system = await AgentModel.findOne({ role: "system" });
  return system?.dynamic;
};

export const updateSystemDynamic = async (text: string) => {
  return AgentModel.findOneAndUpdate(
    { role: "system" },
    { dynamic: text },
    { upsert: true }
  );
};
