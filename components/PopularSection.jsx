import Link from "next/link";
import { TrendingUp, Eye, Clock } from "lucide-react";

const PopularSection = ({ 
  posts, 
  getTimeAgo,
  title = "Popular Today",
  maxItems = 5,
  className = ""
}) => {
  return (
    <div className={`bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 ${className}`}>
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          {title}
        </h3>
      </div>
      
      {/* Articles list */}
      <div className="p-6 space-y-4">
        {posts?.slice(0, maxItems).map((article) => (
          <Link 
            key={article.id} 
            href={`/${article.slug}`}
            className="group block"
          >
            <div className="bg-white/50 hover:bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/30 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.title}
              </h4>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {article.viewCount?.toLocaleString() || "0"} views
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {getTimeAgo(article.createdAt)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularSection;