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

function getUpcomingExams(categoryFilter) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return EXAM_SCHEDULE
    .filter((s) => {
      if (s.type !== 'exam') return false;
      if (new Date(s.date) < today) return false;
      if (categoryFilter !== 'all') {
        const exam = EXAMS.find((e) => e.id === s.examId);
        return exam?.category === categoryFilter;
      }
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);
}

export default function Home() {
  const [catFilter, setCatFilter] = useState('all');
  const upcoming = getUpcomingExams(catFilter);
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

        {/* D-Day 카드 */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#2D1F5E' }}>다가오는 시험</h2>
            <Link to="/schedule" style={{ fontSize: 12, color: BRAND, textDecoration: 'none' }}>전체 보기</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {upcoming.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#C8B8E8', padding: '20px 0', fontSize: 14 }}>
                해당 카테고리의 시험 일정이 없습니다
              </div>
            ) : (
              upcoming.map((s) => {
                const exam = EXAMS.find((e) => e.id === s.examId);
                const dday = getDday(s.date);
                const isUrgent = dday !== 'D-Day' && !dday.startsWith('D+') && parseInt(dday.slice(2)) <= 7;
                const cat = CATEGORIES.find((c) => c.id === exam?.category);
                return (
                  <div key={s.id} style={{ background: 'white', borderRadius: 12, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #EDE8FF' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <div style={{ width: 6, height: 6, borderRadius: 3, background: exam?.color }} />
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#2D1F5E' }}>{exam?.name}</span>
                        <span style={{ fontSize: 10, color: 'white', background: cat?.color, padding: '1px 6px', borderRadius: 8 }}>
                          {cat?.label}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: '#C8B8E8' }}>{s.date} · 시험일</div>
                    </div>
                    <div style={{ background: dday === 'D-Day' ? '#F0C060' : isUrgent ? '#EF6B8A' : BRAND, color: dday === 'D-Day' ? '#2D1F5E' : 'white', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>
                      {dday}
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
