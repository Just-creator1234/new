// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// export default function VerifyEmailPage() {
//   const params = useSearchParams();
//   const router = useRouter();
//   const token = params.get("token");
//   const [message, setMessage] = useState("Verifying your email...");

//   useEffect(() => {
//     if (!token) {
//       setMessage("❌ Invalid or missing token.");
//       return;
//     }

//     const verify = async () => {
//       try {
//         const res = await fetch("/api/auth/verify", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token }),
//         });

//         if (res.ok) {
//           setMessage("✅ Email verified! Redirecting to login...");
//           setTimeout(() => {
//             router.push("/signin?verified=true");
//           }, 2500);
//         } else {
//           const data = await res.json();
//           setMessage(`❌ ${data.error || "Verification failed."}`);
//         }
//       } catch (error) {
//         setMessage("❌ Something went wrong.");
//       }
//     };

//     verify();
//   }, [token, router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white px-6 py-10 rounded-xl shadow-lg  w-[25rem] text-center"
//       >
//         <h1 className="text-2xl font-bold text-primary mb-4">
//           Email Verification
//         </h1>

//         <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded text-sm font-medium text-center space-y-2">
//           <p>{message}</p>

//           {/* Show retry link only if the message contains an error (optional logic) */}
//           {message.toLowerCase().includes("invalid") ||
//           message.toLowerCase().includes("expired") ? (
//             <a
//               href="/signup"
//               className="text-blue-600 underline hover:text-blue-800 text-sm inline-block"
//             >
//               Please try again
//             </a>
//           ) : null}
//         </div>
//       </motion.div>
//     </div>
//   );
// }

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

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing verification token.");
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
           const data = await res.json();
          setMessage("Email verified successfully! Redirecting to login...");
          setStatus("success");
          setIsRedirecting(true);
          setTimeout(() => {
            router.push(`/signin?verified=true&userId=${data.userId}`);
          }, 2500);
        } else {
          const data = await res.json();
          setMessage(data.error || "Verification failed.");
          setStatus("error");
        }
      } catch (error) {
        setMessage("Something went wrong. Please try again.");
        setStatus("error");
      }
    };

    verify();
  }, [token, router]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SpeedyNews
              </h1>
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                For Writers
              </span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6 border border-white/20 relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

            <div className="relative text-center space-y-6">
              {/* Animated Icon */}
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

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  Email Verification
                </h2>
                <p className="text-gray-600">
                  We're verifying your email address
                </p>
              </div>

              {/* Status Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`p-4 rounded-2xl border ${getMessageBoxStyle()} text-center`}
              >
                <p className="font-medium">{message}</p>

                {/* Loading dots animation */}
                {status === "loading" && (
                  <div className="flex justify-center mt-3 space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                )}

                {/* Redirecting animation */}
                {isRedirecting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center mt-3 text-emerald-600"
                  >
                    <ArrowRight className="w-4 h-4 mr-1 animate-pulse" />
                    <span className="text-sm">Redirecting...</span>
                  </motion.div>
                )}
              </motion.div>

              {/* Error Actions */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="space-y-3"
                >
                  <div className="text-sm text-gray-600">
                    Having trouble? Try these options:
                  </div>

                  <div className="flex flex-col space-y-2">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="/signup"
                      className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="/signin"
                      className="inline-flex items-center justify-center px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
                    >
                      Back to Sign In
                    </motion.a>
                  </div>
                </motion.div>
              )}

              {/* Success Actions */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="space-y-3"
                >
                  <div className="text-sm text-gray-600">
                    You can now access your writer dashboard
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="/signin"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg"
                  >
                    Continue to Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.a>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
