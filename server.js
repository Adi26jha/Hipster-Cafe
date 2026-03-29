import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables from .env
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Check if API key is present
if (!process.env.GEMINI_API_KEY) {
  console.warn("\n⚠️ WARNING: GEMINI_API_KEY is missing from your .env file!");
  console.warn("   Make sure to add it before sending messages to Bean.\n");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'fake_key_for_init');

const SYSTEM_PROMPT = `
You are Bean, the quirky, chill virtual barista at 'Hipster Cafe'. You speak with a relaxed, modern aesthetic vibe. 
You use words like 'drip', 'vibe', 'artisan', 'roast'.
You know everything about coffee.
Keep responses impressively concise (1-2 short sentences maximum). 
Never break character. If someone asks something completely unrelated to coffee or the cafe, try to tie it back to the cafe vibe or coffee in a chill way.
`;

app.post('/api/bean-chat', async (req, res) => {
  try {
    const { history, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY missing");
      return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT 
    });

    const formattedHistory = [];
    if (history && Array.isArray(history)) {
      for (const item of history) {
        if (item.sender === 'user' || item.sender === 'bean') {
          if (item.id === "initial") continue; 
          formattedHistory.push({
            role: item.sender === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }]
          });
        }
      }
    }

    const chat = model.startChat({
      history: formattedHistory
    });

    console.log(`[Bean AI] Received: "${message}"`);
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();
    console.log(`[Bean AI] Responded: "${responseText}"`);

    return res.status(200).json({ response: responseText });

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return res.status(500).json({ error: 'Failed to communicate with AI', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Mock Netlify server running at http://localhost:${port}`);
  console.log(`☕ Bean AI endpoint ready at POST http://localhost:${port}/api/bean-chat`);
});
