"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
  X,
} from "lucide-react";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    posts: [],
    writers: [],
    categories: [],
  });
  const [loading, setLoading] = useState(false);

  const searchPosts = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults({ posts: [], writers: [], categories: [] });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
      setResults({ posts: [], writers: [], categories: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPosts(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, searchPosts]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults({ posts: [], writers: [], categories: [] });
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    clearSearch,
  };
};

const useOutsideClick = (refs, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideAnyRef = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );

      if (clickedOutsideAnyRef) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs, callback]);
};

const DropdownItem = ({ icon, label, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${className}  cursor-pointer`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const SearchResults = ({ results, loading, onResultClick, query }) => {
  const hasResults =
    results.posts.length > 0 ||
    results.writers.length > 0 ||
    results.categories.length > 0;
  const totalResults =
    results.posts.length + results.writers.length + results.categories.length;

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="inline-flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          <span className="text-sm text-gray-500">Searching...</span>
        </div>
      </div>
    );
  }

  if (!hasResults && query.trim()) {
    return (
      <div className="p-4 text-center">
        <div className="text-gray-400 mb-2">
          <Search className="h-8 w-8 mx-auto" />
        </div>
        <p className="text-sm text-gray-500">No results found for "{query}"</p>
        <p className="text-xs text-gray-400 mt-1">
          Try different keywords or check spelling
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results summary */}
      <div className="px-3 py-2 bg-blue-50 border-b text-xs text-blue-600 font-medium">
        Found {totalResults} result{totalResults !== 1 ? "s" : ""} for "{query}"
      </div>

      {results.posts.length > 0 && (
        <SearchSection
          title="Posts"
          count={results.posts.length}
          icon={<Newspaper className="h-3 w-3" />}
        >
          {results.posts.slice(0, 5).map((post) => (
            <SearchResultItem
              key={post.id}
              title={post.title}
              subtitle={
                post.excerpt ||
                `Published ${
                  post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : ""
                }`
              }
              onClick={() => onResultClick(`/${post.slug}`)}
              type="post"
            />
          ))}
          {results.posts.length > 5 && (
            <div className="px-3 py-2 text-xs text-blue-600 bg-blue-50">
              +{results.posts.length - 5} more posts
            </div>
          )}
        </SearchSection>
      )}

      {results.writers.length > 0 && (
        <SearchSection
          title="Writers"
          count={results.writers.length}
          icon={<User className="h-3 w-3" />}
        >
          {results.writers.slice(0, 3).map((writer) => (
            <SearchResultItem
              key={writer.id}
              title={writer.name}
              subtitle={`${writer.postsCount || 0} posts`}
              onClick={() => onResultClick(`/Authors/${writer.slug}`)}
              type="writer"
            />
          ))}
          {results.writers.length > 3 && (
            <div className="px-3 py-2 text-xs text-blue-600 bg-blue-50">
              +{results.writers.length - 3} more writers
            </div>
          )}
        </SearchSection>
      )}

      {results.categories.length > 0 && (
        <SearchSection
          title="Categories"
          count={results.categories.length}
          icon={<Settings className="h-3 w-3" />}
        >
          {results.categories.slice(0, 3).map((category) => (
            <SearchResultItem
              key={category.id}
              title={category.name}
              subtitle={`${category.postsCount || 0} posts`}
              onClick={() => onResultClick(`/Categories/${category.slug}`)}
              type="category"
            />
          ))}
          {results.categories.length > 3 && (
            <div className="px-3 py-2 text-xs text-blue-600 bg-blue-50">
              +{results.categories.length - 3} more categories
            </div>
          )}
        </SearchSection>
      )}
    </div>
  );
};

const SearchSection = ({ title, count, icon, children }) => (
  <>
    <div className="px-3 py-2 flex items-center space-x-2 text-xs font-semibold text-gray-700 bg-gray-50 border-b">
      {icon}
      <span>{title}</span>
      <span className="text-gray-400">({count})</span>
    </div>
    {children}
  </>
);

const SearchResultItem = ({ title, subtitle, onClick, type }) => {
  const getTypeColor = () => {
    switch (type) {
      case "post":
        return "border-l-blue-400";
      case "writer":
        return "border-l-green-400";
      case "category":
        return "border-l-purple-400";
      default:
        return "border-l-gray-400";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-3 py-3 hover:bg-gray-50  transition-colors duration-200 border-b border-gray-100 last:border-b-0 border-l-2 ${getTypeColor()} cursor-pointer`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 truncate mt-1">{subtitle}</p>
          )}
        </div>
        <ChevronDown className="h-3 w-3 text-gray-400 transform -rotate-90 ml-2 flex-shrink-0" />
      </div>
    </button>
  );
};

