import { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import { useAuth } from '../contexts/AuthContext';

const LOCAL_KEY = 'tomorrower_my_exams';

function getLocalExams() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; }
  catch { return []; }
}

export function useMyExams() {
  const { user } = useAuth();
  const [myExams, setMyExams] = useState(getLocalExams);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!user) {
      setSynced(true);
      return;
    }

    setSynced(false);
    supabase
      .from('user_exams')
      .select('exam_id')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (!error && data) {
          const ids = data.map((r) => r.exam_id);
          setMyExams(ids);
          localStorage.setItem(LOCAL_KEY, JSON.stringify(ids));
        }
        setSynced(true);
      });
  }, [user?.id]);

  const toggle = async (examId) => {
    const isSelected = myExams.includes(examId);
    const next = isSelected
      ? myExams.filter((id) => id !== examId)
      : [...myExams, examId];

    setMyExams(next);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(next));

    if (!user) return;

    if (isSelected) {
      await supabase.from('user_exams').delete()
        .eq('user_id', user.id).eq('exam_id', examId);
    } else {
      await supabase.from('user_exams').insert({ user_id: user.id, exam_id: examId });
    }
  };

  return { myExams, toggle, synced };
}
