// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   updateUserProfile,
//   changePassword,
//   getUser,
//   sendChangeEmailVerification,
//   deleteAccount,
// } from "@/app/actions/manageAccount";
// import {
//   User,
//   Mail,
//   Lock,
//   Edit,
//   Check,
//   X,
//   Globe,
//   ArrowRight,
// } from "lucide-react";

// export default function ManageAccountPage() {
//   // ------------------ state ------------------
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [slug, setSlug] = useState("");
//   const [currentEmail, setCurrentEmail] = useState(""); // latest from DB

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const [isEditingName, setIsEditingName] = useState(false);
//   const [isEditingEmail, setIsEditingEmail] = useState(false);
//   const [isEditingSlug, setIsEditingSlug] = useState(false);
//   const [isEditingPassword, setIsEditingPassword] = useState(false);

//   // ------------------ load fresh data once ------------------
//   useEffect(() => {
//     (async () => {
//       const fresh = await getUser();
//       if (fresh) {
//         setName(fresh.name ?? "");
//         setEmail(fresh.email ?? "");
//         setSlug(fresh.slug ?? "");
//         setCurrentEmail(fresh.email ?? ""); // authoritative e-mail
//       }
//     })();
//   }, []);

//   // ------------------ handlers ------------------
//   const handleUpdateProfile = async () => {
//     setIsUpdating(true);
//     setError(null);
//     setSuccess(null);
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("slug", slug);

//     const res = await updateUserProfile(formData);
//     if (res.error) {
//       setError(res.error);
//       // revert only these two fields
//       const fresh = await getUser();
//       if (fresh) {
//         setName(fresh.name ?? "");
//         setSlug(fresh.slug ?? "");
//       }
//     } else {
//       const fresh = await getUser();
//       if (fresh) {
//         setName(fresh.name ?? "");
//         setSlug(fresh.slug ?? "");
//         setEmail(fresh.email ?? ""); // keeps old value if still pending
//       }
//       setSuccess("Profile updated successfully!");
//       setIsEditingName(false);
//       setIsEditingSlug(false);
//     }
//     setIsUpdating(false);
//   };

//   const handleSendEmailVerification = async () => {
//     setIsUpdating(true);
//     setError(null);
//     setSuccess(null);
//     const { error } = await sendChangeEmailVerification(email);
//     setIsUpdating(false);
//     if (error) setError(error);
//     else {
//       setSuccess("A verification link has been sent to your new address.");
//       setIsEditingEmail(false);
//     }
//   };

//   const handleChangePassword = async () => {
//     setIsUpdating(true);
//     setError(null);
//     setSuccess(null);
//     const formData = new FormData();
//     formData.append("currentPassword", currentPassword);
//     formData.append("newPassword", newPassword);
//     formData.append("confirmPassword", confirmPassword);

//     const res = await changePassword(formData);
//     if (res.error) setError(res.error);
//     else {
//       setSuccess("Password changed successfully!");
//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//       setIsEditingPassword(false);
//     }
//     setIsUpdating(false);
//   };

//   return (
//     <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-neutral-900 mb-2">
//             Account Settings
//           </h1>
//           <p className="text-lg text-neutral-600">
//             Manage your writer profile and account details
//           </p>
//         </div>

//         {/* Success/Error Messages */}
//         {success && (
//           <div className="mb-6 p-4 bg-success-100 text-success-700 rounded-lg border border-success-200">
//             {success}
//           </div>
//         )}
//         {error && (
//           <div className="mb-6 p-4 bg-error-100 text-error-700 rounded-lg border border-error-200">
//             {error}
//           </div>
//         )}

//         {/* Profile Card */}
//         <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 mb-8 overflow-hidden">
//           <div className="px-6 py-5 border-b border-neutral-200">
//             <h2 className="text-xl font-semibold text-neutral-900">
//               Profile Information
//             </h2>
//           </div>
//           <div className="p-6">
//             {/* Name Field */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-neutral-700 mb-2">
//                 Name
//               </label>
//               <div className="flex items-center">
//                 {isEditingName ? (
//                   <>
//                     <div className="relative flex-1">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <User className="h-5 w-5 text-neutral-400" />
//                       </div>
//                       <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="pl-10 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         placeholder="Your full name"
//                       />
//                     </div>
//                     <button
//                       onClick={() => {
//                         setIsEditingName(false);
//                         setName(user?.name || "");
//                       }}
//                       className="ml-2 p-2 text-neutral-500 hover:text-neutral-700"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={handleUpdateProfile}
//                       disabled={isUpdating}
//                       className="ml-2 p-2 text-primary-600 hover:text-primary-800"
//                     >
//                       <Check className="h-5 w-5" />
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="flex items-center flex-1">
//                       <User className="h-5 w-5 text-neutral-400 mr-3" />
//                       <span className="text-neutral-900">{name}</span>
//                     </div>
//                     <button
//                       onClick={() => setIsEditingName(true)}
//                       className="p-2 text-neutral-500 hover:text-neutral-700"
//                     >
//                       <Edit className="h-5 w-5" />
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Email Field */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-neutral-700 mb-2">
//                 Email
//               </label>
//               <div className="flex items-center">
//                 {isEditingEmail ? (
//                   <>
//                     <div className="relative flex-1">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Mail className="h-5 w-5 text-neutral-400" />
//                       </div>
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="pl-10 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         placeholder="Your email address"
//                       />
//                     </div>

