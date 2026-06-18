import { useState, useEffect } from 'react';
import { EXAMS, CATEGORIES, EXAM_SCHEDULE } from '../../data/exams';
import { useMyExams } from '../../hooks/useMyExams';
import { supabase } from '../../supabase/client';
import { getDeviceId } from '../../hooks/useDeviceId';

const GRADIENT = 'linear-gradient(135deg, #7875E8 0%, #A87FD8 55%, #D4A4DC 100%)';

function getDday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((new Date(dateStr) - today) / 86400000);
  if (diff === 0) return 'D-Day';
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

function getNextExamDate(examId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return EXAM_SCHEDULE
    .filter((s) => s.examId === examId && s.type === 'exam' && new Date(s.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || null;
}

export default function My() {
  const { myExams, toggle } = useMyExams();
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('quiz_results')
      .select('*')
      .eq('device_id', getDeviceId())
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        setHistory(data || []);
        setHistoryLoading(false);
      });
  }, []);

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: GRADIENT, padding: '20px 20px 24px', color: 'white' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>My 시험</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>응시할 시험을 추가하고 D-Day를 확인하세요</p>
      </div>

      <div style={{ padding: '16px' }}>
        {/* D-Day 현황 */}
        {myExams.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#2D1F5E' }}>D-Day 현황</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {myExams.map((examId) => {
                const exam = EXAMS.find((e) => e.id === examId);
                if (!exam) return null;
                const cat = CATEGORIES.find((c) => c.id === exam.category);
                const nextExam = exam.ongoing ? null : getNextExamDate(examId);
                const dday = nextExam ? getDday(nextExam.date) : null;
                const isUrgent = dday && dday !== 'D-Day' && !dday.startsWith('D+') && parseInt(dday.slice(2)) <= 7;
                return (
                  <div key={examId} style={{ background: 'white', borderRadius: 12, padding: '12px 14px', border: '1px solid #EDE8FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <div style={{ width: 6, height: 6, borderRadius: 3, background: exam.color }} />
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#2D1F5E' }}>{exam.name}</span>
                        <span style={{ fontSize: 10, color: 'white', background: cat?.color, padding: '1px 6px', borderRadius: 8 }}>{cat?.label}</span>
                      </div>
                      {exam.ongoing ? (
                        <div style={{ fontSize: 11, color: '#48C89A', fontWeight: 600 }}>상시시험 · 언제든지 응시 가능</div>
                      ) : nextExam ? (
                        <div style={{ fontSize: 11, color: isUrgent ? '#EF6B8A' : '#9B88CC', fontWeight: isUrgent ? 700 : 400 }}>
                          시험일 {nextExam.date.slice(5).replace('-', '.')}
                        </div>
                      ) : (
                        <div style={{ fontSize: 11, color: '#C8B8E8' }}>다음 시험 일정 미정</div>
                      )}
                    </div>
                    {exam.ongoing ? (
                      <div style={{ background: '#48C89A', color: 'white', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>상시</div>
                    ) : dday ? (
                      <div style={{ background: dday === 'D-Day' ? '#F59E0B' : isUrgent ? '#EF6B8A' : '#7875E8', color: 'white', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>{dday}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 퀴즈 히스토리 */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#2D1F5E' }}>퀴즈 히스토리</h2>
          {historyLoading ? (
            <div style={{ textAlign: 'center', color: '#C8B8E8', padding: '20px 0', fontSize: 13 }}>불러오는 중...</div>
          ) : history.length === 0 ? (
            <div style={{ background: 'white', borderRadius: 12, padding: '18px 16px', border: '1px solid #EDE8FF', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#C8B8E8' }}>아직 퀴즈 기록이 없어요</div>
              <div style={{ fontSize: 11, color: '#D4CBFF', marginTop: 4 }}>퀴즈 탭에서 문제를 풀어보세요</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {history.map((h) => {
                const exam = EXAMS.find((e) => e.id === h.exam_id);
                const cat = CATEGORIES.find((c) => c.id === exam?.category);
                const date = new Date(h.created_at);
                const dateStr = `${date.getMonth() + 1}.${date.getDate()} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
                const scoreColor = h.score >= 80 ? '#48C89A' : h.score >= 60 ? '#F59E0B' : '#EF6B8A';
                return (
                  <div key={h.id} style={{ background: 'white', borderRadius: 12, padding: '12px 14px', border: '1px solid #EDE8FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#2D1F5E' }}>
                          {h.exam_id === 'all' ? '전체 랜덤' : exam?.name ?? h.exam_id}
                        </span>
                        {cat && <span style={{ fontSize: 10, color: 'white', background: cat.color, padding: '1px 6px', borderRadius: 8 }}>{cat.label}</span>}
                      </div>
                      <div style={{ fontSize: 11, color: '#C8B8E8' }}>
                        {dateStr} · {h.total_count}문제 중 {h.correct_count}개 정답
                      </div>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: scoreColor, minWidth: 48, textAlign: 'right' }}>
                      {h.score}점
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 시험 관리 */}
        <div style={{ background: 'white', borderRadius: 14, padding: '14px 16px', border: '1px solid #EDE8FF' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#2D1F5E', marginBottom: 12 }}>
            시험 관리
            <span style={{ fontSize: 11, fontWeight: 400, color: '#C8B8E8', marginLeft: 6 }}>탭해서 추가 / 제거</span>
          </div>
          {CATEGORIES.map((cat) => {
            const catExams = EXAMS.filter((e) => e.category === cat.id);
            return (
              <div key={cat.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                  <div style={{ width: 3, height: 12, borderRadius: 2, background: cat.color }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: cat.color }}>{cat.label}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {catExams.map((exam) => {
                    const selected = myExams.includes(exam.id);
                    return (
                      <button key={exam.id} onClick={() => toggle(exam.id)} style={{ padding: '7px 14px', borderRadius: 20, border: selected ? 'none' : '1.5px solid #EDE8FF', background: selected ? exam.color : '#FAF8FF', color: selected ? 'white' : '#9B88CC', fontSize: 12, fontWeight: selected ? 700 : 400, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {selected ? '✓ ' : ''}{exam.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
