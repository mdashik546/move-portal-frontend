import ForgotPasswordForm from "@/components/modules/auth/ForgotPasswordForm";
export const dynamic = "force-dynamic";
const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