//                     {/* Cancel */}
//                     <button
//                       onClick={() => {
//                         setIsEditingEmail(false);
//                         setEmail(currentEmail); // ← revert to the DB value
//                       }}
//                       className="ml-2 p-2 text-neutral-500 hover:text-neutral-700"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>

//                     {/* Send verification (only when changed) */}
//                     {email !== currentEmail && (
//                       <button
//                         onClick={async () => {
//                           setIsUpdating(true);
//                           setError(null);
//                           setSuccess(null);
//                           const { error } = await sendChangeEmailVerification(
//                             email
//                           );
//                           setIsUpdating(false);
//                           if (error) {
//                             setError(error);
//                           } else {
//                             setSuccess(
//                               "Check your inbox for a confirmation link."
//                             );
//                             setIsEditingEmail(false);
//                           }
//                         }}
//                         disabled={isUpdating}
//                         className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
//                       >
//                         {isUpdating ? "Sending…" : "Verify"}
//                       </button>
//                     )}
//                   </>
//                 ) : (
//                   <>
//                     <div className="flex items-center flex-1">
//                       <Mail className="h-5 w-5 text-neutral-400 mr-3" />
//                       <span className="text-neutral-900">{email}</span>
//                     </div>
//                     <button
//                       onClick={() => setIsEditingEmail(true)}
//                       className="p-2 text-neutral-500 hover:text-neutral-700"
//                     >
//                       <Edit className="h-5 w-5" />
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Slug Field */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-neutral-700 mb-2">
//                 Profile URL
//               </label>
//               <div className="flex items-center">
//                 {isEditingSlug ? (
//                   <>
//                     <div className="relative flex-1">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Globe className="h-5 w-5 text-neutral-400" />
//                       </div>
//                       <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
//                         <span className="text-neutral-500">
//                           speedynews.com/writer/
//                         </span>
//                       </div>
//                       <input
//                         type="text"
//                         value={slug}
//                         onChange={(e) => setSlug(e.target.value)}
//                         className="pl-48 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         placeholder="your-username"
//                       />
//                     </div>
//                     <button
//                       onClick={() => {
//                         setIsEditingSlug(false);
//                         setSlug(user?.slug || "");
//                       }}
//                       className="ml-2 p-2 text-neutral-500 hover:text-neutral-700"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={handleUpdateProfile}
//                       disabled={isUpdating}
//                       className="ml-2 p-2 text-primary-600 hover:text-primary-800"
//                     >
//                       <Check className="h-5 w-5" />
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="flex items-center flex-1">
//                       <Globe className="h-5 w-5 text-neutral-400 mr-3" />
//                       <span className="text-neutral-900">
//                         speedynews.com/writer/ {slug}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => setIsEditingSlug(true)}
//                       className="p-2 text-neutral-500 hover:text-neutral-700"
//                     >
//                       <Edit className="h-5 w-5" />
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Password Card */}
//         <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 mb-8 overflow-hidden">
//           <div className="px-6 py-5 border-b border-neutral-200">
//             <h2 className="text-xl font-semibold text-neutral-900">
//               Change Password
//             </h2>
//           </div>
//           <div className="p-6">
//             {isEditingPassword ? (
//               <>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-neutral-700 mb-2">
//                     Current Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-neutral-400" />
//                     </div>
//                     <input
//                       type="password"
//                       value={currentPassword}
//                       onChange={(e) => setCurrentPassword(e.target.value)}
//                       className="pl-10 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                       placeholder="Enter current password"
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-neutral-700 mb-2">
//                     New Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-neutral-400" />
//                     </div>
//                     <input
//                       type="password"
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       className="pl-10 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                       placeholder="Enter new password"
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-neutral-700 mb-2">
//                     Confirm New Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-neutral-400" />
//                     </div>
//                     <input
//                       type="password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       className="pl-10 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                       placeholder="Confirm new password"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     onClick={() => setIsEditingPassword(false)}
//                     className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
//                     disabled={isUpdating}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleChangePassword}
//                     disabled={isUpdating}
//                     className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
//                   >
//                     {isUpdating ? (
//                       "Updating..."
//                     ) : (
//                       <>
//                         Update Password <ArrowRight className="ml-2 h-4 w-4" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <button
//                 onClick={() => setIsEditingPassword(true)}
//                 className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 flex items-center"
//               >
//                 Change Password <ArrowRight className="ml-2 h-4 w-4" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Account Actions */}
//         <button
//           className="w-full text-left px-4 py-3 border border-error-200 rounded-lg hover:bg-error-50 flex justify-between items-center text-error-600"
//           onClick={async () => {
//             if (window.confirm("Are you sure? This action CANNOT be undone.")) {
//               const res = await deleteAccount();
//               if (res.error) alert(res.error);
//               else location.href = "/"; // or sign-out page
//             }
//           }}
//         >
//           <span>Delete account</span>
//           <ArrowRight className="h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";

