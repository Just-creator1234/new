"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Search,
  User,
  Menu,
  Bell,
  Newspaper,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

const DropdownItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Only show the dropdown if the user is logged in AND has the 'writer' role
  const showWriterMenu = status === "authenticated" && session?.user?.role;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-blue-600">SpeedyNews</h1>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <button className="md:hidden p-2 text-gray-500 hover:text-gray-700">
              <Menu className="h-5 w-5" />
            </button>

            {showWriterMenu && (
              <div className="relative hidden md:block" ref={menuRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-black"
                >
                  <User className="h-4 w-4" />
                  <span>Account</span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1 z-50">
                    <DropdownItem
                      icon={<Newspaper className="h-4 w-4" />}
                      label="My Blogs"
                      onClick={() => router.push("/My-blogs")}
                    />
                    <DropdownItem
                      icon={<User className="h-4 w-4" />}
                      label="Profile"
                      onClick={() => router.push("/profile")}
                    />
                    <DropdownItem
                      icon={<Settings className="h-4 w-4" />}
                      label="Manage Account"
                      onClick={() => router.push("/account")}
                    />
                    <hr />
                    <DropdownItem
                      icon={<LogOut className="h-4 w-4" />}
                      label="Sign Out"
                      onClick={() => signOut({ callbackUrl: "/signin" })}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
