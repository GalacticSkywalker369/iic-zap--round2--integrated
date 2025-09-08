// Vercel Serverless Function: /api/gemini
// Uses official Google Generative AI SDK (gemini-pro) and GEMINI_API_KEY

import { GoogleGenerativeAI } from "@google/generative-ai";

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

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

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

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(`${systemPreamble}\n\nQuestion: ${userQuery}`);
    const response = await result.response;
    const text = (response?.text?.() || "").trim();
    const answer = text || "I couldn't generate a response.";

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ answer }));
  } catch (e) {
    console.error("/api/gemini error:", e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Server error", details: String(e?.message || e) }));
  }
}


