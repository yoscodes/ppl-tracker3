"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RecordFormModal from "./RecordFormModel";

type Props = {
  supabase: any;
  onAdd: (formData: {
    date: string;
    category: string;
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
  }) => Promise<void>;
  category: "push" | "pull" | "leg";
  isSubmitting: boolean; // ✅ 追加
};

const AddButton = ({ supabase, onAdd, category, isSubmitting }: Props) => {
  const [open, setOpen] = useState(false);

  const categoryExercises: Record<"push" | "pull" | "leg", string[]> = {
    push: [
      "ベンチプレス",
      "ダンベルプレス",
      "インクラインベンチプレス",
      "インクラインダンベルプレス",
      "ダンベルフライ",
      "ペックフライ",
      "ショルダープレス",
      "サイドレイズ",
      "プッシュダウン",
      "ディップス",
    ],
    pull: [
      "デッドリフト",
      "懸垂",
      "ラットプルダウン",
      "ベントオーバーローイング",
      "ワンハンドローイング",
      "ケーブルローイング",
      "ケーブルプルオーバー",
    ],
    leg: [
      "スクワット",
      "ブルガリアンスクワット",
      "レッグプレス",
      "レッグエクステンション",
      "レッグカール",
      "ルーマニアンデッドリフト",
      "カーフレイズ",
      "ヒップスラスト",
    ],
  };

  const exercises = categoryExercises[category];

  const handleSubmit = async (formData: {
    date: string;
    category: string;
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
    try {
      await onAdd(formData);
      setOpen(false);
    } catch (err) {
      console.error("登録エラー:", err);
      alert("登録に失敗しました");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        disabled={isSubmitting} // ✅ isSubmitting を使用
      >
        追加
      </Button>
      <RecordFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        categories={exercises}
      />
    </>
  );
};

export default AddButton;
