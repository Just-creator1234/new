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
      setMessage("Thanks! You're subscribed.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(res.error || "Something went wrong.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setMessage("");
  };

  // Success state UI
  if (status === "success") {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl text-white overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold mb-2">You're Subscribed!</h3>
          <p className="text-blue-100 mb-4 leading-relaxed">
            Thank you for subscribing to our newsletter. We've sent a
            verification email to your inbox.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
            <p className="font-medium text-yellow-200 mb-2">
              Please verify your email
            </p>
            <p className="text-sm text-blue-100">
              Check your inbox for a verification email to confirm your
              subscription and start receiving our updates.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 text-left">
            <p className="font-medium mb-2">What to expect:</p>
            <ul className="text-sm text-blue-100 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Weekly tech news roundups</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Exclusive industry insights</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Early access to our reports</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleReset}
            className="mt-2 bg-white text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Subscribe Another Email
          </button>
        </div>
      </div>
    );
  }

  // Regular form UI
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

          <div className="text-xs text-blue-100 text-center border-t border-white/20 pt-3 mt-3">
            After subscribing, please check your inbox for a verification email
            to confirm your subscription.
          </div>
        </form>
      </div>
    </div>
  );
}
