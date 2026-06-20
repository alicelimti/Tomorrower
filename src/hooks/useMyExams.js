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
  const [uploadedCount, setUploadedCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setSynced(true);
      return;
    }

    // 로그인 시점의 로컬 목록을 미리 캡처
    const localExams = getLocalExams();

    setSynced(false);
    setUploadedCount(0);

    supabase
      .from('user_exams')
      .select('exam_id')
      .eq('user_id', user.id)
      .then(async ({ data, error }) => {
        if (!error && data) {
          const dbIds = data.map((r) => r.exam_id);
          // 로컬에만 있고 DB에 없는 항목 → 업로드 대상
          const toUpload = localExams.filter((id) => !dbIds.includes(id));

          if (toUpload.length > 0) {
            await supabase.from('user_exams').upsert(
              toUpload.map((exam_id) => ({ user_id: user.id, exam_id })),
              { onConflict: 'user_id,exam_id' }
            );
            setUploadedCount(toUpload.length);
          }

          const merged = [...new Set([...dbIds, ...toUpload])];
          setMyExams(merged);
          localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
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

  return { myExams, toggle, synced, uploadedCount };
}
