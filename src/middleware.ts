import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 認証が必要なパスにアクセスしようとしていて、ログインしていない場合
  const protectedPaths = ["/push", "/pull", "/leg"];
  const isProtected = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  if (isProtected && !user) {
    const redirectUrl = new URL("/login", request.url); // 未ログインだったら	/sign-inにリダイレクトする
    redirectUrl.searchParams.set("redirect", url.pathname); // 元のパスへ戻すため
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/push/:path*", "/pull/:path*", "/leg/:path*"],
};
