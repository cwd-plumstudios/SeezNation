"use client";

// Paystack inline popup — see the plan's Phase 3 section for the full
// initiate/webhook flow. This page just kicks off the transaction.
export default function SubscribePage() {
  const handleSubscribe = async () => {
    const { data } = await fetch("/api/subscriptions/initiate", {
      method: "POST",
    }).then((r) => r.json());

    const PaystackPop = (await import("@paystack/inline-js")).default;
    const paystack = new PaystackPop();
    paystack.resumeTransaction(data.access_code);
  };

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="text-3xl font-bold">Subscribe</h1>
      <p className="mt-4 text-white/70">
        Unlock subscriber-only streams and downloads.
      </p>
      <button
        onClick={handleSubscribe}
        className="mt-6 rounded bg-white px-4 py-2 font-semibold text-black"
      >
        Subscribe now
      </button>
    </main>
  );
}
