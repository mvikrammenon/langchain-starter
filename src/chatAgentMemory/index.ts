import { ChatOpenAI } from "langchain/chat_models";
import { BufferMemory } from "langchain/memory";
import { initializeAgentExecutor } from "langchain/agents";

/**
 * 
 * Creates a LangChain agent with OpenAI chat model, tools and assign some memory.
 * 
 * @param tools - Array of API tools or calculators etc.
 * @returns executor
 */
const createChatAgent = async (tools: any[]) => {
    process.env.LANGCHAIN_HANDLER = "langchain";
    const model = new ChatOpenAI({ temperature: 0 });
    
    const executor = await initializeAgentExecutor(
      tools,
      model,
      "chat-conversational-react-description",
      true
    );
    executor.memory = new BufferMemory({
      returnMessages: true,
      memoryKey: "chat_history",
      inputKey: "input",
    });
    console.log("Loaded LangChain.");
    return executor;
};

export default createChatAgent;