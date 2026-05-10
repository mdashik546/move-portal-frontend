import PaymentSuccess from "@/components/modules/payment/PaymentSuccess";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<p>Loading...?</p>}>
      <PaymentSuccess />
    </Suspense>
  );
}
