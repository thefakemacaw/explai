import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

/*
 * Back-end, which calls the Gemini API to get some generated text
 *
 * TO-DO:
 *  - Pass in text input from browser
 *  - Print the text output on a browser window
 */

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function run() {
    // Load the Gemini Pro LLM
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create the chat, including empyt history and max output tokens
    const chat = model.startChat({
        history: [],
        generationconfig: {
            maxOutputTokens: 500,
        },
    })

    // Performs the chat functionality (in console)
    async function conversation() {
        rl.question("You: ", async (msg) => {
            if (msg.toLowerCase() === "exit") {
                rl.close();
            } else {
                const result = await chat.sendMessage(msg);
                const response = await result.response;
                const text = await response.text();
                console.log("Expl.AI says: ", text);
                conversation();
            }
        });
    }

    conversation();
}

run();