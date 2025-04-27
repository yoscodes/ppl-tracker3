import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "../../utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { error } = await (await supabase).auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // 開発環境と本番環境をうまく切り分けてリダイレクト
        // 開発環境（ローカル環境）なら、普通に origin（例：http://localhost:3000）にリダイレクト。
        return NextResponse.redirect(`${origin}${next}`);
        // 本番環境なら、ロードバランサを経由している可能性があるので、ヘッダー x-forwarded-host を使って正しい URL にリダイレクト。
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // 認証失敗時はエラーページへリダイレクト
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
