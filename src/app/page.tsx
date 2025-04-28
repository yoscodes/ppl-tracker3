"use client";

import Link from "next/link";
import CalendarView from "./components/CalendarView";
import RecentRecords from "./components/RecentRecords";
import BodyPartStats from "./components/BodyPartStats";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUser();
  const router = useRouter(); // 追加！

  // 🔥 ログイン後に1回だけrefreshを実行
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasReloaded = sessionStorage.getItem("hasReloaded-home");

      if (user && !hasReloaded) {
        sessionStorage.setItem("hasReloaded-home", "true");
        router.refresh(); // 修正！リロードじゃなくrefreshに
      }
    }
  }, [user, router]); // `router` も依存に入れると安全（Next公式推奨）

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      {/* ヘッダー */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          PPL-tracker
        </h1>
        <p className="text-gray-600 mt-3 text-base sm:text-lg">
          追い込んだ分だけ、結果はついてくる。
          <br className="sm:hidden" />
          PPLで限界を超えよう。
        </p>
      </header>

      {/* PPL法とは */}
      <section className="max-w-3xl mx-auto mb-12 px-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          PPL法とは？
        </h2>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-base leading-relaxed">
            <li>PUSH（押す）、PULL（引く）、LEG（脚）で3分割</li>
            <li>1部位あたり週2〜3回狙える、高頻度・高ボリュームな分割法</li>
            <li>中〜上級者が筋肥大を最大化するための王道ルーティン</li>
          </ul>
        </div>
      </section>

      {/* ワークアウト分類 */}
      <section className="max-w-3xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          始めましょう
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              href: "/push",
              emoji: "💪🔥",
              title: "Push（押す）",
              desc: "胸・肩・三頭を徹底的に追い込む日。",
              from: "from-pink-300",
              to: "to-pink-400",
            },
            {
              href: "/pull",
              emoji: "🧲💥",
              title: "Pull（引く）",
              desc: "背中・二頭を限界まで引き倒す日。",
              from: "from-blue-300",
              to: "to-blue-400",
            },
            {
              href: "/leg",
              emoji: "🏃⚡️",
              title: "Leg（脚）",
              desc: "脚トレからは逃げられない。",
              from: "from-green-300",
              to: "to-green-400",
            },
          ].map(({ href, emoji, title, desc, from, to }) => (
            <Link key={href} href={href} passHref>
              <div
                className={`bg-gradient-to-br ${from} ${to} p-6 rounded-2xl shadow 
                transition-transform duration-200 
                hover:scale-105 hover:shadow-lg 
                ring-1 ring-gray-200 cursor-pointer text-center`}
              >
                <div className="text-5xl mb-3 animate-bounce-slow">{emoji}</div>
                <div className="font-semibold text-gray-800 text-lg">
                  {title}
                </div>
                <p className="text-sm text-gray-600 mt-1">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 成長記録 */}
      <section className="min-h-screen bg-gray-50 px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          あなたの成長記録
        </h2>
        <div className="space-y-12">
          <RecentRecords />
          <BodyPartStats />
          <CalendarView />
        </div>
      </section>

      {/* トレーニングTips */}
      <section className="max-w-3xl mx-auto mb-12 px-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          トレーニングTips
        </h2>
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
          {/* フォーム重視 */}
          <div className="text-gray-700 leading-relaxed flex flex-col sm:flex-row items-start space-y-3 sm:space-x-3 sm:space-y-0">
            <div className="text-3xl text-yellow-500">💡</div>
            <div>
              <strong className="text-lg">フォーム重視</strong>
              ：重さよりも正しいフォームを優先しよう。ケガの予防にもなる。
            </div>
          </div>

          {/* 継続がカギ */}
          <div className="text-gray-700 leading-relaxed flex flex-col sm:flex-row items-start space-y-3 sm:space-x-3 sm:space-y-0">
            <div className="text-3xl text-blue-500">🔁</div>
            <div>
              <strong className="text-lg">継続がカギ</strong>
              ：毎回全力じゃなくてOK。継続して習慣化することが最重要！
            </div>
          </div>

          {/* 食事もトレーニングの一部 */}
          <div className="text-gray-700 leading-relaxed flex flex-col sm:flex-row items-start space-y-3 sm:space-x-3 sm:space-y-0">
            <div className="text-3xl text-green-500">🍽️</div>
            <div>
              <strong className="text-lg">食事もトレーニングの一部</strong>
              ：タンパク質と睡眠をしっかり確保。
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          よくある質問（FAQ）
        </h2>
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800">
              Q. PPLの順番はどうすればいい？
            </h3>
            <p className="text-gray-700 mt-1">
              A. 一般的にはPush → Pull →
              Legの順で、1日休んでまた繰り返します。疲労度に合わせて調整してOK。
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              Q. 初心者でも大丈夫？
            </h3>
            <p className="text-gray-700 mt-1">
              A. もちろんOK！自分のレベルに合わせて種目や重量を選びましょう。
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              Q. 毎回同じメニューでもいい？
            </h3>
            <p className="text-gray-700 mt-1">
              A.
              同じメニューでもOKですが、数週間ごとに少しずつ変化をつけるとより効果的です。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
