// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { signIn } from "next-auth/react";
// import { ArrowRight } from "lucide-react";

// export default function SignUpPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [verified, setVerified] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.error || "Account Creation Failed");
//       setVerified(data.message);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-blue-600">SpeedyNews</h1>
//             <span className="ml-2 text-sm text-gray-500">For Writers</span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left Panel - Welcome */}
//           <div className="hidden lg:flex flex-col justify-center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="space-y-6"
//             >
//               <h2 className="text-4xl font-bold text-gray-900">
//                 Join Our Community of Writers
//               </h2>
//               <p className="text-lg text-gray-600">
//                 Publish your stories, reach millions of readers, and grow your
//                 audience on SpeedyNews - the fastest growing news platform.
//               </p>
//               <div className="space-y-4">
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
//                     <div className="w-2 h-2 bg-white rounded-full" />
//                   </div>
//                   <div>
//                     <p className="font-medium">Monetize Your Content</p>
//                     <p className="text-sm text-gray-600">
//                       Earn revenue from your articles through our partner program
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
//                     <div className="w-2 h-2 bg-white rounded-full" />
//                   </div>
//                   <div>
//                     <p className="font-medium">Real-time Analytics</p>
//                     <p className="text-sm text-gray-600">
//                       Track your article performance and audience engagement
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
//                     <div className="w-2 h-2 bg-white rounded-full" />
//                   </div>
//                   <div>
//                     <p className="font-medium">Editorial Support</p>
//                     <p className="text-sm text-gray-600">
//                       Get help from our professional editors to polish your work
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Panel - Sign Up Form */}
//           <div className="flex items-center justify-center">
//             {hasMounted && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 sm:p-10 space-y-6 border border-gray-200"
//               >
//                 <div className="text-center space-y-2">
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Create Your Writer Account
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     Start publishing your stories today
//                   </p>
//                 </div>

//                 {error && (
//                   <div className="p-3 bg-red-50 text-sm text-red-700 rounded-lg">
//                     {error}
//                   </div>
//                 )}
//                 {verified && (
//                   <div className="p-3 bg-yellow-50 text-sm text-yellow-700 rounded-lg">
//                     {verified}
//                   </div>
//                 )}

//                 <button
//                   className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 p-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
//                   onClick={() => signIn("google")}
//                 >
//                   <img
//                     src="/google.svg"
//                     alt="Google icon"
//                     className="w-5 h-5"
//                   />
//                   <span>Sign Up With Google</span>
//                 </button>

//                 <div className="relative my-4">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-300"></div>
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-3 bg-white text-gray-500">
//                       Or sign up with email
//                     </span>
//                   </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       placeholder="Your name"
//                       required
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       placeholder="your@email.com"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="password"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       id="password"
//                       placeholder="At least 6 characters"
//                       required
//                       minLength={6}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
//                   >
//                     {loading ? (
//                       "Creating account..."
//                     ) : (
//                       <>
//                         Get Started <ArrowRight className="ml-2 h-4 w-4" />
//                       </>
//                     )}
//                   </button>
//                 </form>

//                 <p className="text-center text-sm text-gray-500">
//                   Already have an account?{" "}
//                   <Link
//                     href="/signin"
//                     className="text-blue-600 hover:underline font-medium"
//                   >
//                     Sign in
//                   </Link>
//                 </p>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Edit3,
} from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Account Creation Failed");
      setVerified(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
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
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        \{/* Right Panel - Sign Up Form */}
        <div className="flex items-center justify-center">
          {hasMounted && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-md"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6 border border-white/20 relative overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

                <div className="relative">
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Create Your Writer Account
                    </h2>
                    <p className="text-gray-600">
                      Start publishing your stories today
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200"
                    >
                      {error}
                    </motion.div>
                  )}
                  {verified && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200"
                    >
                      {verified}
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 p-3 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-gray-700 font-medium shadow-sm"
                    onClick={() => signIn("google")}
                  >
                    <img
                      src="/google.svg"
                      alt="Google icon"
                      className="w-5 h-5"
                    />
                    <span>Sign Up With Google</span>
                  </motion.button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">
                        Or sign up with email
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="At least 6 characters"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-gray-100"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating account...
                        </div>
                      ) : (
                        <>
                          Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="text-blue-600 hover:text-purple-600 font-semibold transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