import {
  updateUserProfile,
  changePassword,
  getUser,
  sendChangeEmailVerification,
  deleteAccount,
} from "@/app/actions/manageAccount";
import {
  User,
  Mail,
  Lock,
  Edit,
  Check,
  X,
  Globe,
  ArrowRight,
  Zap,
  AlertTriangle,
} from "lucide-react";

export default function ManageAccountPage() {
  // ------------------ state ------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [slug, setSlug] = useState("");
  const [currentEmail, setCurrentEmail] = useState(""); // latest from DB

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingSlug, setIsEditingSlug] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ------------------ load fresh data once ------------------
  useEffect(() => {
    (async () => {
      const fresh = await getUser();
      if (fresh) {
        setName(fresh.name ?? "");
        setEmail(fresh.email ?? "");
        setSlug(fresh.slug ?? "");
        setCurrentEmail(fresh.email ?? ""); // authoritative e-mail
      }
    })();
  }, []);

  // ------------------ handlers ------------------
  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    setError(null);
    setSuccess(null);
    const formData = new FormData();
    formData.append("name", name);

    const res = await updateUserProfile(formData);
    if (res.error) {
      setError(res.error);
      // revert only these two fields
      const fresh = await getUser();
      if (fresh) {
        setName(fresh.name ?? "");
      }
    } else {
      const fresh = await getUser();
      if (fresh) {
        setName(fresh.name ?? "");
        setSlug(fresh.slug ?? "");
        setEmail(fresh.email ?? ""); // keeps old value if still pending
      }
      setSuccess("Profile updated successfully!");
      setIsEditingName(false);
      setIsEditingSlug(false);
    }
    setIsUpdating(false);
  };

  const handleDeleteAccount = async () => {
    const res = await deleteAccount();
    if (res.error) {
      setError(res.error);
    } else {
      location.href = "/signin";
    }
    setShowDeleteModal(false);
  };

  const handleChangePassword = async () => {
    setIsUpdating(true);
    setError(null);
    setSuccess(null);
    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);

    const res = await changePassword(formData);
    if (res.error) setError(res.error);
    else {
      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditingPassword(false);
    }
    setIsUpdating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Account Settings
          </h1>
          <p className="text-lg text-gray-600">
            Manage your writer profile and account details
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-200 mb-8 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200/50">
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h2>
          </div>
          <div className="p-6">
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="flex items-center">
                {isEditingName ? (
                  <>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                        placeholder="Your full name"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setName(user?.name || "");
                      }}
                      className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className="ml-2 p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center flex-1">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{name}</span>
                    </div>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex items-center">
                {isEditingEmail ? (
                  <>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                        placeholder="Your email address"
                      />
                    </div>

                    {/* Cancel */}
                    <button
                      onClick={() => {
                        setIsEditingEmail(false);
                        setEmail(currentEmail); // ← revert to the DB value
                      }}
                      className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    {/* Send verification (only when changed) */}
                    {email !== currentEmail && (
                      <button
                        onClick={async () => {
                          setIsUpdating(true);
                          setError(null);
                          setSuccess(null);
                          const { error } = await sendChangeEmailVerification(
                            email
                          );
                          setIsUpdating(false);
                          if (error) {
                            setError(error);
                          } else {
                            setSuccess(
                              "Check your inbox for a confirmation link."
                            );
                            setIsEditingEmail(false);
                          }
                        }}
                        disabled={isUpdating}
                        className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm hover:shadow-md transition-all"
                      >
                        {isUpdating ? "Sending…" : "Verify"}
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center flex-1">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{email}</span>
                    </div>
                    <button
                      onClick={() => setIsEditingEmail(true)}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Slug Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile URL
              </label>
              <div className="flex items-center">
                {isEditingSlug ? (
                  <>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                        <span className="text-gray-500">
                          speedynews.com/writer/
                        </span>
                      </div>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="pl-48 w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                        placeholder="your-username"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setIsEditingSlug(false);
                        setSlug(user?.slug || "");
                      }}
                      className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className="ml-2 p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center flex-1">
                      <Globe className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        speedynews.com/writer/{slug}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsEditingSlug(true)}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Password Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-200 mb-8 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200/50">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Change Password
              </h2>
            </div>
          </div>
          <div className="p-6">
            {isEditingPassword ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditingPassword(false)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50/50 transition-colors"
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-md transition-all flex items-center"
                  >
                    {isUpdating ? (
                      "Updating..."
                    ) : (
                      <>
                        Update Password <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setIsEditingPassword(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all flex items-center border-2 border-blue-100"
              >
                Change Password <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200/50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Account Actions
              </h2>
            </div>
          </div>
          <div className="p-6">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full text-left px-4 py-3 border-2 border-red-200 rounded-xl hover:bg-red-50/50 flex justify-between items-center text-red-600 transition-colors"
            >
              <span>Delete account</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Your Account?"
        message="This will permanently remove all your data from our servers. This action cannot be undone."
        confirmText="Delete Account"
      />
    </div>
  );
}
