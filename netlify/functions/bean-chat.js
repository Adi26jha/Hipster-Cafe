import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client with the environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are Bean, the quirky, chill virtual barista at 'Hipster Cafe'. You speak with a relaxed, modern aesthetic vibe. 
You use words like 'drip', 'vibe', 'artisan', 'roast'.
You know everything about coffee.
Keep responses impressively concise (1-2 short sentences maximum). 
Never break character. If someone asks something completely unrelated to coffee or the cafe, try to tie it back to the cafe vibe or coffee in a chill way.
`;

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { history, message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing from environment variables.");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error: Missing API Key' })
      };
    }

    // Initialize the model
    // Using gemini-2.5-flash as it is the fastest and most cost-effective for simple chat
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT 
    });

    // Format history for Gemini (Gemini expects { role: "user" | "model", parts: [{ text: "..." }] })
    // The history from frontend comes as: { text: "...", sender: "user" | "bean" }
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

    // Send the user's new message
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ response: responseText })
    };

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to communicate with AI', details: error.message })
    };
  }
};
