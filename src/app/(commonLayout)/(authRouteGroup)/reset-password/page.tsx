import ResetPasswordForm from "@/components/modules/auth/ResetPasswordForm";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div>Loading...?</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
