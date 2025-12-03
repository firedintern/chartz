import { Search, Bell, ChevronDown, Palette } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-[#1E1E1E] border-b border-[#E8EAEE] dark:border-[#333333] sticky top-0 z-50">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left cluster - Logo and Navigation */}
        <div className="flex items-center">
          {/* Brand logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Palette className="h-6 w-6 text-[#FF7A00] dark:text-[#FF8F1F]" />
              <span className="text-xl font-bold font-instrument-sans text-[#FF7A00] dark:text-[#FF8F1F]">
                Chartz
              </span>
            </div>
          </div>

          {/* Primary navigation - desktop */}
          <nav className="hidden lg:flex items-center ml-8 space-x-8">
            <a
              href="/"
              className="font-instrument-sans text-base font-medium text-[#FF7A00] dark:text-[#FF8F1F] underline decoration-2 underline-offset-4 decoration-[#FF7A00] dark:decoration-[#FF8F1F] hover:text-[#E56B00] dark:hover:text-[#FF7A00] transition-colors duration-200"
            >
              Browse
            </a>
            <a
              href="/gallery"
              className="font-instrument-sans text-base text-[#6E728B] dark:text-[#A0A0A0] hover:text-[#1B1F29] dark:hover:text-[#E0E0E0] transition-colors duration-200 hover:underline decoration-2 underline-offset-4"
            >
              Gallery
            </a>
            <a
              href="#"
              className="font-instrument-sans text-base text-[#6E728B] dark:text-[#A0A0A0] hover:text-[#1B1F29] dark:hover:text-[#E0E0E0] transition-colors duration-200 hover:underline decoration-2 underline-offset-4"
            >
              My Charts
            </a>
          </nav>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden ml-3 sm:ml-5 p-2 hover:bg-[#F8FAFC] dark:hover:bg-[#333333] active:bg-[#F1F5F9] dark:active:bg-[#404040] transition-colors duration-200 rounded-md"
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 bg-[#2E3344] dark:bg-[#E0E0E0] mb-1 transition-transform duration-200 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-[#2E3344] dark:bg-[#E0E0E0] mb-1 transition-opacity duration-200 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-[#2E3344] dark:bg-[#E0E0E0] transition-transform duration-200 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></div>
          </button>
        </div>

        {/* Right cluster - Search, Create Chart Button */}
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          {/* Search component */}
          <div className="relative hidden sm:block">
            <div className="flex items-center bg-[#F8FAFC] dark:bg-[#333333] border border-[#E1E4EA] dark:border-[#404040] rounded-full px-4 py-2 w-64 md:w-80 lg:w-96 focus-within:border-[#FF7A00] dark:focus-within:border-[#FF8F1F] focus-within:bg-white dark:focus-within:bg-[#404040] transition-all duration-200">
              <Search className="w-5 h-5 text-[#6E728B] dark:text-[#A0A0A0] mr-3" />
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                className="bg-transparent outline-none text-base font-instrument-sans text-[#2E3344] dark:text-[#E0E0E0] placeholder-[#6E728B] dark:placeholder-[#A0A0A0] w-full"
              />
            </div>
          </div>

          {/* Mobile search button */}
          <button
            className="sm:hidden w-10 h-10 rounded-full border border-[#E1E4EA] dark:border-[#404040] bg-white dark:bg-[#333333] flex items-center justify-center hover:border-[#FF7A00] dark:hover:border-[#FF8F1F] hover:bg-[#FFF7F0] dark:hover:bg-[#404040] focus:border-[#FF7A00] dark:focus:border-[#FF8F1F] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] dark:focus:ring-[#FF8F1F] focus:ring-offset-2 active:bg-[#FFEBE0] dark:active:bg-[#555555] transition-all duration-200"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-[#2E3344] dark:text-[#E0E0E0]" />
          </button>

          {/* Create Chart Button */}
          <button
            onClick={() => (window.location.href = "/chart/btc")}
            className="px-4 py-2 bg-gradient-to-b from-[#FF8200] to-[#FF9C14] dark:from-[#FF8F1F] dark:to-[#FFA335] text-white rounded-full text-sm font-medium h-9 min-w-[120px] hover:from-[#E56B00] hover:to-[#E5820C] dark:hover:from-[#FF8200] dark:hover:to-[#FF9C14] active:from-[#CC5500] active:to-[#CC7109] dark:active:from-[#E56B00] dark:active:to-[#E5820C] transition-all duration-200 hidden sm:block"
          >
            Create Chart
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#1E1E1E] border-t border-[#E8EAEE] dark:border-[#333333]">
          <nav className="px-4 py-4 space-y-4">
            {/* Mobile Search Bar */}
            <div className="sm:hidden mb-4">
              <div className="flex items-center bg-[#F8FAFC] dark:bg-[#333333] border border-[#E1E4EA] dark:border-[#404040] rounded-full px-4 py-3 focus-within:border-[#FF7A00] dark:focus-within:border-[#FF8F1F] focus-within:bg-white dark:focus-within:bg-[#404040] transition-all duration-200">
                <Search className="w-5 h-5 text-[#6E728B] dark:text-[#A0A0A0] mr-3" />
                <input
                  type="text"
                  placeholder="Search cryptocurrencies..."
                  className="bg-transparent outline-none text-base font-instrument-sans text-[#2E3344] dark:text-[#E0E0E0] placeholder-[#6E728B] dark:placeholder-[#A0A0A0] w-full"
                />
              </div>
            </div>

            {/* Create Chart Button - Mobile */}
            <button
              onClick={() => (window.location.href = "/chart/btc")}
              className="w-full px-4 py-3 bg-gradient-to-b from-[#FF8200] to-[#FF9C14] dark:from-[#FF8F1F] dark:to-[#FFA335] text-white rounded-full text-sm font-medium hover:from-[#E56B00] hover:to-[#E5820C] dark:hover:from-[#FF8200] dark:hover:to-[#FF9C14] active:from-[#CC5500] active:to-[#CC7109] dark:active:from-[#E56B00] dark:active:to-[#E5820C] transition-all duration-200 sm:hidden mb-4"
            >
              Create Chart
            </button>

            {/* Navigation Links */}
            <a
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-instrument-sans text-lg font-medium text-[#FF7A00] dark:text-[#FF8F1F] hover:text-[#E56B00] dark:hover:text-[#FF7A00] transition-colors duration-200 py-2 border-b border-[#F1F5F9] dark:border-[#333333]"
            >
              Browse
            </a>
            <a
              href="/gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-instrument-sans text-lg text-[#6E728B] dark:text-[#A0A0A0] hover:text-[#1B1F29] dark:hover:text-[#E0E0E0] transition-colors duration-200 py-2 border-b border-[#F1F5F9] dark:border-[#333333]"
            >
              Gallery
            </a>
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-instrument-sans text-lg text-[#6E728B] dark:text-[#A0A0A0] hover:text-[#1B1F29] dark:hover:text-[#E0E0E0] transition-colors duration-200 py-2"
            >
              My Charts
            </a>
          </nav>
        </div>
      )}

      {/* Google Font - Instrument Sans */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500&display=swap');
        .font-instrument-sans {
          font-family: 'Instrument Sans', sans-serif;
          letter-spacing: -0.025em;
          line-height: 1.25;
        }
      `}</style>
    </header>
  );
}
