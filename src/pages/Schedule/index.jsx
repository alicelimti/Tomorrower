import { useState } from 'react';
import { EXAM_SCHEDULE, EXAMS, SCHEDULE_TYPE_COLORS, SCHEDULE_TYPE_LABELS } from '../../data/exams';

function getDday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'D-Day';
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

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
        {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
          <div key={d} style={{ textAlign: 'center', fontSize: 11, color: i === 0 ? '#EF4444' : i === 6 ? '#3B82F6' : '#9CA3AF', padding: '6px 0', fontWeight: 600 }}>
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const events = eventsByDay[day] || [];
          const dayOfWeek = (firstDay + day - 1) % 7;
          return (
            <div key={day} style={{ minHeight: 48, padding: 4, borderRadius: 8, background: isToday ? '#EEF2FF' : 'transparent' }}>
              <div style={{ width: 24, height: 24, borderRadius: 12, background: isToday ? '#003087' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2px', fontSize: 12, fontWeight: isToday ? 700 : 400, color: isToday ? 'white' : dayOfWeek === 0 ? '#EF4444' : dayOfWeek === 6 ? '#3B82F6' : '#374151' }}>
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
  const [view, setView] = useState('calendar');

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const listItems = EXAM_SCHEDULE
    .filter((s) => {
      const d = new Date(s.date);
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* 헤더 */}
      <div style={{ background: 'linear-gradient(135deg, #0E1C3D 0%, #003087 100%)', padding: '20px 20px 16px', color: 'white' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>시험 일정</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>접수·시험·합격발표 한눈에</p>
      </div>

      <div style={{ padding: '16px' }}>
        {/* 월 네비게이션 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={prevMonth} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#374151', padding: '4px 8px' }}>←</button>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#0E1C3D' }}>{year}년 {MONTHS[month]}</span>
          <button onClick={nextMonth} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#374151', padding: '4px 8px' }}>→</button>
        </div>

        {/* 뷰 전환 */}
        <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 3, marginBottom: 16 }}>
          {['calendar', 'list'].map((v) => (
            <button key={v} onClick={() => setView(v)} style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', background: view === v ? 'white' : 'transparent', color: view === v ? '#0E1C3D' : '#9CA3AF', fontWeight: view === v ? 700 : 400, fontSize: 13, cursor: 'pointer', boxShadow: view === v ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
              {v === 'calendar' ? '📅 캘린더' : '📋 목록'}
            </button>
          ))}
        </div>

        {view === 'calendar' ? (
          <CalendarView year={year} month={month} />
        ) : null}

        {/* 범례 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '16px 0' }}>
          {Object.entries(SCHEDULE_TYPE_LABELS).map(([type, label]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: SCHEDULE_TYPE_COLORS[type] }} />
              <span style={{ fontSize: 11, color: '#6B7280' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* 이번 달 일정 목록 */}
        <h3 style={{ margin: '16px 0 10px', fontSize: 14, fontWeight: 700, color: '#0E1C3D' }}>
          {MONTHS[month]} 일정 {listItems.length > 0 ? `(${listItems.length}건)` : ''}
        </h3>
        {listItems.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9CA3AF', padding: '24px 0', fontSize: 14 }}>이번 달 일정이 없습니다</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {listItems.map((s) => {
              const exam = EXAMS.find((e) => e.id === s.examId);
              const dday = getDday(s.date);
              const color = SCHEDULE_TYPE_COLORS[s.type];
              return (
                <div key={s.id} style={{ background: 'white', border: `1px solid #E5E7EB`, borderLeft: `4px solid ${color}`, borderRadius: 10, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0E1C3D' }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{s.date} · {SCHEDULE_TYPE_LABELS[s.type]}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: color }}>
                    {dday}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
