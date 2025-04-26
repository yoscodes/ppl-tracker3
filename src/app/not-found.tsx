// app/not-found.tsx
import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800">ページが見つかりません</h1>
      <p className="mt-4 text-gray-600">お探しのページは存在しないか、移動した可能性があります。</p>
      <Link href="/" className="mt-6 text-blue-500">ホームに戻る</Link>
    </div>
  );
};

export default NotFound;
