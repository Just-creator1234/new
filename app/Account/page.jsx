"use client";
import React, { useState } from "react";
import { updateUserProfile, changePassword } from "@/app/actions/manageAccount";
import {
  User,
  Mail,
  Lock,
  Edit,
  Check,
  X,
  Globe,
  ArrowRight,
} from "lucide-react";
import { useSession } from "next-auth/react";

const ManageAccountPage = () => {
  const { data: session, update } = useSession();
  const user = session?.user;

  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [slug, setSlug] = useState(user?.slug || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Edit modes
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingSlug, setIsEditingSlug] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Loading states
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("slug", slug);

    const result = await updateUserProfile(formData);

    if (result.error) {
      setError(result.error);
      // Revert changes if error
      setName(user?.name || "");
      setEmail(user?.email || "");
      setSlug(user?.slug || "");
    } else {
      setSuccess("Profile updated successfully!");
      // Update the session
      await update({
        ...session,
        user: {
          ...session?.user,
          name,
          email,
          slug,
        },
      });
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingSlug(false);
    }

    setIsUpdating(false);
  };

  const handleChangePassword = async () => {
    setIsUpdating(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);

    const result = await changePassword(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditingPassword(false);
    }

    setIsUpdating(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Account Settings
          </h1>
          <p className="text-neutral-600">
            Manage your writer profile and account details
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mb-8 overflow-hidden">
          <div className="px-6 py-5 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900">
              Profile Information
            </h2>
          </div>
          <div className="p-6">
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Name
              </label>
              <div className="flex items-center">
                {isEditingName ? (
                  <>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setName(user?.name || "");
                      }}
                      className="ml-2 p-2 text-neutral-500 hover:text-neutral-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className="ml-2 p-2 text-blue-600 hover:text-blue-800"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center flex-1">
                      <User className="h-5 w-5 text-neutral-400 mr-3" />
                      <span className="text-neutral-900">{name}</span>
                    </div>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-2 text-neutral-500 hover:text-neutral-700"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email
              </label>
              <div className="flex items-center">
                {isEditingEmail ? (
                  <>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your email address"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setIsEditingEmail(false);
                        setEmail(user?.email || "");
                      }}
                      className="ml-2 p-2 text-neutral-500 hover:text-neutral-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className="ml-2 p-2 text-blue-600 hover:text-blue-800"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center flex-1">
                      <Mail className="h-5 w-5 text-neutral-400 mr-3" />
                      <span className="text-neutral-900">{email}</span>
                    </div>
                    <button
                      onClick={() => setIsEditingEmail(true)}
                      className="p-2 text-neutral-500 hover:text-neutral-700"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Slug Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Profile URL
              </label>
              <div className="flex items-center">
                {isEditingSlug ? (
                  <>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-neutral-400" />
                      </div>
                      <div className="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none">
                        <span className="text-neutral-500">
                          speedynews.com/writer/
                        </span>
                      </div>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="pl-48 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your-username"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setIsEditingSlug(false);
                        setSlug(user?.slug || "");
                      }}
                      className="ml-2 p-2 text-neutral-500 hover:text-neutral-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className="ml-2 p-2 text-blue-600 hover:text-blue-800"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center flex-1">
                      <Globe className="h-5 w-5 text-neutral-400 mr-3" />
                      <span className="text-neutral-900">
                        speedynews.com/writer/{slug}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsEditingSlug(true)}
                      className="p-2 text-neutral-500 hover:text-neutral-700"
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
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mb-8 overflow-hidden">
          <div className="px-6 py-5 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900">
              Change Password
            </h2>
          </div>
          <div className="p-6">
            {isEditingPassword ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditingPassword(false)}
                    className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
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
                className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 flex items-center"
              >
                Change Password <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900">
              Account Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 flex justify-between items-center">
                <span className="text-neutral-700">Download your data</span>
                <ArrowRight className="h-4 w-4 text-neutral-500" />
              </button>
              <button className="w-full text-left px-4 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 flex justify-between items-center">
                <span className="text-neutral-700">
                  Request verification badge
                </span>
                <ArrowRight className="h-4 w-4 text-neutral-500" />
              </button>
              <button className="w-full text-left px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 flex justify-between items-center text-red-600">
                <span>Delete account</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccountPage;
