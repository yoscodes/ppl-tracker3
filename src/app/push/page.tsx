"use client";

import React, { useEffect, useState } from "react";
import RecordList from "../components/RecordList";
import { Record } from "../utils/interface";
import { createClient } from "../utils/supabase/client";
import AddButton from "../components/AddButton";
import { useUser } from "@supabase/auth-helpers-react";
import { deleteRecord } from "../utils/supabaseFunctions";
// import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

function PushPage() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useUser();
  // const router = useRouter(); // useRouterを利用

  const getRecords = async () => {
    if (!user) return;

    setLoading(true);

    const { data, error } = await createClient()
      .from("records")
      .select("*")
      .eq("user_id", user.id)
      .eq("category", "push")
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
  }, [user]); // userが変わったときに再度データを取得

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

    setIsSubmitting(true);
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

            category: "push",
            user_id: user.id,
          },
        ]);

      if (error) {
        console.error("登録エラー:", error.message);
        alert("登録に失敗しました");
        return;
      }

      await getRecords();
    } finally {
      setIsSubmitting(false);
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

  // ページのリロード処理
  const handleReload = () => {
    window.location.reload(); // 強制的にページをリロード
  };

  // ログインしていない状態で読み込み中のメッセージを表示しないように変更
  if (loading && !user) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col p-4">
        <p className="text-2xl font-bold text-gray-800 mb-4 text-center sm:text-3xl">
          あなたの成功の第一歩を踏み出しましょう！
        </p>
        <p className="text-lg text-gray-600 mb-8 text-center sm:text-xl">
          目標に向かって進む準備はできていますか？
        </p>
        <Button
          variant="contained" // ボタンのデザイン
          onClick={handleReload}
          sx={{
            backgroundColor: "	#F58220", // グリーンでポジティブな印象
            color: "white",
            padding: "12px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "8px", // 丸みをつけて柔らかい印象に
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // 軽い影をつけて浮き上がる感じ
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#E15A28", // ホバー時に色を少し変化
              transform: "scale(1.05)", // ホバー時に少し大きくなる
              boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)", // ホバー時に影を強く
            },
            "&:active": {
              transform: "scale(1)", // クリック時に元の大きさに戻る
            },
            width: "100%", // ボタンが親の幅いっぱいに広がる
            maxWidth: "400px", // 最大幅を設定
          }}
        >
          準備できた！
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 pb-15">
      <h1 className="text-lg font-bold mb-4">Push種目</h1>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <RecordList records={records} onDelete={handleDelete} />
      )}
      <div className="fixed bottom-20 right-6">
        <AddButton
          category="push"
          onAdd={handleAdd}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

export default PushPage;