const SearchBar = ({ searchRef }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { query, setQuery, results, loading, clearSearch } = useSearch();
  const router = useRouter();

  const handleResultClick = useCallback(
    (path) => {
      router.push(path);
      setSearchOpen(false);
      clearSearch();
    },
    [router, clearSearch]
  );

  const handleSearchToggle = useCallback(() => {
    if (searchOpen) {
      setSearchOpen(false);
      clearSearch();
    } else {
      setSearchOpen(true);
    }
  }, [searchOpen, clearSearch]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        clearSearch();
      }
    },
    [clearSearch]
  );

  useOutsideClick([searchRef], () => setSearchOpen(false));

  return (
    <>
      {/* Desktop Search */}
      <div className="relative" ref={searchRef}>
        <div className="flex items-center space-x-2">
          {searchOpen ? (
            <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search posts, writers, categories…"
                className="w-64 text-sm focus:outline-none"
                autoFocus
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-3 w-3 text-gray-500" />
                </button>
              )}
              <button
                onClick={handleSearchToggle}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSearchToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Desktop Search Results Dropdown */}
        {searchOpen && (
          <div className="absolute top-full mt-2 w-96 max-h-[70vh] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl z-50">
            <SearchResults
              results={results}
              loading={loading}
              onResultClick={handleResultClick}
              query={query}
            />
          </div>
        )}
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50">
          <div className="flex items-center space-x-2 p-4 border-b">
            <button
              onClick={handleSearchToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
            <div className="flex-1 flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search posts, writers, categories…"
                className="flex-1 text-sm bg-transparent focus:outline-none"
                autoFocus
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="h-3 w-3 text-gray-500" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <SearchResults
              results={results}
              loading={loading}
              onResultClick={handleResultClick}
              query={query}
            />
          </div>
        </div>
      )}
    </>
  );
};

