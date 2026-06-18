import { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import { getDeviceId } from './useDeviceId';

const LOCAL_KEY = 'tomorrower_my_exams';

function getLocalExams() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; }
  catch { return []; }
}

export function useMyExams() {
  const [myExams, setMyExams] = useState(getLocalExams);
  const [synced, setSynced] = useState(false);

  // 앱 시작 시 Supabase에서 최신 목록 동기화
  useEffect(() => {
    const deviceId = getDeviceId();
    supabase
      .from('user_exams')
      .select('exam_id')
      .eq('device_id', deviceId)
      .then(({ data, error }) => {
        if (!error && data) {
          const ids = data.map((r) => r.exam_id);
          setMyExams(ids);
          localStorage.setItem(LOCAL_KEY, JSON.stringify(ids));
        }
        setSynced(true);
      });
  }, []);

  const toggle = async (examId) => {
    const deviceId = getDeviceId();
    const isSelected = myExams.includes(examId);
    const next = isSelected
      ? myExams.filter((id) => id !== examId)
      : [...myExams, examId];

    // 낙관적 업데이트 (UI 즉시 반영)
    setMyExams(next);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(next));

    if (isSelected) {
      await supabase
        .from('user_exams')
        .delete()
        .eq('device_id', deviceId)
        .eq('exam_id', examId);
    } else {
      await supabase
        .from('user_exams')
        .insert({ device_id: deviceId, exam_id: examId });
    }
  };

  return { myExams, toggle, synced };
}
