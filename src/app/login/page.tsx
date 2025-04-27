import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await (await supabase).auth.getUser();
  if (data.user) {
    redirect("/leg");
  }

  return <LoginForm />;
}