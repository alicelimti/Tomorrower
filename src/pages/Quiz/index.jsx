import { useState } from 'react';
import { QUIZ_BANK } from '../../data/quizBank';
import { EXAMS, CATEGORIES } from '../../data/exams';

const LITE_COUNT = 5;

function getAllQuestions() {
  return Object.values(QUIZ_BANK).flat();
}

export default function Quiz() {
  const [selectedExam, setSelectedExam] = useState('all');
  const [catFilter, setCatFilter] = useState('all');
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);

  const availableExams = EXAMS.filter((e) => QUIZ_BANK[e.id] && (catFilter === 'all' || e.category === catFilter));

  const startQuiz = () => {
    const pool = selectedExam === 'all'
      ? availableExams.flatMap((e) => QUIZ_BANK[e.id] || [])
      : (QUIZ_BANK[selectedExam] || []);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(LITE_COUNT, pool.length));
    setQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setResults([]);
    setFinished(false);
    setQuizStarted(true);
  };

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const q = questions[current];
    setResults((prev) => [...prev, { question: q, selected: idx, correct: idx === q.answer }]);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) setFinished(true);
    else { setCurrent((c) => c + 1); setSelected(null); setAnswered(false); }
  };

  const toggleBookmark = (id) => {
    setBookmarked((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]);
  };

  const correctCount = results.filter((r) => r.correct).length;

  // 결과 화면
  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div style={{ paddingBottom: 80 }}>
        <div style={{ background: 'linear-gradient(135deg, #0E7490, #0891B2)', padding: '20px 20px 16px', color: 'white' }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>퀴즈 완료! 🎉</h1>
        </div>
        <div style={{ padding: '20px 16px' }}>
          <div style={{ textAlign: 'center', background: 'white', borderRadius: 18, padding: '24px', marginBottom: 16, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: pct >= 80 ? '#16A34A' : pct >= 60 ? '#F59E0B' : '#EF4444' }}>{pct}점</div>
            <div style={{ fontSize: 15, color: '#64748B', marginTop: 4 }}>{questions.length}문제 중 {correctCount}개 정답</div>
            <div style={{ marginTop: 12, fontSize: 24 }}>{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪'}</div>
          </div>

          <h3 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#0F172A' }}>오답 노트</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {results.map((r, i) => (
              <div key={i} style={{ background: r.correct ? '#F0FDF4' : '#FEF2F2', borderRadius: 12, padding: '12px 14px', border: `1px solid ${r.correct ? '#BBF7D0' : '#FECACA'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: r.correct ? '#16A34A' : '#EF4444', fontWeight: 700 }}>{r.correct ? '✓ 정답' : '✗ 오답'}</span>
                  {!r.correct && (
                    <button onClick={() => toggleBookmark(r.question.id)} style={{ background: 'none', border: 'none', fontSize: 16, cursor: 'pointer' }}>
                      {bookmarked.includes(r.question.id) ? '🔖' : '📌'}
                    </button>
                  )}
                </div>
                <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.4 }}>{r.question.question}</div>
                {!r.correct && (
                  <div style={{ marginTop: 6, fontSize: 12, color: '#64748B' }}>
                    <span style={{ color: '#EF4444' }}>내 답: {r.question.options[r.selected]}</span>
                    {' · '}
                    <span style={{ color: '#16A34A' }}>정답: {r.question.options[r.question.answer]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setQuizStarted(false)} style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: '#1E3A8A', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            다시 풀기
          </button>
        </div>
      </div>
    );
  }

  // 퀴즈 진행 화면
  if (quizStarted) {
    const q = questions[current];
    return (
      <div style={{ paddingBottom: 80 }}>
        <div style={{ background: 'linear-gradient(135deg, #0E7490, #0891B2)', padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 8 }}>
            <span>Lite 모드 {current + 1} / {questions.length}</span>
            <span>{q.subject}</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 4, height: 4 }}>
            <div style={{ background: '#F59E0B', height: 4, borderRadius: 4, width: `${((current + 1) / questions.length) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ padding: '20px 16px' }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', lineHeight: 1.6, marginBottom: 20 }}>{q.question}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              let bg = 'white', border = '#E2E8F0', color = '#374151', fontWeight = 400;
              if (answered) {
                if (i === q.answer) { bg = '#F0FDF4'; border = '#16A34A'; color = '#16A34A'; fontWeight = 700; }
                else if (i === selected && i !== q.answer) { bg = '#FEF2F2'; border = '#EF4444'; color = '#EF4444'; }
              } else if (selected === i) { bg = '#EFF6FF'; border = '#1E3A8A'; }
              return (
                <button key={i} onClick={() => handleSelect(i)} style={{ padding: '13px 16px', borderRadius: 12, border: `2px solid ${border}`, background: bg, textAlign: 'left', cursor: answered ? 'default' : 'pointer', fontSize: 14, color, fontWeight, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ minWidth: 20, fontWeight: 700, color: answered && i === q.answer ? '#16A34A' : '#94A3B8' }}>{['①','②','③','④'][i]}</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <div style={{ marginTop: 14, background: '#F8FAFC', borderRadius: 12, padding: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0E7490', marginBottom: 4 }}>해설</div>
              <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{q.explanation}</div>
            </div>
          )}
          {answered && (
            <button onClick={handleNext} style={{ marginTop: 14, width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: '#1E3A8A', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              {current + 1 < questions.length ? '다음 문제 →' : '결과 보기'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // 시작 전 선택 화면
  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg, #0E7490, #0891B2)', padding: '20px 20px 16px', color: 'white' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>오늘의 퀴즈</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>Lite 모드 · 핵심 기출 5문제</p>
      </div>

      <div style={{ padding: '16px' }}>
        {/* 카테고리 필터 */}
        <h3 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#0F172A' }}>카테고리</h3>
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          <button onClick={() => { setCatFilter('all'); setSelectedExam('all'); }} style={{ padding: '7px 14px', borderRadius: 20, border: 'none', background: catFilter === 'all' ? '#1E3A8A' : '#F1F5F9', color: catFilter === 'all' ? 'white' : '#64748B', fontWeight: catFilter === 'all' ? 700 : 400, fontSize: 13, cursor: 'pointer' }}>
            전체
          </button>
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => { setCatFilter(cat.id); setSelectedExam('all'); }} style={{ padding: '7px 14px', borderRadius: 20, border: 'none', background: catFilter === cat.id ? cat.color : '#F1F5F9', color: catFilter === cat.id ? 'white' : '#64748B', fontWeight: catFilter === cat.id ? 700 : 400, fontSize: 13, cursor: 'pointer' }}>
              {cat.label}
            </button>
          ))}
        </div>

        <h3 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#0F172A' }}>시험 선택</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          <button onClick={() => setSelectedExam('all')} style={{ padding: '13px 16px', borderRadius: 12, border: `2px solid ${selectedExam === 'all' ? '#0E7490' : '#E2E8F0'}`, background: selectedExam === 'all' ? '#ECFEFF' : 'white', textAlign: 'left', cursor: 'pointer', color: '#0F172A', fontWeight: selectedExam === 'all' ? 700 : 400, fontSize: 14 }}>
            전체 랜덤 · {availableExams.reduce((acc, e) => acc + (QUIZ_BANK[e.id]?.length || 0), 0)}문제 중 {LITE_COUNT}문제
          </button>
          {availableExams.map((exam) => {
            const cat = CATEGORIES.find((c) => c.id === exam.category);
            return (
              <button key={exam.id} onClick={() => setSelectedExam(exam.id)} style={{ padding: '13px 16px', borderRadius: 12, border: `2px solid ${selectedExam === exam.id ? '#0E7490' : '#E2E8F0'}`, background: selectedExam === exam.id ? '#ECFEFF' : 'white', textAlign: 'left', cursor: 'pointer', color: '#0F172A', fontWeight: selectedExam === exam.id ? 700 : 400, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 600 }}>{exam.name}</span>
                  <span style={{ fontSize: 11, color: 'white', background: cat?.color, padding: '1px 7px', borderRadius: 8, marginLeft: 8 }}>{cat?.label}</span>
                </div>
                <span style={{ fontSize: 12, color: '#64748B' }}>{QUIZ_BANK[exam.id]?.length}문제 중 {LITE_COUNT}문제</span>
              </button>
            );
          })}
        </div>

        <button onClick={startQuiz} style={{ width: '100%', padding: '15px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #0E7490, #0891B2)', color: 'white', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          퀴즈 시작하기 →
        </button>

        {/* 북마크된 오답 */}
        {bookmarked.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#0F172A' }}>🔖 오답 북마크 ({bookmarked.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Object.values(QUIZ_BANK).flat().filter((q) => bookmarked.includes(q.id)).map((q) => (
                <div key={q.id} style={{ background: 'white', borderRadius: 10, padding: '12px 14px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 13, color: '#0F172A', lineHeight: 1.4, marginBottom: 6 }}>{q.question}</div>
                  <div style={{ fontSize: 12, color: '#16A34A', fontWeight: 600 }}>정답: {q.options[q.answer]}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
