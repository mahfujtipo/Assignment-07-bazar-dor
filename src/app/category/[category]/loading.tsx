export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
        <p className="mt-4 text-lg font-bold text-green-700">
          পেজ লোড হচ্ছে...
        </p>
      </div>
    </div>
  );
}
