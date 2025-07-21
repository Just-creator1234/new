// components/NewsletterSignup.jsx
"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/app/actions/subscribeNewsletter";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | pending | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("pending");
    setMessage("");

    const res = await subscribeNewsletter(email);

    if (res.success) {
      setStatus("success");
      setMessage("Thanks! You’re subscribed.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(res.error || "Something went wrong.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl text-white overflow-hidden">
      <div className="p-8">
        <h3 className="text-xl font-bold mb-2">Stay Ahead</h3>
        <p className="text-blue-100 mb-6 leading-relaxed">
          Get the latest tech insights and breaking news delivered to your inbox
          every morning.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50"
            required
          />

          <button
            type="submit"
            disabled={status === "pending"}
            className="w-full bg-white text-blue-600 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-60"
          >
            {status === "pending" ? "Subscribing…" : "Subscribe Free"}
          </button>

          {message && (
            <p
              className={`text-xs text-center ${
                status === "success" ? "text-green-300" : "text-red-300"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-xs text-blue-100 text-center">
            Join 50,000+ readers • Unsubscribe anytime
          </p>
        </form>
      </div>
    </div>
  );
}