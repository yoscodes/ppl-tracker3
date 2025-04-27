"use client";

import { useEffect } from "react";
import { createClient } from "../../utils/supabase/client"; // いつものsupabase client

export function AuthListener() {
  useEffect(() => {
    const supabase = createClient();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_IN") {
          // URLのクエリパラメータから redirect を取る
          const params = new URLSearchParams(window.location.search);
          const redirect = params.get("redirect");

          // redirectパラメータがあればそこに、なければデフォルトで /leg に飛ばす
          window.location.href = redirect || "/leg";
        }
      }
    );

    // コンポーネントが消えたらリスナーも解除
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return null;
}
