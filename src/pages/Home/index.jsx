import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EXAMS, EXAM_SCHEDULE, CATEGORIES } from '../../data/exams';

const GRADIENT = 'linear-gradient(135deg, #7875E8 0%, #A87FD8 55%, #D4A4DC 100%)';
const BRAND = '#7875E8';

function getDday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((new Date(dateStr) - today) / 86400000);
  if (diff === 0) return 'D-Day';
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

function getOpenRegistrations(categoryFilter) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const examIds = [...new Set(EXAM_SCHEDULE.map((s) => s.examId))];
  const results = [];

  for (const examId of examIds) {
    const schedules = EXAM_SCHEDULE.filter((s) => s.examId === examId);
    const starts = schedules.filter((s) => s.type === 'register_start').sort((a, b) => new Date(a.date) - new Date(b.date));
    const ends   = schedules.filter((s) => s.type === 'register_end').sort((a, b) => new Date(a.date) - new Date(b.date));

    for (let i = 0; i < starts.length; i++) {
      const startDate = new Date(starts[i].date);
      const end = ends[i];
      if (!end) continue;
      const endDate = new Date(end.date);
      if (startDate <= today && endDate >= today) {
        const examEntry = schedules
          .filter((s) => s.type === 'exam' && new Date(s.date) >= startDate)
          .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
        results.push({ examId, registerEnd: end.date, examDate: examEntry?.date });
      }
    }
  }

  return results.filter((item) => {
    if (categoryFilter === 'all') return true;
    const exam = EXAMS.find((e) => e.id === item.examId);
    return exam?.category === categoryFilter;
  });
}

function getNextRegisterOpen(categoryFilter) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const next = EXAM_SCHEDULE
    .filter((s) => {
      if (s.type !== 'register_start') return false;
      if (new Date(s.date) <= today) return false;
      if (categoryFilter !== 'all') {
        const exam = EXAMS.find((e) => e.id === s.examId);
        return exam?.category === categoryFilter;
      }
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  return next || null;
}

export default function Home() {
  const [catFilter, setCatFilter] = useState('all');
  const openRegs = getOpenRegistrations(catFilter);
  const nextOpen = getNextRegisterOpen(catFilter);
  const today = new Date();
  const dateLabel = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* 헤더 */}
      <div style={{ background: GRADIENT, padding: '28px 20px 24px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>{dateLabel}</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>
              안녕하세요! <span style={{ color: '#F0E060' }}>미루니</span> 👋
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>오늘도 조금씩, 함께 시작해요</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: 'white' }}>
            T
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* 오늘의 퀴즈 배너 */}
        <Link to="/quiz" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'linear-gradient(135deg, #A87FD8, #D4A4DC)', borderRadius: 16, padding: '14px 18px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, marginBottom: 3 }}>매일 5문제 · Lite 모드</div>
              <div style={{ color: 'white', fontSize: 15, fontWeight: 700 }}>오늘의 퀴즈 풀기 →</div>
            </div>
            <div style={{ fontSize: 32 }}>📝</div>
          </div>
        </Link>

        {/* 카테고리 필터 */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          <button onClick={() => setCatFilter('all')} style={{ padding: '6px 14px', borderRadius: 20, border: 'none', background: catFilter === 'all' ? BRAND : '#EDE8FF', color: catFilter === 'all' ? 'white' : '#9B88CC', fontWeight: catFilter === 'all' ? 700 : 400, fontSize: 12, cursor: 'pointer' }}>
            전체
          </button>
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setCatFilter(cat.id)} style={{ padding: '6px 14px', borderRadius: 20, border: 'none', background: catFilter === cat.id ? cat.color : '#EDE8FF', color: catFilter === cat.id ? 'white' : '#9B88CC', fontWeight: catFilter === cat.id ? 700 : 400, fontSize: 12, cursor: 'pointer' }}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* 접수 가능 카드 */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#2D1F5E' }}>지금 접수 가능</h2>
              {openRegs.length > 0 && (
                <span style={{ background: '#EF6B8A', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10 }}>
                  {openRegs.length}개
                </span>
              )}
            </div>
            <Link to="/schedule" style={{ fontSize: 12, color: BRAND, textDecoration: 'none' }}>일정 보기</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {openRegs.length === 0 ? (
              <div style={{ background: 'white', borderRadius: 12, padding: '18px 16px', border: '1px solid #EDE8FF', textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#C8B8E8', marginBottom: 6 }}>현재 접수 중인 시험이 없습니다</div>
                {nextOpen && (() => {
                  const exam = EXAMS.find((e) => e.id === nextOpen.examId);
                  return (
                    <div style={{ fontSize: 12, color: '#A87FD8', fontWeight: 600 }}>
                      다음 접수 → {exam?.name} · {nextOpen.date.slice(5).replace('-', '.')} 시작
                    </div>
                  );
                })()}
              </div>
            ) : (
              openRegs.map((item) => {
                const exam = EXAMS.find((e) => e.id === item.examId);
                const cat = CATEGORIES.find((c) => c.id === exam?.category);
                const ddayExam = item.examDate ? getDday(item.examDate) : null;
                const ddayReg = getDday(item.registerEnd);
                const regUrgent = ddayReg !== 'D-Day' && !ddayReg.startsWith('D+') && parseInt(ddayReg.slice(2)) <= 3;
                return (
                  <div key={item.examId + item.registerEnd} style={{ background: 'white', borderRadius: 12, padding: '12px 14px', border: '1px solid #EDE8FF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <div style={{ width: 6, height: 6, borderRadius: 3, background: exam?.color }} />
                          <span style={{ fontSize: 14, fontWeight: 700, color: '#2D1F5E' }}>{exam?.name}</span>
                          <span style={{ fontSize: 10, color: 'white', background: cat?.color, padding: '1px 6px', borderRadius: 8 }}>{cat?.label}</span>
                        </div>
                        <div style={{ fontSize: 11, color: regUrgent ? '#EF6B8A' : '#9B88CC', fontWeight: regUrgent ? 700 : 400 }}>
                          접수 마감 {item.registerEnd.slice(5).replace('-', '.')} ({ddayReg})
                        </div>
                        {item.examDate && (
                          <div style={{ fontSize: 11, color: '#C8B8E8', marginTop: 2 }}>
                            시험일 {item.examDate.slice(5).replace('-', '.')}
                          </div>
                        )}
                      </div>
                      {ddayExam && (
                        <div style={{ background: BRAND, color: 'white', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
                          {ddayExam}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 자격증 카테고리 */}
        {CATEGORIES.map((cat) => {
          const catExams = EXAMS.filter((e) => e.category === cat.id);
          return (
            <div key={cat.id} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <div style={{ width: 3, height: 14, borderRadius: 2, background: cat.color }} />
                <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#2D1F5E' }}>{cat.label} 자격증</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>
                {catExams.map((exam) => (
                  <Link key={exam.id} to={`/info?exam=${exam.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: exam.color, borderRadius: 10, padding: '10px 6px', textAlign: 'center' }}>
                      <div style={{ color: 'white', fontSize: 11, fontWeight: 700, lineHeight: 1.3 }}>{exam.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
