// Vercel Serverless Function: /api/gemini
// Uses Gemini REST API to generate answers

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(data || "{}"));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "GEMINI_API_KEY is not configured" }));
    return;
  }

  try {
    const body = await readJsonBody(req);
    const userQuery = String(body.query || "").trim();
    if (!userQuery) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Missing 'query' in request body" }));
      return;
    }

    const systemPreamble =
      "You are an agricultural assistant helping Indian farmers with actionable, concise answers. Avoid hallucinations; say you don't know when unsure. Provide steps, numbers, and safety tips where relevant.";

    const resp = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: `${systemPreamble}\n\nQuestion: ${userQuery}` }] },
        ],
        generationConfig: {
          temperature: 0.4,
          topP: 0.95,
          maxOutputTokens: 512,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ],
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      res.statusCode = 502;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Upstream error", details: text }));
      return;
    }

    const data = await resp.json();
    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";

    // Basic CORS for local dev
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ answer }));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Server error", details: String(e) }));
  }
};


