require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const knowledge = require("./knowledge");

const app = express();
app.use(cors({
    origin: [
        "https://katherin915.github.io",
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.options("*", cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Katherin AI backend is running!",
  });
});


// AI CHAT ROUTE
app.post("/api/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const response = await client.chat.completions.create({

            model: "openai/gpt-oss-20b",

            messages: [

                {
                    role: "system",

                    content: `
You are Katherin Pandey's personal portfolio AI assistant.

Use the following knowledge about Katherin to answer the
user's questions.

--------------------
KATHERIN'S KNOWLEDGE
--------------------

${knowledge}

--------------------
END OF KNOWLEDGE
--------------------

RULES:

1. Answer questions using only the information provided above.

2. Never invent or assume:
   - internships
   - work experience
   - projects
   - project contributions
   - technical skills
   - achievements
   - certifications
   - personal information

3. If the information is not available, clearly say that you
don't have that information.

4. For HR and interview questions, give concise, professional
and natural answers.

5. For project questions, explain the project using only the
information available in the knowledge base.

6. If asked "Tell me about yourself", give a concise professional
introduction based on Katherin's education, skills, projects,
achievements and DSA experience.

7. If the question is unrelated to Katherin, politely explain
that you are Katherin's personal portfolio assistant.

8. Never claim that Katherin has experience that is not explicitly
mentioned in the knowledge base.

9. When discussing a project, automatically provide the available
GitHub repository and/or live demo link from the knowledge base,
even if the user does not explicitly ask for the link.

10. When discussing a certification, automatically provide the
available certificate link from the knowledge base.

11. Never say that a GitHub repository, live demo, portfolio or
certificate link is unavailable when the corresponding URL is
explicitly present in the knowledge base.

12. Always format available links using Markdown:
[GitHub Repository](URL)
[Live Demo](URL)
[View Certificate](URL)

13. Never add internal disclaimers, notes, warnings, or explanations
about the knowledge base to the user's response.

14. If a feature is listed as implemented, describe it as implemented.

15. If a feature is listed under future enhancements, describe it
only as a potential future enhancement.

16. Do not contradict information explicitly stated in the knowledge
base.
`
                },

                {
                    role: "user",
                    content: userMessage
                }

            ]

        });

        const reply = response.choices[0].message.content;

        res.json({
            reply: reply
        });

    } catch (error) {

        console.error("AI ERROR:", error);

        res.status(500).json({
            error: "Something went wrong while contacting the AI."
        });

    }

});
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
