"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createClient } from "@/utils/supabase/client";

const CalendarView = () => {
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrainingDates = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("records")
        .select("training_date");

      if (error) {
        console.error("日付の取得エラー:", error.message);
        return;
      }

      const formattedDates = data.map((d: any) => d.training_date);
      setDates(formattedDates);
    };

    fetchTrainingDates();
  }, []);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const dateStr = date.toLocaleDateString("sv-SE");
    const isHighlighted = dates.includes(dateStr);

    return (
      <div className="flex flex-col items-center justify-center">
        {isHighlighted && (
          <span className="text-blue-500">●</span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white max-w-3xl mx-auto p-4 rounded-2xl shadow-md mt-10 mb-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          活動カレンダー
        </h2>
        <div className="flex justify-center mb-2">
          <Calendar
            tileContent={tileContent}
            formatDay={(locale, date) => String(date.getDate())} // ← ★ ここで「日」を除去
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;



