"use client";

import { useEffect } from "react";
import { createClient } from "../../utils/supabase/client"; // すでに使ってるやつ

export function AuthListener() {
  useEffect(() => {
    const supabase = createClient();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          // ログイン成功したらリダイレクト
          window.location.href = "/leg"; // ← 好きなページに変えてOK
        }
      }
    );

    // コンポーネントが消えたらリスナーも解除する
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return null; // 見た目には何も出さないコンポーネント
}
