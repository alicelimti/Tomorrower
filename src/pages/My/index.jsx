import { useState, useEffect } from 'react';
import { EXAMS, CATEGORIES, EXAM_SCHEDULE } from '../../data/exams';
import { useMyExams } from '../../hooks/useMyExams';
import { useAuth } from '../../contexts/AuthContext';

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
  const { user, authLoading, signInWithGoogle, signOut } = useAuth();
  const { myExams, toggle, synced, uploadedCount } = useMyExams();
  const [showUploadToast, setShowUploadToast] = useState(false);

  useEffect(() => {
    if (uploadedCount > 0) {
      setShowUploadToast(true);
      const t = setTimeout(() => setShowUploadToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [uploadedCount]);

  return (
    <div style={{ paddingBottom: 'var(--page-pb)' }}>
      {/* 헤더 */}
      <div style={{ background: GRADIENT, padding: '20px 20px 24px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>My 시험</h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
              {!synced ? '클라우드에서 불러오는 중...' : '응시할 시험을 추가하고 D-Day를 확인하세요'}
            </p>
          </div>
        </div>
      </div>

      {/* 업로드 완료 토스트 */}
      {showUploadToast && (
        <div style={{ margin: '12px 16px 0', background: '#48C89A', borderRadius: 10, padding: '10px 14px', color: 'white', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>☁️</span>
          <span>기기에 저장된 시험 {uploadedCount}개를 클라우드에 업로드했어요</span>
        </div>
      )}

      <div style={{ padding: '16px' }}>
        {/* 로그아웃 상태: 로그인 유도 카드 */}
        {!authLoading && !user && (
          <div style={{ background: 'white', borderRadius: 14, padding: '18px 16px', border: '1.5px solid #EDE8FF', marginBottom: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>☁️</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#2D1F5E', marginBottom: 4 }}>
              Google로 로그인하면
            </div>
            <div style={{ fontSize: 12, color: '#9B88CC', marginBottom: 14 }}>
              시험 목록이 클라우드에 저장되어<br />어떤 기기에서도 동기화돼요
            </div>
            <button
              onClick={signInWithGoogle}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '12px', borderRadius: 10, border: '1.5px solid #EDE8FF', background: 'white', fontSize: 14, fontWeight: 600, color: '#374151', cursor: 'pointer' }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.8 18.9 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.6 39.5 16.3 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.4 4.3-4.4 5.7l6.2 5.2C36.9 40.7 44 35 44 24c0-1.3-.1-2.6-.4-3.9z"/>
              </svg>
              Google로 시작하기
            </button>
          </div>
        )}

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

        {/* 시험 관리 */}
        <div style={{ background: 'white', borderRadius: 14, padding: '14px 16px', border: '1px solid #EDE8FF' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#2D1F5E', marginBottom: 4 }}>
            시험 관리
            <span style={{ fontSize: 11, fontWeight: 400, color: '#C8B8E8', marginLeft: 6 }}>탭해서 추가 / 제거</span>
          </div>
          {!user && (
            <div style={{ fontSize: 11, color: '#C8B8E8', marginBottom: 10 }}>로그인 전에는 이 기기에만 저장돼요</div>
          )}
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

        {/* 로그아웃 버튼 */}
        {!authLoading && user && (
          <button
            onClick={signOut}
            style={{ width: '100%', marginTop: 20, padding: '13px', borderRadius: 12, border: '1.5px solid #EDE8FF', background: 'white', color: '#9B88CC', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            로그아웃
          </button>
        )}

        {/* 푸터 */}
        <div style={{ marginTop: 28, textAlign: 'center', fontSize: 12, color: '#C8B8E8' }}>
          © 2026 임윤서. Made with 🔥
        </div>
      </div>
    </div>
  );
}
