import { redirect } from "next/navigation";
import { Login } from "../login";
import { getUser } from "@/queries/user";
export default async function SignInPage() {
  const user = await getUser(); // 現在のユーザー情報を確認
  if (user) {
    return redirect("/"); // すでにログイン済みならホームへリダイレクト
  }

  return <Login mode="signin" />; // それ以外はログインフォームを表示
}
