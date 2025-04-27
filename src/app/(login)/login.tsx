"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Loader2 } from "lucide-react";
import { signInWithMagicLink } from "./action";
import { useActionState, useState } from "react";
import { ActionState } from "@/lib/auth/middleware";
import { createClient } from "../../utils/supabase/client";
import config from "../../config";
import { AuthListener } from "./AuthListener";

// デフォルトではサインインページ
export function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const [loading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const priceId = searchParams.get("priceId");
  const discountCode = searchParams.get("discountCode");

  //  Google サインインの処理
  const handleGoogleSignIn = () => {
    const supabase = createClient();
    const searchParams = new URLSearchParams(window.location.search);
  
    // URLの?redirect=/pushみたいなのを取る
    const redirect = searchParams.get("redirect") || "/leg"; // なかったら/leg
    const priceId = searchParams.get("priceId") || "";
    const discountCode = searchParams.get("discountCode") || "";
  
    // 最終的にログイン成功後、redirect先に飛ばす
    const redirectTo = `${config.domainName}/?redirect=${encodeURIComponent(
      redirect
    )}&priceId=${encodeURIComponent(priceId)}&discountCode=${encodeURIComponent(discountCode)}`;
  
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
  };
  

  // useActionState() はメール送信処理とその状態（成功/失敗）を管理。
  // MagicLink認証でメールアドレス二リンクが送られクリックするとログイン可能、パスワード不要
  const [magicLinkState, magicLinkAction, pending] = useActionState<
    ActionState,
    FormData
  >(signInWithMagicLink, { error: "", success: "" });

  return (
    <>
    <AuthListener />
    <div className="min-h-[100dvh]  bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mb-10">
        {/* <div className="flex justify-center">
          <SVGLogo />
        </div> */}

        <h1 className="text-2xl font-semibold tracking-tight text-center text-gray-900">
          {/* 表示内容が mode によって変わる */}
          {mode === "signin" ? "ログイン" : "新規作成"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {mode === "signin"
            ? "アカウントにログインして続行しましょう"
            : "こちらから新しいアカウントを使い始めましょう"}
        </p>

        <div className="mt-10">
          {magicLinkState?.success ? (
            // Magic Link 成功時の表示
            <div className="p-6 text-center bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">
                メールを確認してください
              </h3>
              <p className="mt-2 text-sm text-green-700">
                サインイン用のリンクをメールでお送りしました。
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* ユーザーがメールアドレスを入力して送信すると、Magic Link（メールでワンクリックログイン）が送られる */}
              <form action={magicLinkAction} className="space-y-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
                />
                <input type="hidden" name="priceId" value={priceId || ""} />
                <input
                  type="hidden"
                  name="discountCode"
                  value={discountCode || ""}
                />

                <Button
                  type="submit"
                  className="w-full h-12 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {pending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "メールアドレスで続行する"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="flex absolute inset-0 items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="flex relative justify-center">
                  <span className="px-4 text-sm text-gray-500 bg-gradient-to-b from-white to-gray-50">
                    or
                  </span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                className="w-full h-12 font-medium text-gray-700 bg-white rounded-lg border border-gray-200 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <div className="flex justify-center items-center">
                    <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Googleで続行する
                  </div>
                )}
              </Button>
            </div>
          )}

          {magicLinkState?.error && (
            <div className="mt-4 text-sm text-red-600">
              {magicLinkState.error}
            </div>
          )}

          <p className="mt-8 text-sm text-center text-gray-600">
            {mode === "signin"
              ? "当プラットフォームは初めてですか？"
              : "すでにアカウントをお持ちですか？"}
            <Link
              href={`${mode === "signin" ? "/sign-up" : "/sign-in"}${
                redirect ? `?redirect=${redirect}` : ""
              }${priceId ? `&priceId=${priceId}` : ""}`}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {mode === "signin" ? "アカウントを作成" : "ログイン"}
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
