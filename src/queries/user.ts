"use server";

import { createClient } from "../utils/supabase/server";
// ログインユーザーの情報を取得
export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return null;
  }

  return user;
};
