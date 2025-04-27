"use server";

import { z } from "zod";

import { createClient } from "../utils/supabase/server";
// import { updateSession } from "../utils/supabase/middleware";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const forgotPassword = async ({ email }: { email: string }) => {
  const forgotPasswordValidation = forgotPasswordSchema.safeParse({
    email,
  });

  if (!forgotPasswordValidation.success) {
    return {
      error: true,
      message:
        forgotPasswordValidation.error.issues[0]?.message ??
        "エラーが発生しました",
    };
  }

  // supabase authentication from here
  const supabase = createClient();

  const { error } = await (await supabase).auth.resetPasswordForEmail(email);

  console.log("err: ", error);
  // if (error === null) {
  //   return {
  //     error: true,
  //     message: "No such email registered",
  //   };
  // }

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  // User successfully found
  return {
    success: true,
    message:
      "アカウントが存在する場合は、パスワードリセットメールが送信されています。受信トレイをご確認ください。",
  };
};
