// // import { getUser } from "../../../queries/user";
// import { createClient } from "../../../utils/supabase/server";
// import { NextResponse } from "next/server";

// // Supabase の OAuth ログイン後にリダイレクトと処理を行う
// export async function GET(request: Request) {
//   const requestUrl = new URL(request.url); // リクエストURLをパース
//   const code = requestUrl.searchParams.get("code"); // OAuthの認証コード
//   const encodedRedirectTo = requestUrl.searchParams.get("redirect") || "/app"; // リダイレクト先URL
//   // もし決済が関わる場合に、リダイレクト先に必要なパラメータとして含まれる情報
//   const priceId = decodeURIComponent(
//     requestUrl.searchParams.get("priceId") || "" // 商品の価格ID
//   );
//   // const discountCode = decodeURIComponent(
//   //   requestUrl.searchParams.get("discountCode") || "" // 割引コード
//   // );
//   const redirectTo = decodeURIComponent(encodedRedirectTo);

//   // Supabase との通信
//   const supabase = await createClient();

//   if (code) {
//     await supabase.auth.exchangeCodeForSession(code); // OAuthコードをセッションに交換
//     // const userData = await getUser(); // ユーザーデータの取得
//     // await getOrCreateUserAvatar(userData); // ユーザーのアバター画像の取得
//   }
//   // Set session cookie
//   /* ユーザーが商品を購入しようとした場合に、
//   価格IDと割引コードに基づいたチェックアウトセッションを生成 */
//   if (priceId && priceId !== "") {
//     // await createCheckoutSession({ priceId, discountCode });
//   } else {
//     /* ユーザーは認証後に指定されたリダイレクト先に遷移します。
//     requestUrl.origin はリクエストの元となるドメインを意味し、redirectTo はリダイレクト先のパス */
//     return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`);
//   }

//   // Successful authentication, redirect to the intended page
//   // Ensure we're using the correct origin
// }

import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

// Googleログイン認証が終わった後
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const encodedRedirectTo = requestUrl.searchParams.get("redirect") || "/push";
  const priceId = decodeURIComponent(
    requestUrl.searchParams.get("priceId") || ""
  );
  const redirectTo = decodeURIComponent(encodedRedirectTo);

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("セッション交換失敗:", error.message);
      // エラー時はエラーページかトップにリダイレクト
      return NextResponse.redirect(`${requestUrl.origin}/`);
    }
  }

  if (priceId && priceId !== "") {
    // ここに決済用の処理を書くなら書く（今はコメントアウトしてるからスルー）
  }

  // セッション交換が成功してたらリダイレクト
  return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`);
}
