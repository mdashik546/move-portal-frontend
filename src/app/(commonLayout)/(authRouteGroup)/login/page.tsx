import LoginForm from "@/components/modules/auth/LoginForm";
export const dynamic = "force-dynamic";
interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginParams) {
  const params = await searchParams;
  const redirectPath = params.redirect;
  console.log(redirectPath, "redirectPath");
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm redirectPath={redirectPath} />
      </div>
    </div>
  );
}
