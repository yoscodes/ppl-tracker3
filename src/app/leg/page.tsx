"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RecordList from "../components/RecordList";
import { Record } from "@/utils/interface";
import { createClient } from "@/utils/supabase/client";
import AddButton from "../components/AddButton";
import { useUser } from "@supabase/auth-helpers-react";
import { deleteRecord } from "@/utils/supabaseFunctions";

function LegPage() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ 追加
  const router = useRouter();
  const user = useUser();

  const getRecords = async () => {
    if (!user) return;

    setLoading(true);

    const { data, error } = await createClient()
      .from("records")
      .select("*")
      .eq("user_id", user.id)
      .eq("category", "leg")
      .order("training_date", { ascending: false }); // 日付降順

    if (error) {
      console.error("データ取得エラー:", error.message);
      setLoading(false);
      return;
    }

    setRecords(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getRecords();
    }
  }, [user]);

  const handleAdd = async (formData: {
    category: string;
    date: string;
    weight1: number;
    reps1: number;
    weight2?: number;
    reps2?: number;
    weight3?: number;
    reps3?: number;
    weight4?: number;
    reps4?: number;
    weight5?: number;
    reps5?: number;
    weight6?: number;
    reps6?: number;
  }) => {
    if (!user) {
      alert("ユーザーがログインしていません");
      return;
    }

    setIsSubmitting(true); // ✅ 登録中状態にセット
    try {
      const { error } = await createClient()
        .from("records")
        .insert([
          {
            training_date: formData.date,
            menu: formData.category,
            weight1: formData.weight1,
            reps1: formData.reps1,
            weight2: formData.weight2,
            reps2: formData.reps2,
            weight3: formData.weight3,
            reps3: formData.reps3,
            weight4: formData.weight4,
            reps4: formData.reps4,
            weight5: formData.weight5,
            reps5: formData.reps5,
            weight6: formData.weight6,
            reps6: formData.reps6,

            category: "leg",
            user_id: user.id,
          },
        ]);

      if (error) {
        console.error("登録エラー:", error.message);
        alert("登録に失敗しました");
        return;
      }

      await getRecords(); // 新しいデータを取得してリストを更新
    } finally {
      setIsSubmitting(false); // ✅ 終了後に解除
    }
  };

  const handleDelete = async (recordId: string) => {
    const result = await deleteRecord(recordId);
    if (result) {
      await getRecords();
    } else {
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="p-6 pb-15">
      <h1 className="text-lg font-bold mb-4">Leg種目</h1>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <RecordList records={records} onDelete={handleDelete} />
      )}
      <div className="fixed bottom-20 right-6">
        <AddButton
          category="leg"
          supabase={createClient}
          onAdd={handleAdd}
          isSubmitting={isSubmitting} // ✅ 渡す
        />
      </div>
    </div>
  );
}

export default LegPage;
