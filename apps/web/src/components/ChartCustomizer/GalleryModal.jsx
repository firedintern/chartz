import { X } from "lucide-react";

export function GalleryModal({
  showGalleryModal,
  setShowGalleryModal,
  galleryForm,
  setGalleryForm,
  shareError,
  shareSuccess,
  onSubmit,
  isSubmitting,
  symbol,
}) {
  if (!showGalleryModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#333333]">
          <h3 className="text-xl font-bold font-poppins text-[#111827] dark:text-[#E0E0E0]">
            Share to Gallery
          </h3>
          <button
            onClick={() => setShowGalleryModal(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#333333] rounded-lg transition-colors"
          >
            <X size={20} className="text-[#6B7280] dark:text-[#A0A0A0]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {shareSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-[#111827] dark:text-[#E0E0E0] mb-2">
                Shared Successfully!
              </h4>
              <p className="text-sm text-[#6B7280] dark:text-[#A0A0A0]">
                Your chart is now live in the gallery
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#6B7280] dark:text-[#A0A0A0] mb-4">
                Share your {symbol.toUpperCase()} chart with the community! Your
                chart will be visible to everyone in the gallery.
              </p>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-[#374151] dark:text-[#E0E0E0] mb-2">
                  Chart Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(e) =>
                    setGalleryForm({
                      ...galleryForm,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g., Bitcoin's Bullish Run in 2024"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#404040] rounded-lg bg-white dark:bg-[#2D2D2D] text-[#111827] dark:text-[#E0E0E0] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FF8200] dark:focus:ring-[#FF8F1F] focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#374151] dark:text-[#E0E0E0] mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={galleryForm.description}
                  onChange={(e) =>
                    setGalleryForm({
                      ...galleryForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Tell others what makes this chart special..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#404040] rounded-lg bg-white dark:bg-[#2D2D2D] text-[#111827] dark:text-[#E0E0E0] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FF8200] dark:focus:ring-[#FF8F1F] focus:border-transparent"
                />
              </div>

              {/* Creator Name */}
              <div>
                <label className="block text-sm font-medium text-[#374151] dark:text-[#E0E0E0] mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={galleryForm.creatorName}
                  onChange={(e) =>
                    setGalleryForm({
                      ...galleryForm,
                      creatorName: e.target.value,
                    })
                  }
                  placeholder="e.g., Alex Chen"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#404040] rounded-lg bg-white dark:bg-[#2D2D2D] text-[#111827] dark:text-[#E0E0E0] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FF8200] dark:focus:ring-[#FF8F1F] focus:border-transparent"
                />
              </div>

              {/* Social Handle */}
              <div>
                <label className="block text-sm font-medium text-[#374151] dark:text-[#E0E0E0] mb-2">
                  Twitter/X Handle (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-[#A0A0A0]">
                    @
                  </span>
                  <input
                    type="text"
                    value={galleryForm.creatorHandle}
                    onChange={(e) =>
                      setGalleryForm({
                        ...galleryForm,
                        creatorHandle: e.target.value.replace("@", ""),
                      })
                    }
                    placeholder="cryptotrader"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-[#404040] rounded-lg bg-white dark:bg-[#2D2D2D] text-[#111827] dark:text-[#E0E0E0] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FF8200] dark:focus:ring-[#FF8F1F] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Error Message */}
              {shareError && (
                <div className="p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-300">
                    {shareError}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowGalleryModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-[#404040] text-[#374151] dark:text-[#E0E0E0] rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#333333] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  disabled={!galleryForm.title.trim() || isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-b from-[#8B5CF6] to-[#7C3AED] text-white rounded-lg text-sm font-medium hover:from-[#7C3AED] hover:to-[#6D28D9] active:from-[#6D28D9] active:to-[#5B21B6] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sharing..." : "Share to Gallery"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
