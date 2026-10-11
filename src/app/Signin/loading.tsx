export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#009245] border-t-transparent animate-spin"></div>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800">লোড হচ্ছে...</h2>
          <p className="mt-1 text-xs text-gray-500">
            অনুগ্রহ করে অপেক্ষা করুন।
          </p>
        </div>
      </div>
    </div>
  );
}
