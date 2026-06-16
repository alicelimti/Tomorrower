import { useState } from 'react';

const KEY = 'tomorrower_my_exams';

export function useMyExams() {
  const [myExams, setMyExams] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  });

  const toggle = (examId) => {
    setMyExams((prev) => {
      const next = prev.includes(examId)
        ? prev.filter((id) => id !== examId)
        : [...prev, examId];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  return { myExams, toggle };
}
