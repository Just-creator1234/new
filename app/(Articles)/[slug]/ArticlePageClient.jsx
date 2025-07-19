"use client";
import React from "react";
import {
  Search,
  ArrowRight,
  User,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  Menu,
  Bell,
  Globe,
  Bookmark,
  Eye,
  ThumbsUp,
  Calendar,
  Award,
  ExternalLink,
} from "lucide-react";

const ArticlePageClient = ({ article, relatedArticles }) => {
  const CategoryTag = ({ type, children }) => {
    const categoryClasses = {
      breaking: "bg-red-50 text-red-600 border-red-200",
      politics: "bg-blue-50 text-blue-600 border-blue-200",
      tech: "bg-purple-50 text-purple-600 border-purple-200",
      sports: "bg-green-50 text-green-600 border-green-200",
      business: "bg-yellow-50 text-yellow-600 border-yellow-200",
      world: "bg-gray-50 text-gray-600 border-gray-200",
    };

    return (
      <span
        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryClasses[type]}`}
      >
        {children}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!article) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">SpeedyNews</h1>
            </div>
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
              <button className="hidden md:flex items-center space-x-1 text-sm font-medium text-gray-700">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Article Header */}
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <CategoryTag type={article.category}>
                  {article.category.toUpperCase()}
                </CategoryTag>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{article.views}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {article.title}
              </h1>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-64 md:h-96 bg-gray-200 relative">
              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.altText || article.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="p-6">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: article.content?.html || article.content,
                }}
              />

              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <ThumbsUp className="h-5 w-5" />
                      <span>{article.likes} Likes</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <MessageCircle className="h-5 w-5" />
                      <span>{article.comments} Comments</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {article.readTime}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
                <h3 className="text-lg font-semibold">About the Author</h3>
              </div>

              <div className="p-6">
                <div className="flex gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center">
                    <User className="text-white h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">
                      {article.author.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {article.author.bio}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="flex justify-center items-center mb-1">
                      <Calendar className="text-blue-600 h-4 w-4 mr-1" />
                      <span className="text-xs text-gray-500">JOINED</span>
                    </div>
                    <p className="text-sm font-semibold">2019</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="flex justify-center items-center mb-1">
                      <Award className="text-purple-600 h-4 w-4 mr-1" />
                      <span className="text-xs text-gray-500">ARTICLES</span>
                    </div>
                    <p className="text-sm font-semibold">250+</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-gray-500 uppercase mb-3">
                    Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags?.map((tag) => (
                      <span
                        key={tag.name}
                        className="bg-blue-100 text-blue-700 px-2.5 py-1 text-xs rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium flex justify-center items-center">
                    <User className="h-4 w-4 mr-2" />
                    Follow Author
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium flex justify-center items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View All Articles
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles?.map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex space-x-3">
                      <div
                        className="flex-shrink-0 w-20 h-16 bg-gray-200 rounded-lg"
                        style={{
                          backgroundImage: `url(${item.imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div>
                        <CategoryTag type={item.category}>
                          {item.category.toUpperCase()}
                        </CategoryTag>
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 mt-1 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.readTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest tech news delivered to your inbox
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-12 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">
              Comments ({article.comments})
            </h2>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Add to the discussion..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <div className="flex justify-end mt-2">
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {[1, 2, 3].map((comment) => (
              <div key={comment} className="p-6">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Commenter Name</h4>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      This is a sample comment about how fascinating this
                      quantum computing breakthrough is. The implications are
                      truly staggering!
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <button className="text-xs text-gray-500 hover:text-blue-600 flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        <span>24</span>
                      </button>
                      <button className="text-xs text-gray-500 hover:text-blue-600">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                SpeedyNews
              </h3>
              <p className="text-sm text-gray-600">
                Delivering the latest news with speed and accuracy since 2020.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Categories
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Breaking
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Politics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Sports
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Connect
              </h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
            &copy; 2024 SpeedyNews. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticlePageClient;
