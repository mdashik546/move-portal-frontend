"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <AlertTriangle size={36} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Something went wrong!
        </h2>

        <p className="text-gray-500 mt-3">
          An unexpected error occurred. Please try again.
        </p>

        {error?.digest && (
          <p className="text-xs text-gray-400 mt-2">Error ID: {error.digest}</p>
        )}

        <Button
          onClick={() => reset()}
          className="mt-6 flex items-center gap-2 w-full justify-center"
        >
          <RefreshCcw size={16} />
          Try Again
        </Button>
      </div>
    </div>
  );
}
