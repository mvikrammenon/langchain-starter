import * as dotenv from "dotenv";
import { UserAddressAPI, UserOrderCountAPI } from "./tools/apiTools.js";
import ChatAgentMemory from "./chatAgentMemory/index.js";
import ConsoleInterface from "./consoleInterface/index.js";

dotenv.config();

const run = async () => {
  // Custom business data provider/abilities that base LLM does not posses like Calculator.
  const tools = [new UserAddressAPI(), new UserOrderCountAPI()];
  // Create a lanchain LLM orchestrator
  const langChainExecutor = await ChatAgentMemory(tools);
  // Passes messages to and fro from the console to langchain
  ConsoleInterface(langChainExecutor); 
};

run();