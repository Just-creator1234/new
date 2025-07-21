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

export default function VerifyEmailChangePage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [message, setMessage] = useState("Confirming address change…");
  const [status, setStatus] = useState("loading");
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage("Missing verification token.");
      setStatus("error");
      return;
    }

    fetch("/api/auth/verify-email-change", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setMessage("Your e-mail address was updated!");
          setStatus("success");
          setIsRedirecting(true);
          setTimeout(() => router.push("/manage-account"), 2000);
        } else {
          setMessage(data.error || "Verification failed.");
          setStatus("error");
        }
      })
      .catch(() => {
        setMessage("Something went wrong.");
        setStatus("error");
      });
  }, [token, router]);

  /* --- same styling helpers as the original page --- */
  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />;
      case "success":
        return <CheckCircle className="w-12 h-12 text-emerald-500" />;
      case "error":
        return <XCircle className="w-12 h-12 text-red-500" />;
      default:
        return <Mail className="w-12 h-12 text-blue-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "from-blue-500 to-cyan-500";
      case "success":
        return "from-emerald-500 to-teal-500";
      case "error":
        return "from-red-500 to-pink-500";
      default:
        return "from-blue-500 to-purple-500";
    }
  };

  const getMessageBoxStyle = () => {
    switch (status) {
      case "loading":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "success":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "error":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  /* --- same markup as the original page with wording tweaks --- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      {/* animated background etc. same as original */}
      <div className="relative mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6 border border-white/20">
            <div className="relative text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${getStatusColor()} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    {getStatusIcon()}
                  </div>
                </div>
              </motion.div>

              <h2 className="text-3xl font-bold text-gray-900">
                E-mail Address Change
              </h2>
              <p className="text-gray-600">{message}</p>

              <div className={`p-4 rounded-2xl border ${getMessageBoxStyle()}`}>
                <p className="font-medium">{message}</p>
              </div>

              <div className={`p-4 rounded-2xl border ${getMessageBoxStyle()}`}>
                <p className="font-medium">{message}</p>

                {status === "error" && message.includes("Unauthorized") && (
                  <p className="mt-2 text-sm text-amber-700">
                    Make sure you’re signed in to SpeedyNews in this browser,
                    then click the link again.
                  </p>
                )}
              </div>

              {status === "error" && (
                <a
                  href="/manage-account"
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Back to Settings
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
