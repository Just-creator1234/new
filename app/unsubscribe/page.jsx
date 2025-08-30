// app/unsubscribe/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async () => {
    if (!email) {
      setMessage("No email provided for unsubscribe");
      return;
    }

    setStatus("loading");
    
    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("You have been unsubscribed successfully.");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to unsubscribe");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred while unsubscribing");
    }
  };

  useEffect(() => {
    if (email) {
      handleUnsubscribe();
    }
  }, [email]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {status === "success" ? "Unsubscribed" : "Unsubscribe"}
        </h1>
        
        {status === "loading" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing unsubscribe request...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              You will no longer receive newsletter emails from us.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={handleUnsubscribe}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!email && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              No email address provided for unsubscribe.
            </p>
            <p className="text-sm text-gray-500">
              Please use the unsubscribe link from your email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}