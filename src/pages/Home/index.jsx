import { Link } from 'react-router-dom';
import { EXAMS, EXAM_SCHEDULE } from '../../data/exams';

function getDday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'D-Day';
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

function getUpcomingExams() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return EXAM_SCHEDULE
    .filter((s) => s.type === 'exam' && new Date(s.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
}

export default function Home() {
  const upcoming = getUpcomingExams();
  const today = new Date();
  const dateLabel = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* 헤더 */}
      <div style={{ background: 'linear-gradient(135deg, #0E1C3D 0%, #003087 100%)', padding: '28px 20px 24px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>{dateLabel}</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>
              안녕하세요! <span style={{ color: '#F2C94C' }}>미루니</span> 👋
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>오늘도 조금씩, 함께 시작해요</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            T
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* 오늘의 퀴즈 배너 */}
        <Link to="/quiz" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'linear-gradient(135deg, #6B2FA0, #8B4CC5)', borderRadius: 16, padding: '16px 20px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 4 }}>매일 10문제</div>
              <div style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>오늘의 퀴즈 풀기 →</div>
            </div>
            <div style={{ fontSize: 36 }}>📝</div>
          </div>
        </Link>

        {/* D-Day 카드 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0E1C3D' }}>다가오는 시험</h2>
            <Link to="/schedule" style={{ fontSize: 13, color: '#003087', textDecoration: 'none' }}>전체 보기</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upcoming.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#9CA3AF', padding: '20px 0', fontSize: 14 }}>
                등록된 시험 일정이 없습니다
              </div>
            ) : (
              upcoming.map((s) => {
                const exam = EXAMS.find((e) => e.id === s.examId);
                const dday = getDday(s.date);
                return (
                  <div key={s.id} style={{ background: '#F8FAFF', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E5EAFF' }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#0E1C3D' }}>{exam?.name}</div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{s.date} · 시험일</div>
                    </div>
                    <div style={{ background: dday === 'D-Day' ? '#F2C94C' : '#0E1C3D', color: dday === 'D-Day' ? '#0E1C3D' : 'white', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>
                      {dday}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 시험 종목 바로가기 */}
        <div>
          <h2 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#0E1C3D' }}>지원 자격증</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {EXAMS.map((exam) => (
              <Link key={exam.id} to={`/info?exam=${exam.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: exam.color, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                  <div style={{ color: 'white', fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{exam.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
