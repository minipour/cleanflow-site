"use client";
import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "What services do you offer?",
  "How much is a deep clean for 1200 sq ft with 2 bedrooms?",
  "Do you bring your own supplies?",
  "What times can I book?",
  "What happens after I send a booking request?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm the CleanFlow assistant. Ask me about our services, prices, scheduling or how the process works." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || data.error || "Sorry, something went wrong." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I couldn't connect. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container chat-wrap">
        <h1>AI Assistant</h1>
        <p className="lead">Ask about services, scheduling, pricing and our work process.</p>
        <div className="card chat">
          <div className="chat-log">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.role}`}>{m.content}</div>
            ))}
            {loading && <div className="bubble assistant typing"><span /><span /><span /></div>}
            <div ref={endRef} />
          </div>
          {messages.length <= 1 && (
            <div className="chips suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" className="chip" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your question…"
              aria-label="Your question"
            />
            <button type="button" className="btn" onClick={() => send()} disabled={loading || !input.trim()}>Send</button>
          </div>
        </div>
        <p className="muted small">Prices from the assistant are estimates. Our team confirms the final price.</p>
      </div>
    </section>
  );
}
