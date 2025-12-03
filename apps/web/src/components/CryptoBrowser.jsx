import {
  Search,
  ChevronDown,
  Info,
  TrendingUp,
  Palette,
  Share2,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export default function CryptoBrowser() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch cryptocurrency data using react-query
  const {
    data: cryptoResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cryptocurrencies", searchTerm],
    queryFn: async () => {
      const url = new URL("/api/crypto/list", window.location.origin);
      if (searchTerm) {
        url.searchParams.set("search", searchTerm);
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch cryptocurrencies");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  // Extract crypto data from API response
  const cryptoData = useMemo(() => {
    if (!cryptoResponse?.success || !cryptoResponse?.data) {
      return [];
    }

    return cryptoResponse.data.map((crypto) => ({
      id: crypto.symbol,
      name: crypto.name,
      symbol: crypto.symbol,
      logo: crypto.logo_url || "https://via.placeholder.com/40",
      price: `$${parseFloat(crypto.current_price || 0).toLocaleString()}`,
      change: `${crypto.price_change_24h >= 0 ? "+" : ""}${parseFloat(crypto.price_change_24h || 0).toFixed(2)}%`,
      isPositive: crypto.price_change_24h >= 0,
      volume: `$${(crypto.volume_24h || 0).toLocaleString()}`,
      marketCap: `$${(crypto.market_cap || 0).toLocaleString()}`,
      supply: `${(crypto.circulating_supply || 0).toLocaleString()} ${crypto.symbol}`,
    }));
  }, [cryptoResponse]);

  // Filter data based on search term
  const filteredData = cryptoData;

  const handleCreateChart = (crypto) => {
    // Navigate to chart customization page
    window.location.href = `/chart/${crypto.symbol.toLowerCase()}`;
  };

  // Loading state component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF8200] dark:border-[#FF8F1F] border-t-transparent mb-4"></div>
      <h3 className="text-lg font-medium font-poppins text-[#111827] dark:text-[#E0E0E0] mb-2">
        Loading cryptocurrency data...
      </h3>
      <p className="text-sm font-poppins text-[#6B7280] dark:text-[#A0A0A0] text-center">
        Please wait while we fetch the latest prices
      </p>
    </div>
  );

  // Empty search results state
  const EmptySearchState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 bg-[#F3F4F6] dark:bg-[#404040] rounded-full flex items-center justify-center mb-4">
        <Search size={24} className="text-[#6B7280] dark:text-[#A0A0A0]" />
      </div>
      <h3 className="text-lg font-medium font-poppins text-[#111827] dark:text-[#E0E0E0] mb-2">
        No cryptocurrencies found
      </h3>
      <p className="text-sm font-poppins text-[#6B7280] dark:text-[#A0A0A0] text-center max-w-md">
        We couldn't find any cryptocurrencies matching "{searchTerm}". Try
        adjusting your search terms or browse all available coins.
      </p>
    </div>
  );

  // No data state
  const NoDataState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 bg-[#F3F4F6] dark:bg-[#404040] rounded-full flex items-center justify-center mb-4">
        <TrendingUp size={24} className="text-[#6B7280] dark:text-[#A0A0A0]" />
      </div>
      <h3 className="text-lg font-medium font-poppins text-[#111827] dark:text-[#E0E0E0] mb-2">
        No cryptocurrency data available
      </h3>
      <p className="text-sm font-poppins text-[#6B7280] dark:text-[#A0A0A0] text-center max-w-md">
        Cryptocurrency data is currently unavailable. Please try again later or
        check your connection.
      </p>
    </div>
  );

  return (
    <div>
      {/* Header Section - Outside the card */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Page Title Block */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-[28px] font-semibold font-poppins text-[#111827] dark:text-[#E0E0E0] mb-1.5">
              Browse Cryptocurrencies
            </h1>
            <p className="text-sm font-poppins text-[#6B7280] dark:text-[#A0A0A0]">
              Select any cryptocurrency to create beautiful, customizable charts
              for sharing
            </p>
          </div>

          {/* Featured Chart Gallery Preview */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#D1D5DB] dark:border-[#404040] text-[#374151] dark:text-[#E0E0E0] rounded-full text-sm font-medium h-9 min-w-[100px] hover:bg-[#F9FAFB] dark:hover:bg-[#333333] hover:border-[#9CA3AF] dark:hover:border-[#555555] active:bg-[#F3F4F6] dark:active:bg-[#404040] transition-all duration-200">
              <TrendingUp size={16} />
              Trending Charts
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#D1D5DB] dark:border-[#404040] text-[#374151] dark:text-[#E0E0E0] rounded-full text-sm font-medium h-9 min-w-[100px] hover:bg-[#F9FAFB] dark:hover:bg-[#333333] hover:border-[#9CA3AF] dark:hover:border-[#555555] active:bg-[#F3F4F6] dark:active:bg-[#404040] transition-all duration-200">
              <Share2 size={16} />
              Popular Shares
            </button>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm border border-gray-200 dark:border-[#333333] overflow-hidden">
        {/* Search Section */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-[#333333]">
          {/* Search Cryptos Header */}
          <h2 className="text-lg font-medium font-poppins text-[#111827] dark:text-[#E0E0E0] mb-4">
            Search cryptocurrencies
          </h2>

          {/* Tools Row */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="flex items-center bg-[#F7F9FB] dark:bg-[#333333] border border-[#E5E7EB] dark:border-[#404040] rounded-full px-3 py-2 w-full lg:min-w-[210px] lg:flex-1 lg:max-w-[314px]">
              <Search
                size={18}
                className="text-[#6B7280] dark:text-[#A0A0A0] mr-3 flex-shrink-0"
              />
              <input
                type="text"
                placeholder="Search cryptocurrency name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm font-poppins text-[#111827] dark:text-[#E0E0E0] placeholder-[#6B7280] dark:placeholder-[#A0A0A0] w-full"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-3 justify-end">
              <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#333333] border border-[#E5E7EB] dark:border-[#404040] rounded-full text-sm font-medium font-poppins text-[#4B5563] dark:text-[#E0E0E0] min-w-[100px] hover:bg-[#F9FAFB] dark:hover:bg-[#404040] hover:border-[#9CA3AF] dark:hover:border-[#555555] active:bg-[#F3F4F6] dark:active:bg-[#555555] transition-all duration-200">
                Market Cap
                <ChevronDown size={16} />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#333333] border border-[#E5E7EB] dark:border-[#404040] rounded-full text-sm font-medium font-poppins text-[#4B5563] dark:text-[#E0E0E0] min-w-[80px] hover:bg-[#F9FAFB] dark:hover:bg-[#404040] hover:border-[#9CA3AF] dark:hover:border-[#555555] active:bg-[#F3F4F6] dark:active:bg-[#555555] transition-all duration-200">
                All
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Table Content or Empty States */}
        {isLoading ? (
          <LoadingState />
        ) : cryptoData.length === 0 ? (
          <NoDataState />
        ) : filteredData.length === 0 && searchTerm ? (
          <EmptySearchState />
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="block sm:hidden">
              {filteredData.map((crypto) => (
                <div
                  key={crypto.id}
                  className="border-b border-[#F1F5F9] dark:border-[#333333] p-4 hover:bg-[#F9FAFB] dark:hover:bg-[#333333]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img
                        src={crypto.logo}
                        alt={crypto.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium font-poppins text-[#111827] dark:text-[#E0E0E0]">
                            {crypto.name}
                          </span>
                          <span className="inline-block bg-[#F3F4F6] dark:bg-[#404040] text-[#374151] dark:text-[#E0E0E0] text-xs font-semibold font-poppins px-2 py-1 rounded">
                            {crypto.symbol}
                          </span>
                        </div>
                        <div className="text-xs font-poppins text-[#6B7280] dark:text-[#A0A0A0]">
                          {crypto.price}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`text-sm font-medium font-poppins ${
                          crypto.isPositive
                            ? "text-[#22C55E]"
                            : "text-[#EF4444]"
                        }`}
                      >
                        {crypto.change}
                      </div>
                      <button
                        onClick={() => handleCreateChart(crypto)}
                        className="flex items-center gap-1 px-3 py-1 bg-gradient-to-b from-[#FF8200] to-[#FF9C14] dark:from-[#FF8F1F] dark:to-[#FFA335] text-white rounded-full text-xs font-medium hover:from-[#E56B00] hover:to-[#E5820C] dark:hover:from-[#FF8200] dark:hover:to-[#FF9C14] active:from-[#CC5500] active:to-[#CC7109] dark:active:from-[#E56B00] dark:active:to-[#E5820C] transition-all duration-200"
                      >
                        <Palette size={12} />
                        Chart
                      </button>
                    </div>
                  </div>
                  <div className="text-xs font-poppins text-[#6B7280] dark:text-[#A0A0A0]">
                    Market Cap: {crypto.marketCap}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="bg-[#F7F9FB] dark:bg-[#333333]">
                    <th className="text-left py-3.5 px-4 lg:px-6 text-sm font-medium font-poppins text-[#4B5563] dark:text-[#A0A0A0]">
                      Cryptocurrency
                    </th>
                    <th className="text-right py-3.5 px-4 lg:px-6 text-sm font-medium font-poppins text-[#4B5563] dark:text-[#A0A0A0]">
                      Price
                    </th>
                    <th className="text-right py-3.5 px-4 lg:px-6 text-sm font-medium font-poppins text-[#4B5563] dark:text-[#A0A0A0]">
                      24h Change
                    </th>
                    <th className="text-right py-3.5 px-4 lg:px-6 text-sm font-medium font-poppins text-[#4B5563] dark:text-[#A0A0A0] hidden lg:table-cell">
                      <div className="flex items-center justify-end gap-1">
                        <Info
                          size={16}
                          className="text-[#4B5563] dark:text-[#A0A0A0]"
                        />
                        Market Cap
                      </div>
                    </th>
                    <th className="text-center py-3.5 px-4 lg:px-6 text-sm font-medium font-poppins text-[#4B5563] dark:text-[#A0A0A0]">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filteredData.map((crypto) => (
                    <tr
                      key={crypto.id}
                      className="border-b border-[#F1F5F9] dark:border-[#333333] hover:bg-[#F9FAFB] dark:hover:bg-[#333333] h-14"
                    >
                      {/* Name Column */}
                      <td className="py-4 px-4 lg:px-6">
                        <div className="flex items-center">
                          <img
                            src={crypto.logo}
                            alt={crypto.name}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3"
                          />
                          <span className="inline-block bg-[#F3F4F6] dark:bg-[#404040] text-[#374151] dark:text-[#E0E0E0] text-xs font-semibold font-poppins px-2 py-1 rounded mr-2 sm:mr-2.5">
                            {crypto.symbol}
                          </span>
                          <span className="text-sm font-medium font-poppins text-[#111827] dark:text-[#E0E0E0] truncate">
                            {crypto.name}
                          </span>
                        </div>
                      </td>

                      {/* Price Column */}
                      <td className="py-4 px-4 lg:px-6 text-right">
                        <span className="text-sm font-medium font-poppins text-[#111827] dark:text-[#E0E0E0]">
                          {crypto.price}
                        </span>
                      </td>

                      {/* Change Column */}
                      <td className="py-4 px-4 lg:px-6 text-right">
                        <span
                          className={`text-sm font-medium font-poppins ${
                            crypto.isPositive
                              ? "text-[#22C55E]"
                              : "text-[#EF4444]"
                          }`}
                        >
                          {crypto.change}
                        </span>
                      </td>

                      {/* Market Cap Column */}
                      <td className="py-4 px-4 lg:px-6 text-right hidden lg:table-cell">
                        <span className="text-sm font-poppins text-[#374151] dark:text-[#A0A0A0]">
                          {crypto.marketCap}
                        </span>
                      </td>

                      {/* Action Column */}
                      <td className="py-4 px-4 lg:px-6 text-center">
                        <button
                          onClick={() => handleCreateChart(crypto)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-[#FF8200] to-[#FF9C14] dark:from-[#FF8F1F] dark:to-[#FFA335] text-white rounded-full text-sm font-medium hover:from-[#E56B00] hover:to-[#E5820C] dark:hover:from-[#FF8200] dark:hover:to-[#FF9C14] active:from-[#CC5500] active:to-[#CC7109] dark:active:from-[#E56B00] dark:active:to-[#E5820C] transition-all duration-200 mx-auto"
                        >
                          <Palette size={16} />
                          Create Chart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Poppins Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
        .font-poppins {
          font-family: 'Poppins', 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}