const AccountDropdown = ({ menuRef }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const menuItems = useMemo(
    () => [
      {
        icon: <Newspaper className="h-4 w-4" />,
        label: "My Blogs",
        onClick: () => router.push("/My-blogs"),
      },
      {
        icon: <User className="h-4 w-4" />,
        label: "Profile",
        onClick: () => router.push(`/Authors/${session.user.slug}`),
      },
      {
        icon: <Settings className="h-4 w-4" />,
        label: "Manage Account",
        onClick: () => router.push("/Account"),
      },
    ],
    [router, session]
  );

  const handleMenuItemClick = useCallback((onClick) => {
    onClick();
    setOpen(false);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/signin"; // Redirect to signin after signout
  };

  useOutsideClick([menuRef], () => setOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <span>{session?.user?.name || "Account"}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
          {menuItems.map((item, index) => (
            <DropdownItem
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={() => handleMenuItemClick(item.onClick)}
            />
          ))}
          <hr className="my-1 border-gray-200" />
          <DropdownItem
            icon={<LogOut className="h-4 w-4" />}
            label="Sign Out"
            onClick={handleSignOut}
            className="text-red-600 hover:bg-red-50"
          />
        </div>
      )}
    </div>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const menuRef = useRef(null);

  const isLoggedIn = status === "authenticated";

  const menuItems = useMemo(() => {
    const items = [
      {
        icon: <Bell className="h-5 w-5" />,
        label: "Notifications",
        onClick: () => {
          /* handle notifications */
        },
      },
    ];

    if (isLoggedIn) {
      items.push(
        {
          icon: <Newspaper className="h-5 w-5" />,
          label: "My Blogs",
          onClick: () => router.push("/My-blogs"),
        },
        {
          icon: <User className="h-5 w-5" />,
          label: "Profile",
          onClick: () => router.push(`/Authors/${session.user.slug}`),
        },
        {
          icon: <Settings className="h-5 w-5" />,
          label: "Manage Account",
          onClick: () => router.push("/Account"),
        },
        {
          icon: <LogOut className="h-5 w-5" />,
          label: "Sign Out",
          onClick: () => handleSignOut,
          danger: true,
        }
      );
    }

    return items;
  }, [isLoggedIn, router, session]);

  const handleMenuItemClick = useCallback((onClick) => {
    onClick();
    setIsOpen(false);
  }, []);

  useOutsideClick([menuRef], () => setIsOpen(false));

  return (
    <div className="md:hidden relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-72 bg-white border-l border-gray-200 shadow-xl z-50 overflow-hidden">
            {/* User Info Section */}
            {isLoggedIn && (
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.user.name || session.user.email}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuItemClick(item.onClick)}
                  className={`w-full flex items-center space-x-3 px-6 py-3 text-sm transition-colors ${
                    item.danger
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}

              {!isLoggedIn && (
                <div className="border-t border-gray-200 mt-1 pt-1">
                  <button
                    onClick={() => {
                      router.push("/signin");
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-6 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>Sign In</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// export default function Navbar() {
//   const menuRef = useRef(null);
//   const searchRef = useRef(null);
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

//   const isLoggedIn = status === "authenticated";

//   useEffect(() => {
//     if (mobileSearchOpen && searchRef.current) {
//       const input = searchRef.current.querySelector("input");
//       input?.focus();
//     }
//   }, [mobileSearchOpen]);

//   const handleLogoClick = useCallback(() => {
//     router.push("/");
//   }, [router]);
//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-6 py-3">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
//               <div className="w-4 h-4 bg-white rounded-sm"></div>
//             </div>
//             <button
//               onClick={handleLogoClick}
//               className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
//             >
//               SpeedyNews
//             </button>
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Desktop View */}
//             <div className="hidden md:flex items-center space-x-2">
//               <SearchBar searchRef={searchRef} />
//               <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
//                 <Bell className="h-5 w-5" />
//               </button>
//               {isLoggedIn && <AccountDropdown menuRef={menuRef} />}
//             </div>

//             {/* Mobile View */}
//             <div className="md:hidden flex items-center space-x-2">
//               <button
//                 onClick={() => setMobileSearchOpen(true)}
//                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <Search className="h-5 w-5" />
//               </button>
//               <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
//                 <Bell className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Search Overlay - Simplified and Fixed */}
//         {mobileSearchOpen && (
//           <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
//             {/* Search header */}
//             <div className="flex items-center px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
//               <button
//                 onClick={() => setMobileSearchOpen(false)}
//                 className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 aria-label="Close search"
//               >
//                 <X className="h-5 w-5 text-gray-500" />
//               </button>
//               <div className="ml-2 flex-1">
//                 <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
//                   <Search className="h-4 w-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search posts, writers, categories..."
//                     className="flex-1 text-sm bg-transparent focus:outline-none"
//                     autoFocus
//                     ref={(el) => {
//                       if (el) searchRef.current = { current: el };
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Search results container - now properly integrated */}
//             <div className="flex-1 overflow-y-auto">
//               <SearchResults
//                 results={results}
//                 loading={loading}
//                 onResultClick={(path) => {
//                   router.push(path);
//                   setMobileSearchOpen(false);
//                 }}
//                 query={query}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

export default function Navbar() {
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Move search state here
  const { query, setQuery, results, loading, clearSearch } = useSearch();

  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    if (mobileSearchOpen && searchRef.current) {
      const input = searchRef.current.querySelector("input");
      input?.focus();
    }
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (mobileSearchOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileSearchOpen) {
        setMobileSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileSearchOpen]);

  const handleLogoClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleResultClick = useCallback(
    (path) => {
      router.push(path);
      setMobileSearchOpen(false);
      clearSearch();
    },
    [router, clearSearch]
  );

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <button
              onClick={handleLogoClick}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              SpeedyNews
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop View */}
            <div className="hidden md:flex items-center space-x-2">
              <SearchBar
                searchRef={searchRef}
                query={query}
                setQuery={setQuery}
                results={results}
                loading={loading}
                clearSearch={clearSearch}
              />
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              {isLoggedIn && <AccountDropdown menuRef={menuRef} />}
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {mobileSearchOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
            {/* Search header */}
            <div className="flex items-center px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close search"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
              <div className="ml-2 flex-1">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts, writers, categories..."
                    className="flex-1 text-sm bg-transparent focus:outline-none"
                    autoFocus
                    ref={searchRef}
                  />
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <X className="h-3 w-3 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Search results container */}
            <div className="flex-1 overflow-y-auto">
              <SearchResults
                results={results}
                loading={loading}
                onResultClick={handleResultClick}
                query={query}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
