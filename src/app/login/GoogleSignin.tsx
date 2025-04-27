"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { createClient } from "../utils/supabase/client";
import { Button } from "../components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";

// SuspenseBoundary component
const SuspenseBoundary = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GoogleSignin />
  </Suspense>
);

export default function GoogleSignin() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
        throw error;
      }
    } catch {
      toast({
        title: "もう一度試してください。",
        description: "Google でのログイン中にエラーが発生しました。",
        variant: "destructive",
      });
      setIsGoogleLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={signInWithGoogle}
      disabled={isGoogleLoading}
    >
      {isGoogleLoading ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2"
        />
      )}{" "}
      Googleで続行する
    </Button>
  );
}

export { SuspenseBoundary };
