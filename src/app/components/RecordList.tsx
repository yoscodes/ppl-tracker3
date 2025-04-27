"use client";

import { Record } from "../utils/interface";
import DeleteIcon from "@mui/icons-material/Delete"; // アイコンをインポート

type Props = {
  records: Record[];
  onDelete: (recordId: string) => void;
};

const RecordList = ({ records, onDelete }: Props) => {
  return (
    <ul className="space-y-3">
      {records.map((record) => (
        <li
          key={record.id}
          className="relative flex flex-col gap-2 sm:flex-row justify-between p-4 bg-white border-l-4 rounded shadow"
        >
          {/* 左側：日付 + メニュー */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div className="text-sm text-gray-400">{record.training_date}</div>
            <div className="font-medium">{record.menu}</div>
          </div>

          {/* 右側：セット情報 */}
          <div className="flex flex-wrap gap-x-2 gap-y-2 items-center justify-end mt-2 sm:mt-0">
            {/* {[1, 2, 3, 4, 5, 6].map((setNum) => {
              const weight = record[`weight${setNum}` as keyof Record];
              const reps = record[`reps${setNum}` as keyof Record];
              if (weight && reps) {
                return (
                  <span
                    key={setNum}
                    className="whitespace-nowrap text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                  >
                    {`${weight}kg x ${reps}回`}
                  </span>
                );
              }

            
              
              

         
              
              return null;
            })} */}

            {[1, 2, 3, 4, 5, 6].map((setNum) => {
              const weight = record[`weight${setNum}` as keyof Record];
              const reps = record[`reps${setNum}` as keyof Record];

              // reps が null でなく、weight が null なら 0kg として扱う
              if (reps != null) {
                const displayWeight = weight ?? 0;
                return (
                  <span
                    key={setNum}
                    className="whitespace-nowrap text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                  >
                    {displayWeight === 0
                      ? `${reps}回`
                      : `${displayWeight}kg x ${reps}回`}
                  </span>
                );
              }

              return null;
            })}
          </div>

          {/* 削除ボタン（アイコン） */}
          <button
            className="absolute top-2 right-2 sm:static sm:ml-4 text-red-500 hover:text-red-700 text-sm"
            onClick={() => {
              const confirmDelete = window.confirm("この記録を削除しますか？");
              if (confirmDelete) {
                onDelete(record.id);
              }
            }}
          >
            <DeleteIcon fontSize="small" /> {/* ゴミ箱アイコン */}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RecordList;
