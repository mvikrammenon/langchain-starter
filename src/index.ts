import * as dotenv from "dotenv";
import { UserAddressAPI, UserOrderCountAPI } from "./tools/apiTools.js";
import ChatAgentMemory from "./chatAgentMemory/index.js";
import ConsoleInterface from "./consoleInterface/index.js";


dotenv.config();

const run = async () => {
  const tools = [new UserAddressAPI(), new UserOrderCountAPI()];
  const executor = await ChatAgentMemory(tools);
  ConsoleInterface(executor);
};

run();