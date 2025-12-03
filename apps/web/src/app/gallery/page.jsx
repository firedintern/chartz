"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Clock, Trophy, Eye, ArrowUp, Star } from "lucide-react";
import Header from "@/components/Header";

export default function GalleryPage() {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("new");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGalleryCharts();
  }, [sortBy]);

  const fetchGalleryCharts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/gallery/list?sort=${sortBy}`);

      if (!response.ok) {
        throw new Error("Failed to fetch gallery charts");
      }

      const data = await response.json();
      if (data.success) {
        setCharts(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch charts");
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (chartId, e) => {
    e.stopPropagation();

    try {
      const response = await fetch(`/api/gallery/${chartId}/upvote`, {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setCharts((prev) =>
          prev.map((chart) =>
            chart.id === chartId
              ? { ...chart, upvotes: data.data.upvotes }
              : chart,
          ),
        );
      } else {
        // Already upvoted or error - just show message
        console.log(data.error);
      }
    } catch (err) {
      console.error("Error upvoting:", err);
    }
  };

  const handleChartClick = async (chart) => {
    // Track view
    try {
      await fetch(`/api/gallery/${chart.id}/view`, { method: "POST" });
    } catch (err) {
      console.error("Error tracking view:", err);
    }

    // Navigate to chart page
    window.location.href = `/chart/${chart.crypto_symbol.toLowerCase()}`;
  };

  const getGradient = (colorScheme) => {
    const gradients = {
      gradient1: "from-[#FF6B6B] to-[#4ECDC4]",
      gradient2: "from-[#A8E6CF] to-[#FFD3B6]",
      gradient3: "from-[#667EEA] to-[#764BA2]",
      gradient4: "from-[#FFA07A] to-[#FFE4B5]",
      gradient5: "from-[#667EEA] to-[#F093FB]",
    };
    return gradients[colorScheme] || gradients.gradient1;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#121212]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1B1F29] dark:text-[#E0E0E0] mb-3 font-instrument-sans">
            Community Gallery
          </h1>
          <p className="text-lg text-[#6E728B] dark:text-[#A0A0A0] font-instrument-sans">
            Discover amazing crypto charts created by the community
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSortBy("new")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
              sortBy === "new"
                ? "bg-[#FF7A00] dark:bg-[#FF8F1F] text-white"
                : "bg-white dark:bg-[#1E1E1E] text-[#6E728B] dark:text-[#A0A0A0] border border-[#E8EAEE] dark:border-[#333333] hover:border-[#FF7A00] dark:hover:border-[#FF8F1F]"
            }`}
          >
            <Clock className="w-4 h-4" />
            New
          </button>

          <button
            onClick={() => setSortBy("trending")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
              sortBy === "trending"
                ? "bg-[#FF7A00] dark:bg-[#FF8F1F] text-white"
                : "bg-white dark:bg-[#1E1E1E] text-[#6E728B] dark:text-[#A0A0A0] border border-[#E8EAEE] dark:border-[#333333] hover:border-[#FF7A00] dark:hover:border-[#FF8F1F]"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </button>

          <button
            onClick={() => setSortBy("top")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
              sortBy === "top"
                ? "bg-[#FF7A00] dark:bg-[#FF8F1F] text-white"
                : "bg-white dark:bg-[#1E1E1E] text-[#6E728B] dark:text-[#A0A0A0] border border-[#E8EAEE] dark:border-[#333333] hover:border-[#FF7A00] dark:hover:border-[#FF8F1F]"
            }`}
          >
            <Trophy className="w-4 h-4" />
            Top
          </button>
        </div>

        {/* Charts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E8EAEE] dark:border-[#333333] animate-pulse"
              >
                <div className="h-48 bg-[#F8FAFC] dark:bg-[#333333] rounded-lg mb-4"></div>
                <div className="h-6 bg-[#F8FAFC] dark:bg-[#333333] rounded mb-2"></div>
                <div className="h-4 bg-[#F8FAFC] dark:bg-[#333333] rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400">Error: {error}</p>
          </div>
        ) : charts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6E728B] dark:text-[#A0A0A0] text-lg">
              No charts in the gallery yet. Be the first to share one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {charts.map((chart) => (
              <div
                key={chart.id}
                onClick={() => handleChartClick(chart)}
                className="bg-white dark:bg-[#1E1E1E] rounded-2xl overflow-hidden border border-[#E8EAEE] dark:border-[#333333] hover:border-[#FF7A00] dark:hover:border-[#FF8F1F] transition-all duration-200 cursor-pointer hover:shadow-lg group"
              >
                {/* Featured Badge */}
                {chart.is_featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                    <Star className="w-3 h-3" fill="currentColor" />
                    Featured
                  </div>
                )}

                {/* Chart Preview */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${getGradient(chart.color_scheme)} p-6 flex items-center justify-center`}
                >
                  <div className="text-white text-center">
                    <div className="text-5xl font-bold mb-2">
                      {chart.chart_type === "line"
                        ? "📈"
                        : chart.chart_type === "area"
                          ? "📊"
                          : "📉"}
                    </div>
                    <div className="text-sm opacity-80 uppercase tracking-wider">
                      {chart.crypto_symbol} • {chart.time_range}
                    </div>
                  </div>
                </div>

                {/* Chart Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#1B1F29] dark:text-[#E0E0E0] mb-2 font-instrument-sans line-clamp-2">
                    {chart.title}
                  </h3>

                  {chart.description && (
                    <p className="text-sm text-[#6E728B] dark:text-[#A0A0A0] mb-3 line-clamp-2">
                      {chart.description}
                    </p>
                  )}

                  {/* Creator Info */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9C14] flex items-center justify-center text-white text-xs font-bold">
                      {chart.creator_name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#1B1F29] dark:text-[#E0E0E0] truncate">
                        {chart.creator_name || "Anonymous"}
                      </div>
                      {chart.creator_handle && (
                        <div className="text-xs text-[#6E728B] dark:text-[#A0A0A0] truncate">
                          @{chart.creator_handle}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E8EAEE] dark:border-[#333333]">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => handleUpvote(chart.id, e)}
                        className="flex items-center gap-1 text-[#6E728B] dark:text-[#A0A0A0] hover:text-[#FF7A00] dark:hover:text-[#FF8F1F] transition-colors group"
                      >
                        <ArrowUp className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
                        <span className="text-sm font-medium">
                          {chart.upvotes}
                        </span>
                      </button>

                      <div className="flex items-center gap-1 text-[#6E728B] dark:text-[#A0A0A0]">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{chart.views}</span>
                      </div>
                    </div>

                    <div className="text-xs text-[#6E728B] dark:text-[#A0A0A0]">
                      {new Date(chart.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');
        .font-instrument-sans {
          font-family: 'Instrument Sans', sans-serif;
        }
      `}</style>
    </div>
  );
}
