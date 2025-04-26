// components/RecentRecords.tsx(最近の記録)
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";
import { Record } from "@/utils/interface";

export default function RecentRecords() {
  const user = useUser();
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  //   ログインユーザーのみに絞る（user_id）
  useEffect(() => {
    const fetchRecords = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await createClient()
        .from("records")
        .select("*")
        .eq("user_id", user.id)
        .order("training_date", { ascending: false })
        .limit(3);

      if (!error && data) setRecords(data);
      setLoading(false);
    };

    fetchRecords();
  }, [user]);

  if (!user) return null;

  return (
    <section className="max-w-3xl mx-auto mb-12">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        最近の記録
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">読み込み中...</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-500">まだ記録がありません。</p>
      ) : (
        <ul className="space-y-4">
          {records.map((record) => (
            <li
              key={record.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all ring-1 ring-gray-200"
            >
              <div className="flex justify-between text-sm text-gray-600">
                <span>{record.menu}</span>
                <span>
                  {new Date(record.training_date).toLocaleDateString("ja-JP", {
                    // year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "short",
                  })}
                </span>
              </div>

              <div className="mt-4 text-gray-800 text-sm space-y-2">
                {[1, 2, 3, 4, 5, 6].map((i) => {
                  const weight = record[`weight${i}` as keyof Record];
                  const reps = record[`reps${i}` as keyof Record];

                  if (weight != null && reps != null) {
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-gray-400">🏋️‍♂️ Set {i}</span>
                        <span>
                          {weight}kg × {reps}回
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
