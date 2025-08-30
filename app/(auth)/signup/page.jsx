// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { signIn } from "next-auth/react";
// import {
//   ArrowRight,
//   CheckCircle,
//   TrendingUp,
//   Users,
//   Edit3,
// } from "lucide-react";

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
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       {/* Header */}
//       <header className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
//           <div className="flex items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="flex items-center"
//             >
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
//                 <div className="w-4 h-4 bg-white rounded-sm"></div>
//               </div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 SpeedyNews
//               </h1>
//             </motion.div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         \{/* Right Panel - Sign Up Form */}
//         <div className="flex items-center justify-center">
//           {hasMounted && (
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               className="w-full max-w-md"
//             >
//               <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6 border border-white/20 relative overflow-hidden">
//                 {/* Decorative gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

//                 <div className="relative">
//                   <div className="text-center space-y-2">
//                     <h2 className="text-3xl font-bold text-gray-900">
//                       Create Your Writer Account
//                     </h2>
//                     <p className="text-gray-600">
//                       Start publishing your stories today
//                     </p>
//                   </div>

//                   {error && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200"
//                     >
//                       {error}
//                     </motion.div>
//                   )}
//                   {verified && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200"
//                     >
//                       {verified}
//                     </motion.div>
//                   )}

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 p-3 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-gray-700 font-medium shadow-sm"
//                     onClick={() => signIn("google")}
//                   >
//                     <img
//                       src="/google.svg"
//                       alt="Google icon"
//                       className="w-5 h-5"
//                     />
//                     <span>Sign Up With Google</span>
//                   </motion.button>

//                   <div className="relative my-6">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-gray-300"></div>
//                     </div>
//                     <div className="relative flex justify-center text-sm">
//                       <span className="px-4 bg-white text-gray-500 font-medium">
//                         Or sign up with email
//                       </span>
//                     </div>
//                   </div>

//                   <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                       <label
//                         htmlFor="name"
//                         className="block text-sm font-semibold text-gray-700 mb-2"
//                       >
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         placeholder="Your name"
//                         required
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-gray-100"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="email"
//                         className="block text-sm font-semibold text-gray-700 mb-2"
//                       >
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         placeholder="your@email.com"
//                         required
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-gray-100"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="password"
//                         className="block text-sm font-semibold text-gray-700 mb-2"
//                       >
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         id="password"
//                         placeholder="At least 6 characters"
//                         required
//                         minLength={6}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-gray-100"
//                       />
//                     </div>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       type="submit"
//                       disabled={loading}
//                       className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg disabled:opacity-50"
//                     >
//                       {loading ? (
//                         <div className="flex items-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Creating account...
//                         </div>
//                       ) : (
//                         <>
//                           Get Started <ArrowRight className="ml-2 h-5 w-5" />
//                         </>
//                       )}
//                     </motion.button>
//                   </form>

//                   <p className="text-center text-gray-600 mt-6">
//                     Already have an account?{" "}
//                     <Link
//                       href="/signin"
//                       className="text-blue-600 hover:text-purple-600 font-semibold transition-colors"
//                     >
//                       Sign in
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
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
  Mail,
} from "lucide-react";

// Success Message Component (extracted for better organization)
const SuccessMessage = ({ verified, onTryAgain, onContinue }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6 border border-white/20 relative overflow-hidden"
  >
    {/* Decorative gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-3xl"></div>

    <div className="relative text-center space-y-6">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center"
      >
        <CheckCircle className="w-10 h-10 text-white" />
      </motion.div>

      {/* Success Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Account Created Successfully! 🎉
        </h2>
        <p className="text-gray-600 text-lg">
          Welcome to the Uni-Bok community
        </p>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200/50"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Mail className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-emerald-800">
            Check Your Email
          </span>
        </div>
        <p className="text-emerald-700 text-sm leading-relaxed">
          {verified ||
            "We've sent a verification link to your email address. Please check your inbox and click the link to activate your account."}
        </p>
      </motion.div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 gap-4"
      >
        <div className="bg-white/50 rounded-2xl p-4 border border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Start Writing</h4>
              <p className="text-sm text-gray-600">Publish your first story</p>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-2xl p-4 border border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Join Community</h4>
              <p className="text-sm text-gray-600">
                Connect with other writers
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-2xl p-4 border border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Grow Audience</h4>
              <p className="text-sm text-gray-600">Reach more readers</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <Link href="/signin">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
            onClick={onContinue}
          >
            Continue to Sign In <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </Link>

        <button
          onClick={onTryAgain}
          className="w-full py-3 px-4 text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          Create Another Account
        </button>
      </motion.div>

      {/* Bottom Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <p className="text-xs text-gray-500">
          Didn't receive the email? Check your spam folder or{" "}
          <button
            onClick={onTryAgain}
            className="text-blue-600 hover:text-purple-600 font-medium underline"
          >
            try again
          </button>
        </p>
      </motion.div>
    </div>
  </motion.div>
);

// Sign Up Form Component
const SignUpForm = ({
  name,
  email,
  password,
  error,
  loading,
  hasMounted,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleSignIn,
}) => (
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 p-3 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-gray-700 font-medium shadow-sm"
              onClick={onGoogleSignIn}
              type="button"
            >
              <img src="/google.svg" alt="Google icon" className="w-5 h-5" />
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

            <form onSubmit={onSubmit} className="space-y-5">
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
                  onChange={onNameChange}
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
                  onChange={onEmailChange}
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
                  onChange={onPasswordChange}
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
);

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Account Creation Failed");

      setVerified(data.message);
      setShowSuccess(true);
      // Clear form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleTryAgain = () => {
    setShowSuccess(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <main className="w-full max-w-lg">
        {showSuccess ? (
          <SuccessMessage
            verified={verified}
            onTryAgain={handleTryAgain}
            onContinue={() => setShowSuccess(false)}
          />
        ) : (
          <SignUpForm
            name={name}
            email={email}
            password={password}
            error={error}
            loading={loading}
            hasMounted={hasMounted}
            onNameChange={(e) => setName(e.target.value)}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit}
            onGoogleSignIn={handleGoogleSignIn}
          />
        )}
      </main>
    </div>
  );
}
