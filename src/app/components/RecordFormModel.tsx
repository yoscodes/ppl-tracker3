"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: {
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
  }) => void;
  categories: string[];
};

const RecordFormModal = ({ open, onClose, onSubmit, categories }: Props) => {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState("");
  const [weights, setWeights] = useState<(number | "")[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [reps, setReps] = useState<(number | "")[]>(["", "", "", "", "", ""]);

  const handleWeightChange = (index: number, value: string) => {
    const newWeights = [...weights];
    newWeights[index] = value === "" ? "" : Number(value);
    setWeights(newWeights);
  };

  const handleRepsChange = (index: number, value: string) => {
    const newReps = [...reps];
    newReps[index] = value === "" ? "" : Number(value);
    setReps(newReps);
  };

  const handleSubmit = () => {
    // if (!date || !category || !weights[0] || !reps[0]) {
    //   alert("1セット目の重量と回数は必須です");
    //   return;
    // }
    if (!date || !category || weights[0] === "" || reps[0] === "") {
      alert("1セット目の重量と回数は必須です");
      return;
    }

    onSubmit({
      date,
      category,
      weight1: weights[0] as number,
      reps1: reps[0] as number,
      weight2: weights[1] || undefined,
      reps2: reps[1] || undefined,
      weight3: weights[2] || undefined,
      reps3: reps[2] || undefined,
      weight4: weights[3] || undefined,
      reps4: reps[3] || undefined,
      weight5: weights[4] || undefined,
      reps5: reps[4] || undefined,
      weight6: weights[5] || undefined,
      reps6: reps[5] || undefined,
    });
  };

  // const weightOptions = Array.from(
  //   { length: (200 - 5) / 5 + 1 },
  //   (_, i) => 5 + i * 5
  // );

  useEffect(() => {
    if (open) {
      setDate(new Date().toISOString().slice(0, 10));
      setCategory("");
      setWeights(["", "", "", "", "", ""]);
      setReps(["", "", "", "", "", ""]);
    }
  }, [open]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        sx: {
          margin: { xs: 2, sm: 'auto' },
          width: { xs: 'calc(100% - 32px)', sm: 'auto' },
          maxHeight: { xs: 'calc(100% - 64px)', sm: '90vh' }
        }
      }}
    >
      <DialogTitle>トレーニング記録の追加</DialogTitle>
      <DialogContent className="space-y-4 mt-2" sx={{ padding: { xs: 2, sm: 3 } }}>
        <TextField
          label="日付"
          type="date"
          fullWidth
          sx={{ mt: 1 }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="種目"
          select
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          InputLabelProps={{ shrink: true }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-3">
            <div className="text-sm font-medium text-gray-700">
              セット{i + 1}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextField
                label="重量 (kg)"
                type="number"
                fullWidth
                value={weights[i]}
                onChange={(e) => handleWeightChange(i, e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
                InputLabelProps={{ shrink: true }}
                size="small"
              />

              <TextField
                label="回数"
                select
                fullWidth
                value={reps[i]}
                onChange={(e) => handleRepsChange(i, e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
              >
                {Array.from({ length: 30 }, (_, j) => j + 1).map((rep) => (
                  <MenuItem key={rep} value={rep}>
                    {rep} 回
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        ))}
      </DialogContent>
      <DialogActions sx={{ padding: { xs: 2, sm: 3 }, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" fullWidth sx={{ display: { xs: 'block', sm: 'inline' } }}>
          キャンセル
        </Button>
        <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ display: { xs: 'block', sm: 'inline' } }}>
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordFormModal;
