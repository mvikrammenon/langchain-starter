import inquirer from "inquirer";
import chalk from "chalk";
import Rx from "rxjs";

/**
 * 
 * Uses inquirer package to create a console interface for the user to interact with the chatbot
 * Type "exit" or "Blank Enter" or "^c" to terminate the session
 * 
 * @param prompts - RxJS Subject that holds all the user inputs
 * @param executor - LangChain executor
 */
const consoleInterface = (executor: any) => {
    // Creates an RxJS Subject that holds all the user inputs from the terminal
    const prompts = new Rx.Subject();

    let userInputCommandCount = 0;

    // Helper to make a inquirer prompt of type input, default starting text, colors the text green
    function makePrompt(msg: string) {
        return {
            type: 'input',
            name: `userInput-${userInputCommandCount}`,
            message: chalk.yellow(`${msg || 'Say something to start chatting! Type exit or Empty Enter/ or ^c to terminate'}\n\n`),
            transformer: function (line: string) {
                return chalk.green(line)
            }
        };
    }

    // Listen to new user inputs within the prompt subject and call the executor
    inquirer.prompt(prompts).ui.process.subscribe(async ({ answer }) => {
        if (answer.toLowerCase() === 'exit') {
            prompts.complete();
        } else if (answer !== '') {
            userInputCommandCount++;
            const result = await executor.call({ input: answer });
            prompts.next(makePrompt(`Response: ${result.output}`));
        } else {
            prompts.complete();
        }
    }, (err: any) => {
        console.warn(err);
    }, () => {
        console.log(chalk.blue('Interactive session is complete. Good bye! 👋\n'));
    });
    
    prompts.next(makePrompt());
};

export default consoleInterface;