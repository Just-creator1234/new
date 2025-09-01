import Link from "next/link";
import { TrendingUp, Eye } from "lucide-react";

const TrendingSection = ({
  articles,
  title = "Trending Now",
  maxItems = 3,
  showViewCount = false,
  showReadTime = true,
  className = "",
  sticky = false,
}) => {
  return (
    <div
      className={`bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 ${
        sticky ? "sticky top-6" : ""
      } ${className}`}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h3 className="text-lg font-bold text-white flex items-center whitespace-normal break-words">
          <TrendingUp className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="break-words line-clamp-2">{title}</span>
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {articles?.slice(0, maxItems).map((article, index) => (
          <Link
            key={article.id || index}
            href={`/${article.slug}`}
            className="flex items-start space-x-3 group"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              {" "}
              {/* Added min-w-0 for proper text wrapping */}
              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2 break-words">
                {article.title}
              </h4>
              <div className="flex items-center space-x-2 mt-1 flex-wrap gap-1">
                {" "}
                {/* Added flex-wrap and gap */}
                {article.category && (
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white whitespace-nowrap">
                    {article.category}
                  </span>
                )}
                {showViewCount && article.viewCount && (
                  <span className="text-xs text-gray-500 flex items-center whitespace-nowrap">
                    <Eye className="w-3 h-3 mr-1 flex-shrink-0" />
                    {article.viewCount.toLocaleString()}
                  </span>
                )}
                {showReadTime && article.readTime && (
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    • {article.readTime}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
