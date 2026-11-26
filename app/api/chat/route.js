import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, fallbackAnswer } from "@/lib/assistant";

// AI Chat Assistant. The API key stays on the server (never sent to the browser).
// If ANTHROPIC_API_KEY is not set, a simple built-in FAQ answerer is used instead.
const DEFAULT_MODEL = "claude-haiku-5-5";

export async function POST(request) {
  let messages = [];
  try {
    const body = await request.json();
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Keep only the last 12 valid turns, trimmed.
  messages = messages
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  while (messages.length && messages[0].role !== "user") messages.shift();

  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) return NextResponse.json({ error: "Please type a question." }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: fallbackAnswer(last.content), mode: "basic" });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || DEFAULT_MODEL,
      max_tokens: 600,
      system: buildSystemPrompt(),
      messages,
    });
    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return NextResponse.json({ reply: reply || fallbackAnswer(last.content), mode: "ai" });
  } catch (err) {
    console.error("[chat error]", err?.status || "", err?.message || err);
    // Keep the site working even if the AI call fails.
    return NextResponse.json({ reply: fallbackAnswer(last.content), mode: "basic" });
  }
}
