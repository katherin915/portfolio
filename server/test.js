require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

async function test() {

    try {

        const response = await client.responses.create({
            model: "openai/gpt-oss-20b",
            input: "Say exactly: Groq API connection is working."
        });

        console.log(response.output_text);

    } catch (error) {

        console.error(error);

    }
}

test();