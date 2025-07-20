// app/onboarding/page.jsx
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
import { Tag } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 pt-12">
      <header className="sticky top-0 z-20 bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Complete Your Writer Profile
          </h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium mb-2">Avatar</label>
            <input type="file" accept="image/*" onChange={handleAvatar} />
            {avatarPreview && (
              <Image
                src={avatarPreview}
                alt="preview"
                width={96}
                height={96}
                className="mt-2 rounded-full object-cover"
              />
            )}
          </div>

          {/* Headline */}
          <div>
            <label className="block text-sm font-medium mb-1">Headline</label>
            <input
              type="text"
              placeholder="e.g. Senior Tech Reporter"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              rows={4}
              placeholder="Tell readers about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* Socials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <FiTwitter className="mr-1" /> Twitter
              </label>
              <input
                type="text"
                placeholder="@handle"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <FiLinkedin className="mr-1" /> LinkedIn
              </label>
              <input
                type="text"
                placeholder="linkedin.com/in/..."
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium mb-1">
                <FiGlobe className="mr-1" /> Website
              </label>
              <input
                type="url"
                placeholder="https://your-site.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="flex items-center text-sm font-medium mb-1">
              <Tag className="mr-1" /> Specialties
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="e.g. AI, Politics"
                className="flex-1 p-2 border rounded-lg"
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSpecialty())
                }
              />
              <button
                type="button"
                onClick={addSpecialty}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {specialties.map((t) => (
                <span
                  key={t}
                  className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(t)}
                    className="ml-1 text-blue-600"
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
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Finish Setup"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
