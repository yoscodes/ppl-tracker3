"use client";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPassword } from "./action";

const formSchema = z.object({
  email: z.string().email(),
});

// The actual form component
function ForgotPasswordInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: decodeURIComponent(searchParams.get("email") ?? ""),
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await forgotPassword({
        email: data.email,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        router.push("/forgot-password/confirmation");
      }
    } catch {
      setServerError(
        "予期しないエラーが発生しました。もう一度お試しください。"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>パスワードのリセット</CardTitle>
          <CardDescription>
            パスワードをリセットするにはメールアドレスを入力してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {serverError && (
                <p className="text-red-500 text-sm mt-2">{serverError}</p>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    お待ちください
                  </>
                ) : (
                  "パスワードを忘れた場合"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-muted-foreground text-sm">
            パスワードを覚えていますか?{" "}
            <Link href="/login" className="underline">
              ログイン
            </Link>
          </div>
          <div className="text-muted-foreground text-sm">
            アカウントをお持ちでないですか?{" "}
            <Link href="/register" className="underline">
              新規登録
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

// Wrapping ForgotPasswordInner in Suspense to handle client-side logic
export default function ForgotPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordInner />
    </Suspense>
  );
}
