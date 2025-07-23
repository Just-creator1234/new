// // app/onboarding/page.jsx
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//   FiUser,
//   FiTwitter,
//   FiLinkedin,
//   FiGlobe,
//   FiCheck,
// } from "react-icons/fi";
// import { Tag } from "lucide-react";

// export default function OnboardingPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const userId = searchParams.get("userId");

//   /* --- state --- */
//   const [headline, setHeadline] = useState("");
//   const [bio, setBio] = useState("");
//   const [avatar, setAvatar] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState("");
//   const [twitter, setTwitter] = useState("");
//   const [linkedin, setLinkedin] = useState("");
//   const [website, setWebsite] = useState("");
//   const [specialties, setSpecialties] = useState([]);
//   const [newTag, setNewTag] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* --- helpers --- */
//   const handleAvatar = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setAvatar(file);
//       setAvatarPreview(URL.createObjectURL(file));
//     }
//   };

//   const addSpecialty = () => {
//     const t = newTag.trim();
//     if (t && !specialties.includes(t)) {
//       setSpecialties([...specialties, t]);
//       setNewTag("");
//     }
//   };

//   const removeSpecialty = (t) => {
//     setSpecialties(specialties.filter((s) => s !== t));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     let avatarUrl = "";
//     if (avatar) {
//       const fd = new FormData();
//       fd.append("image", avatar);
//       const res = await fetch("/api/upload", { method: "POST", body: fd });
//       const data = await res.json();
//       avatarUrl = data.url || "";
//     }

//     const payload = {
//       userId,
//       headline,
//       bio,
//       avatar: avatarUrl,
//       twitter,
//       linkedin,
//       website,
//       specialties,
//     };

//     const res = await fetch("/api/auth/writer-profile", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (res.ok) {
//       router.push(`/My-blogs`);
//     } else {
//       alert("Something went wrong.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pt-12">
//       <header className="sticky top-0 z-20 bg-white border-b px-4 py-3">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <h1 className="text-xl font-semibold text-gray-900">
//             Complete Your Writer Profile
//           </h1>
//         </div>
//       </header>

//       <div className="max-w-2xl mx-auto p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Avatar */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Avatar</label>
//             <input type="file" accept="image/*" onChange={handleAvatar} />
//             {avatarPreview && (
//               <Image
//                 src={avatarPreview}
//                 alt="preview"
//                 width={96}
//                 height={96}
//                 className="mt-2 rounded-full object-cover"
//               />
//             )}
//           </div>

//           {/* Headline */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Headline</label>
//             <input
//               type="text"
//               placeholder="e.g. Senior Tech Reporter"
//               value={headline}
//               onChange={(e) => setHeadline(e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               required
//             />
//           </div>

//           {/* Bio */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Bio</label>
//             <textarea
//               rows={4}
//               placeholder="Tell readers about yourself..."
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               required
//             />
//           </div>

//           {/* Socials */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="flex items-center text-sm font-medium mb-1">
//                 <FiTwitter className="mr-1" /> Twitter
//               </label>
//               <input
//                 type="text"
//                 placeholder="@handle"
//                 value={twitter}
//                 onChange={(e) => setTwitter(e.target.value)}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="flex items-center text-sm font-medium mb-1">
//                 <FiLinkedin className="mr-1" /> LinkedIn
//               </label>
//               <input
//                 type="text"
//                 placeholder="linkedin.com/in/..."
//                 value={linkedin}
//                 onChange={(e) => setLinkedin(e.target.value)}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="flex items-center text-sm font-medium mb-1">
//                 <FiGlobe className="mr-1" /> Website
//               </label>
//               <input
//                 type="url"
//                 placeholder="https://your-site.com"
//                 value={website}
//                 onChange={(e) => setWebsite(e.target.value)}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//           </div>

//           {/* Specialties */}
//           <div>
//             <label className="flex items-center text-sm font-medium mb-1">
//               <Tag className="mr-1" /> Specialties
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//                 placeholder="e.g. AI, Politics"
//                 className="flex-1 p-2 border rounded-lg"
//                 onKeyDown={(e) =>
//                   e.key === "Enter" && (e.preventDefault(), addSpecialty())
//                 }
//               />
//               <button
//                 type="button"
//                 onClick={addSpecialty}
//                 className="px-3 py-2 bg-blue-600 text-white rounded-lg"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {specialties.map((t) => (
//                 <span
//                   key={t}
//                   className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                 >
//                   {t}
//                   <button
//                     type="button"
//                     onClick={() => removeSpecialty(t)}
//                     className="ml-1 text-blue-600"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Submit */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg disabled:opacity-50"
//           >
//             {loading ? "Saving..." : "Finish Setup"}
//           </motion.button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiUser,
  FiTwitter,
  FiLinkedin,
  FiGlobe,
  FiCheck,
} from "react-icons/fi";
import { Tag, Zap, ArrowRight, User as UserIcon } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  /* --- state --- */
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);

  /* --- helpers --- */
  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const addSpecialty = () => {
    const t = newTag.trim();
    if (t && !specialties.includes(t)) {
      setSpecialties([...specialties, t]);
      setNewTag("");
    }
  };

  const removeSpecialty = (t) => {
    setSpecialties(specialties.filter((s) => s !== t));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let avatarUrl = "";
    if (avatar) {
      const fd = new FormData();
      fd.append("image", avatar);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      avatarUrl = data.url || "";
    }

    const payload = {
      userId,
      headline,
      bio,
      avatar: avatarUrl,
      twitter,
      linkedin,
      website,
      specialties,
    };

    const res = await fetch("/api/auth/writer-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push(`/My-blogs`);
    } else {
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Complete Your Writer Profile
          </h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Profile Picture
            </label>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <UserIcon className="h-10 w-10 text-white" />
                  )}
                </div>
              </div>
              <div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatar}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gradient-to-r file:from-blue-50 file:to-purple-50 file:text-blue-600
                      hover:file:bg-gradient-to-r hover:file:from-blue-100 hover:file:to-purple-100"
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  JPG, GIF or PNG. Max 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Headline
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Tech Reporter"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
              required
            />
          </div>

          {/* Bio */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              placeholder="Tell readers about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
              required
            />
          </div>

          {/* Socials */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Social Profiles
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FiTwitter className="text-blue-400" /> Twitter
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">@</span>
                  </div>
                  <input
                    type="text"
                    placeholder="username"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="pl-8 w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FiLinkedin className="text-blue-600" /> LinkedIn
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">linkedin.com/in/</span>
                  </div>
                  <input
                    type="text"
                    placeholder="profile"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="pl-36 w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FiGlobe className="text-blue-500" /> Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">https://</span>
                  </div>
                  <input
                    type="text"
                    placeholder="yourwebsite.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="pl-16 w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Tag className="text-purple-500" /> Specialties
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="e.g. AI, Politics, Finance"
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSpecialty())
                }
              />
              <button
                type="button"
                onClick={addSpecialty}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-md transition-all"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((t) => (
                <span
                  key={t}
                  className="flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-800 rounded-full text-sm font-medium border border-purple-200"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(t)}
                    className="ml-1.5 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                Complete Profile <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
