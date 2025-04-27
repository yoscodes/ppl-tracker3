// export interface Record {
//   id: string; // ✅ number から string に変更済み
//   training_date: string;
//   menu: string;
//   weight: number;
//   rep: number;
//   category: string;
//   user_id: string;
// }


// 変更後
export interface Record {
  id: string;
  training_date: string;
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
  category: string;
  user_id: string;
}
