import VerifyEmail from "@/components/modules/auth/VerifyEmail";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
const VerifyEmailPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense fallback={<div>Loading...?</div>}>
          <VerifyEmail />
        </Suspense>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
