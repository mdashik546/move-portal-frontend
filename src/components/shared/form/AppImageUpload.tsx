/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  field: any;
  label: string;
};

export default function AppImageUpload({ field, label }: Props) {
  const file = field.state.value;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* Upload Box */}
      <div className="relative border-2  rounded-lg h-8 flex items-center justify-center cursor-pointer hover:border-black transition group">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              field.handleChange(selectedFile);
            }
          }}
        />

        <div className="text-center">
          {/* <div className="text-2xl group-hover:scale-110 transition">
            📤
          </div> */}
          <p className="text-sm text-gray-600">
            Click or drag to upload
          </p>
        </div>
      </div>

      {/* Preview */}
      {file && (
        <div className="relative mt-3 w-fit">
          {/* Image */}
          <Image
            src={URL.createObjectURL(file)}
            alt="preview"
            width={160}
            height={208}
            className="size-14 object-cover rounded-lg border shadow-sm"
          />

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => field.handleChange(null)}
            className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full shadow hover:bg-red-500 transition"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}