"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatUsPhone, normalizeUsPhone } from "@/lib/phone";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type SignInFormProps = { configured: boolean };

export function SignInForm({ configured }: SignInFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeUsPhone(phone);
    if (!normalized) {
      setError("Enter a valid U.S. mobile number, including the area code.");
      return;
    }

    setPending(true);
    setError(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: authError } = await supabase.auth.signInWithOtp({
        phone: normalized,
        options: { shouldCreateUser: true },
      });
      if (authError) throw authError;
      setPhone(normalized);
      setStep("code");
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to send the code.",
      );
    } finally {
      setPending(false);
    }
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code from the text message.");
      return;
    }

    setPending(true);
    setError(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: authError } = await supabase.auth.verifyOtp({
        phone,
        token: code,
        type: "sms",
      });
      if (authError) throw authError;
      router.replace("/marketplace");
      router.refresh();
    } catch (verificationError) {
      setError(
        verificationError instanceof Error
          ? verificationError.message
          : "The verification code was not accepted.",
      );
    } finally {
      setPending(false);
    }
  }

  if (step === "code") {
    return (
      <form className="mt-8 space-y-5" onSubmit={verifyCode}>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-950"
          onClick={() => {
            setStep("phone");
            setCode("");
            setError(null);
          }}
        >
          <ArrowLeft className="size-4" /> Change number
        </button>
        <div className="space-y-2">
          <Label htmlFor="code">Verification code</Label>
          <Input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
            autoFocus
          />
          <p className="text-sm text-stone-500">Sent to {formatUsPhone(phone)}</p>
        </div>
        {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
        <Button className="w-full" size="lg" disabled={pending}>
          {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
          Verify and continue
        </Button>
      </form>
    );
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={requestCode}>
      <div className="space-y-2">
        <Label htmlFor="phone">Mobile number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(310) 555-0182"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          disabled={!configured}
          autoFocus
        />
      </div>
      {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
      <Button className="w-full" size="lg" disabled={!configured || pending}>
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
        Text me a code
      </Button>
    </form>
  );
}
