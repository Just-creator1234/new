"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const search = useSearchParams();

  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    if (session?.user?.slug) {
      router.replace(`/My-blogs`);
    }
  }, [session, router]);

  async function handleSubmition(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      remember,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    }

    setLoading(false);
  }

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
  };

  const buttonVariants = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #f8fafc, #dbeafe, #e0e7ff)",
      }}
    >
      {/* Animated Background Elements */}
      <div
        className="floating-orb-1 absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 animate-pulse"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
          filter: "blur(3rem)",
        }}
      ></div>

      <div
        className="floating-orb-2 absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 animate-pulse"
        style={{
          background:
            "linear-gradient(to top right, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2))",
          filter: "blur(3rem)",
          animationDelay: "1s",
        }}
      ></div>

      {/* RIGHT SIDE - SIGN IN FORM */}
      <div className="w-full min-h-screen flex items-center justify-center px-4 relative">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          className="p-8 w-full max-w-md space-y-6 relative"
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            borderRadius: "1.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 rounded-3xl opacity-50 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))",
            }}
          ></div>

          <div className="relative z-10">
            <motion.h2
              className="text-center text-3xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Welcome Back
            </motion.h2>

            <motion.p
              className="text-center text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Sign in to access your account
            </motion.p>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full rounded-2xl text-red-600 text-center p-4 text-sm mb-6"
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmition} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl transition-all duration-200 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
                  style={{
                    background: "rgba(249, 250, 251, 0.5)",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl transition-all duration-200 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
                  style={{
                    background: "rgba(249, 250, 251, 0.5)",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </motion.div>

              <motion.div
                className="flex items-center justify-between text-sm text-gray-600 max-sm:flex-col gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="font-medium">Remember Me</span>
                </label>

                <Link
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                variants={buttonVariants}
                whileHover="whileHover"
                whileTap="whileTap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className={`w-full h-14 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-xl"
                }`}
                style={{
                  background: "linear-gradient(to right, #2563eb, #9333ea)",
                }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>

            <motion.div
              className="relative my-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500 font-medium">
                  Or continue with
                </span>
              </div>
            </motion.div>

            <motion.button
              variants={buttonVariants}
              whileHover="whileHover"
              whileTap="whileTap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 p-4 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
              onClick={() => {
                signIn("google");
              }}
            >
              <img src="/google.svg" alt="Google icon" className="w-5 h-5" />
              <span className="text-gray-700 font-medium">
                Sign In With Google
              </span>
            </motion.button>

            <motion.p
              className="text-center text-gray-600 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign Up
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
