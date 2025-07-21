// app/newsletter/verify/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function NewsletterVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("Verifying your subscription…");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing or invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/newsletter/verify?token=${token}`, {
          method: "GET",
        });
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("Subscription confirmed! Redirecting…");
          setTimeout(() => router.replace("/"), 2500); // go home
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong.");
      }
    };

    verify();
  }, [token, router]);

  /* -------------------- helpers (copied & tweaked) -------------------- */
  const getStatusIcon = () =>
    status === "loading" ? (
      <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
    ) : status === "success" ? (
      <CheckCircle className="w-12 h-12 text-emerald-500" />
    ) : (
      <XCircle className="w-12 h-12 text-red-500" />
    );

  const getGradientBorder = () =>
    status === "loading"
      ? "from-blue-500 to-cyan-500"
      : status === "success"
      ? "from-emerald-500 to-teal-500"
      : "from-red-500 to-pink-500";

  const getMessageBoxStyle = () =>
    status === "loading"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : status === "success"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-red-50 text-red-700 border-red-200";

  /* -------------------- render -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      {/* animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200/50 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SpeedyNews
            </h1>
            <span className="ml-2 px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
              Newsletter
            </span>
          </div>
        </div>
      </header>

      {/* card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md mt-20"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 text-center space-y-6">
          {/* icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-20 h-20 mx-auto bg-gradient-to-r ${getGradientBorder()} rounded-full flex items-center justify-center shadow-lg`}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              {getStatusIcon()}
            </div>
          </motion.div>

          {/* title & message */}
          <h2 className="text-3xl font-bold text-gray-900">
            Newsletter Verification
          </h2>
          <p className="text-gray-600">{message}</p>

          {/* actions */}
          {status === "error" && (
            <div className="space-y-3">
              <a
                href="/"
                className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Back to Home
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
