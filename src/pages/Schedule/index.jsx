import { useState } from 'react';
import { EXAM_SCHEDULE, EXAMS, CATEGORIES, SCHEDULE_TYPE_COLORS, SCHEDULE_TYPE_LABELS } from '../../data/exams';
import { useMyExams } from '../../hooks/useMyExams';

function getDday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((new Date(dateStr) - today) / 86400000);
  if (diff === 0) return 'D-Day';
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

const MONTHS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

// 4단계 타임라인 — 시험별로 묶어서 표시
function TimelineView({ catFilter }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const examIds = [...new Set(
    EXAM_SCHEDULE
      .filter((s) => {
        if (new Date(s.date) < today) return false;
        if (catFilter === 'all') return true;
        const exam = EXAMS.find((e) => e.id === s.examId);
        return exam?.category === catFilter;
      })
      .map((s) => s.examId)
  )];

  const TIMELINE_STEPS = [
    { type: 'register_start', label: '접수 시작', step: '01' },
    { type: 'cancel_end',     label: '취소 마감', step: '02' },
    { type: 'exam',           label: '시험일',   step: '03' },
    { type: 'next_exam',      label: '다음 시험', step: '04' },
  ];

  if (examIds.length === 0) {
    return <div style={{ textAlign: 'center', color: '#C8B8E8', padding: '32px 0', fontSize: 14 }}>일정이 없습니다</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {examIds.map((examId) => {
        const exam = EXAMS.find((e) => e.id === examId);
        const schedules = EXAM_SCHEDULE.filter((s) => s.examId === examId);
        const cat = CATEGORIES.find((c) => c.id === exam?.category);

        return (
          <div key={examId} style={{ background: 'white', borderRadius: 14, padding: '14px', border: '1px solid #EDE8FF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: exam?.color }} />
                <span style={{ fontSize: 15, fontWeight: 700, color: '#2D1F5E' }}>{exam?.name}</span>
                <span style={{ fontSize: 10, color: 'white', background: cat?.color, padding: '2px 7px', borderRadius: 8 }}>{cat?.label}</span>
              </div>
              {(() => {
                const examDate = schedules.find((s) => s.type === 'exam');
                if (!examDate) return null;
                const dday = getDday(examDate.date);
                const isUrgent = dday !== 'D-Day' && !dday.startsWith('D+') && parseInt(dday.slice(2)) <= 7;
                return (
                  <span style={{ fontSize: 12, fontWeight: 700, color: dday === 'D-Day' ? '#F59E0B' : isUrgent ? '#EF6B8A' : '#7875E8' }}>{dday}</span>
                );
              })()}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
              {TIMELINE_STEPS.map((step, idx) => {
                const s = schedules.find((sc) => sc.type === step.type);
                const hasData = !!s;
                const isPast = hasData && new Date(s.date) < new Date();
                return (
                  <div key={step.type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {idx < TIMELINE_STEPS.length - 1 && (
                      <div style={{ position: 'absolute', top: 10, left: '50%', width: '100%', height: 2, background: hasData ? (isPast ? '#CBD5E1' : SCHEDULE_TYPE_COLORS[step.type]) : '#EDE8FF', zIndex: 0 }} />
                    )}
                    <div style={{ width: 20, height: 20, borderRadius: 10, background: hasData ? (isPast ? '#CBD5E1' : SCHEDULE_TYPE_COLORS[step.type]) : '#EDE8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, marginBottom: 5, border: hasData ? 'none' : '1.5px dashed #CBD5E1' }}>
                      {hasData && <div style={{ width: 8, height: 8, borderRadius: 4, background: 'white' }} />}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: hasData ? '#2D1F5E' : '#CBD5E1', textAlign: 'center', lineHeight: 1.3 }}>{step.label}</div>
                    <div style={{ fontSize: 10, color: hasData ? '#9B88CC' : '#CBD5E1', textAlign: 'center', marginTop: 2 }}>
                      {hasData ? s.date.slice(5) : '—'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CalendarView({ year, month }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const eventsByDay = {};
  EXAM_SCHEDULE.forEach((s) => {
    const d = new Date(s.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(s);
    }
  });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
        {['일','월','화','수','목','금','토'].map((d, i) => (
          <div key={d} style={{ textAlign: 'center', fontSize: 11, color: i === 0 ? '#EF6B8A' : i === 6 ? '#3B82F6' : '#C8B8E8', padding: '6px 0', fontWeight: 600 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const events = eventsByDay[day] || [];
          const dow = (firstDay + day - 1) % 7;
          return (
            <div key={day} style={{ minHeight: 48, padding: 4, borderRadius: 8, background: isToday ? '#EFF6FF' : 'transparent' }}>
              <div style={{ width: 24, height: 24, borderRadius: 12, background: isToday ? '#7875E8' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2px', fontSize: 12, fontWeight: isToday ? 700 : 400, color: isToday ? 'white' : dow === 0 ? '#EF6B8A' : dow === 6 ? '#3B82F6' : '#374151' }}>
                {day}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {events.slice(0, 2).map((e) => (
                  <div key={e.id} style={{ height: 4, borderRadius: 2, background: SCHEDULE_TYPE_COLORS[e.type] }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Schedule() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [view, setView] = useState('timeline');
  const [catFilter, setCatFilter] = useState('all');
  const { myExams, toggle } = useMyExams();

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const listItems = EXAM_SCHEDULE
    .filter((s) => { const d = new Date(s.date); return d.getFullYear() === year && d.getMonth() === month; })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg, #7875E8 0%, #A87FD8 55%, #D4A4DC 100%)', padding: '20px 20px 16px', color: 'white' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>시험 일정</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>접수 · 취소 · 응시 · 다음 시험 타임라인</p>
      </div>

      <div style={{ padding: '16px' }}>
        {/* 내 시험 관리 */}
        <div style={{ background: 'white', borderRadius: 14, padding: '14px 16px', marginBottom: 14, border: '1px solid #EDE8FF' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#2D1F5E', marginBottom: 10 }}>
            내 시험 관리
            <span style={{ fontSize: 11, fontWeight: 400, color: '#C8B8E8', marginLeft: 6 }}>탭해서 추가/제거</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {EXAMS.map((exam) => {
              const selected = myExams.includes(exam.id);
              return (
                <button key={exam.id} onClick={() => toggle(exam.id)} style={{ padding: '6px 12px', borderRadius: 20, border: selected ? 'none' : '1.5px solid #EDE8FF', background: selected ? exam.color : '#FAF8FF', color: selected ? 'white' : '#9B88CC', fontSize: 12, fontWeight: selected ? 700 : 400, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {selected ? '✓ ' : ''}{exam.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 뷰 전환 */}
        <div style={{ display: 'flex', background: '#EDE8FF', borderRadius: 10, padding: 3, marginBottom: 14 }}>
          {[['timeline','📋 타임라인'], ['calendar','📅 캘린더'], ['list','📄 목록']].map(([v, lbl]) => (
            <button key={v} onClick={() => setView(v)} style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', background: view === v ? 'white' : 'transparent', color: view === v ? '#7875E8' : '#C8B8E8', fontWeight: view === v ? 700 : 400, fontSize: 12, cursor: 'pointer', boxShadow: view === v ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
              {lbl}
            </button>
          ))}
        </div>

        {/* 카테고리 필터 */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {[{ id: 'all', label: '전체', color: '#7875E8' }, ...CATEGORIES.map(c => ({ id: c.id, label: c.label, color: c.color }))].map((cat) => (
            <button key={cat.id} onClick={() => setCatFilter(cat.id)} style={{ padding: '5px 12px', borderRadius: 20, border: 'none', background: catFilter === cat.id ? cat.color : '#EDE8FF', color: catFilter === cat.id ? 'white' : '#9B88CC', fontSize: 12, fontWeight: catFilter === cat.id ? 700 : 400, cursor: 'pointer' }}>
              {cat.label}
            </button>
          ))}
        </div>

        {view === 'timeline' && <TimelineView catFilter={catFilter} />}

        {view === 'calendar' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <button onClick={prevMonth} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#374151', padding: '4px 8px' }}>←</button>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#2D1F5E' }}>{year}년 {MONTHS[month]}</span>
              <button onClick={nextMonth} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#374151', padding: '4px 8px' }}>→</button>
            </div>
            <CalendarView year={year} month={month} />
          </>
        )}

        {view === 'list' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <button onClick={prevMonth} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#374151', padding: '4px 8px' }}>←</button>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#2D1F5E' }}>{year}년 {MONTHS[month]}</span>
              <button onClick={nextMonth} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#374151', padding: '4px 8px' }}>→</button>
            </div>
            {listItems.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#C8B8E8', padding: '24px 0', fontSize: 14 }}>이번 달 일정이 없습니다</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {listItems.map((s) => {
                  const exam = EXAMS.find((e) => e.id === s.examId);
                  const color = SCHEDULE_TYPE_COLORS[s.type];
                  return (
                    <div key={s.id} style={{ background: 'white', borderLeft: `4px solid ${color}`, borderRadius: 10, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid #EDE8FF`, borderLeftColor: color, borderLeftWidth: 4 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#2D1F5E' }}>{s.label}</div>
                        <div style={{ fontSize: 12, color: '#C8B8E8', marginTop: 2 }}>{s.date} · {SCHEDULE_TYPE_LABELS[s.type]}</div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: color }}>{getDday(s.date)}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* 범례 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
          {Object.entries(SCHEDULE_TYPE_LABELS).map(([type, label]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: SCHEDULE_TYPE_COLORS[type] }} />
              <span style={{ fontSize: 11, color: '#9B88CC' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
