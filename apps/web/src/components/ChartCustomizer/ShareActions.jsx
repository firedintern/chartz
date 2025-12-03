import { Download, Twitter, Instagram, Copy, Upload } from "lucide-react";

export function ShareActions({
  onShareToGallery,
  onDownload,
  onShareTwitter,
  onShareInstagram,
  onCopyLink,
}) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm border border-gray-200 dark:border-[#333333] p-4">
      <h4 className="text-sm font-semibold font-poppins text-[#111827] dark:text-[#E0E0E0] mb-3">
        Share & Export
      </h4>
      <div className="space-y-2">
        <button
          onClick={onShareToGallery}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-b from-[#8B5CF6] to-[#7C3AED] text-white rounded-lg text-sm font-medium hover:from-[#7C3AED] hover:to-[#6D28D9] active:from-[#6D28D9] active:to-[#5B21B6] transition-all duration-200"
        >
          <Upload size={16} />
          Share to Gallery
        </button>

        <button
          onClick={onDownload}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-b from-[#FF8200] to-[#FF9C14] dark:from-[#FF8F1F] dark:to-[#FFA335] text-white rounded-lg text-sm font-medium hover:from-[#E56B00] hover:to-[#E5820C] dark:hover:from-[#FF8200] dark:hover:to-[#FF9C14] active:from-[#CC5500] active:to-[#CC7109] dark:active:from-[#E56B00] dark:active:to-[#E5820C] transition-all duration-200"
        >
          <Download size={16} />
          Download Chart
        </button>

        <button
          onClick={onShareTwitter}
          className="w-full flex items-center gap-3 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg text-sm font-medium hover:bg-[#1A91DA] active:bg-[#1681C7] transition-all duration-200"
        >
          <Twitter size={16} />
          Share to X (Twitter)
        </button>

        <button
          onClick={onShareInstagram}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#E4405F] via-[#F77737] to-[#F58529] text-white rounded-lg text-sm font-medium hover:opacity-90 active:opacity-80 transition-all duration-200"
        >
          <Instagram size={16} />
          Share to Instagram
        </button>

        <button
          onClick={onCopyLink}
          className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 dark:border-[#404040] text-[#374151] dark:text-[#E0E0E0] rounded-lg text-sm font-medium hover:bg-[#F9FAFB] dark:hover:bg-[#333333] active:bg-[#F3F4F6] dark:active:bg-[#404040] transition-all duration-200"
        >
          <Copy size={16} />
          Copy Link
        </button>
      </div>
    </div>
  );
}
