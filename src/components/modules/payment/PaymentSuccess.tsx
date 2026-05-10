"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle2, Play, Home, ShieldCheck } from "lucide-react";
export const dynamic = "force-dynamic";
export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      toast.success("Payment verified successfully!");
    }
  }, [sessionId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      {/* Container */}
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-sm">
        
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Payment Successful
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Transaction completed. Your premium access is now active.
          </p>
        </div>

        {/* Status Details Card */}
        <div className="mt-8 space-y-3 rounded-xl bg-black/40 p-5 border border-zinc-800">
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-500">Status</span>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Activated
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-500">Plan Duration</span>
            <span className="text-xs font-bold text-zinc-200 uppercase">30 Days Access</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
            <span className="text-xs text-zinc-500">Order ID</span>
            <span className="text-[10px] font-mono text-zinc-400">
              {sessionId ? sessionId.slice(0, 16) : "ST-XXXXXXX"}...
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => router.push("/movies")}
            className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-sm font-bold text-black transition-colors hover:bg-amber-400"
          >
            <Play className="h-4 w-4 fill-current" />
            Watch Now
          </button>
          
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-transparent py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </button>
        </div>

        {/* Footer Support Info */}
        <p className="mt-8 text-center text-[11px] text-zinc-600 uppercase tracking-widest">
            Secured by Stripe Payment Gateway
        </p>
      </div>
    </div>
  );
}