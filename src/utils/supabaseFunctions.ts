import { createClient } from "../utils/supabase/client";

// すべての記録を取得
export const getAllRecords = async () => {
  const { data, error } = await createClient().from("records").select("*");
  if (error) {
    console.error("データ取得エラー:", error.message);
    return [];
  }
  return data;
};

// 記録を追加
// export const addRecord = async (record: {
//   training_date: string;
//   category: string;
//   menu: string;
//   weight: number;
//   rep: number;
//   user_id: string; // 必要に応じて
// }) => {
//   const { data, error } = await createClient().from("records").insert([record]);
//   if (error) {
//     console.error("データ追加エラー:", error.message);
//     return null;
//   }
//   return data;
// };


// 変更後
// 記録を追加（3セット対応）
export const addRecord = async (record: {
  training_date: string;
  category: string;
  menu: string;
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
  user_id: string;
}) => {
  const { data, error } = await createClient().from("records").insert([record]);
  if (error) {
    console.error("データ追加エラー:", error.message);
    return null;
  }
  return data;
};



// 記録を削除
export const deleteRecord = async (recordId: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("records").delete().eq("id", recordId);
  if (error) {
    console.error("削除エラー:", error.message);
    return false;
  }
  return true;
};



