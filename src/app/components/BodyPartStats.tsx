"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

// Supabase クライアントの作成
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 円グラフの色設定
const COLORS = ["#FF4B00", "#005AFF", "#03AF7A"]; // blue, green, amber

export default function WorkoutStats() {
  const [data, setData] = useState([
    { name: "Push", value: 0 },
    { name: "Pull", value: 0 },
    { name: "Leg", value: 0 },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        setLoading(true);
        const thirtyDaysAgo = new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString();

        const { data: records, error } = await supabase
          .from("records")
          .select("category, training_date")
          .gte("training_date", thirtyDaysAgo);

        if (error) throw new Error(error.message);

        const counts = { push: 0, pull: 0, leg: 0 };

        for (const record of records ?? []) {
          const cat = record.category?.toLowerCase();
          if (cat in counts) {
            counts[cat as keyof typeof counts]++;
          }
        }

        setData([
          { name: "Push", value: counts.push },
          { name: "Pull", value: counts.pull },
          { name: "Leg", value: counts.leg },
        ]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`エラー: ${err.message}`);
        } else {
          setError("データの取得に失敗しました。再試行してください。");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto my-12 px-4">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
          部位別記録数（直近30日）
        </h2>
        <p className="text-center text-gray-500">データを読み込み中...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-3xl mx-auto my-12 px-4">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
          部位別記録数（直近30日）
        </h2>
        <p className="text-center text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto my-12 px-4">
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
        部位別記録数（直近30日）
      </h2>
      <div className="bg-white rounded-2xl shadow p-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            {/* グラフに色とカテゴリー名が示される */}
            <Legend verticalAlign="top" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
