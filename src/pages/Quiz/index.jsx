import { useState } from 'react';
import { QUIZ_BANK } from '../../data/quizBank';
import { EXAMS } from '../../data/exams';

function getAllQuestions() {
  return Object.values(QUIZ_BANK).flat();
}

export default function Quiz() {
  const [selectedExam, setSelectedExam] = useState('all');
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  const startQuiz = () => {
    const pool = selectedExam === 'all' ? getAllQuestions() : (QUIZ_BANK[selectedExam] || []);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(10, pool.length));
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
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const correctCount = results.filter((r) => r.correct).length;

  if (!quizStarted) {
    return (
      <div style={{ paddingBottom: 80 }}>
        <div style={{ background: 'linear-gradient(135deg, #6B2FA0, #8B4CC5)', padding: '20px 20px 16px', color: 'white' }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>오늘의 퀴즈</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>매일 10문제로 실력 쌓기</p>
        </div>
        <div style={{ padding: '20px 16px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0E1C3D', marginBottom: 12 }}>시험 선택</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            <button onClick={() => setSelectedExam('all')} style={{ padding: '14px 16px', borderRadius: 12, border: `2px solid ${selectedExam === 'all' ? '#6B2FA0' : '#E5E7EB'}`, background: selectedExam === 'all' ? '#F5EEFF' : 'white', textAlign: 'left', cursor: 'pointer', color: '#0E1C3D', fontWeight: selectedExam === 'all' ? 700 : 400, fontSize: 14 }}>
              전체 문제 랜덤
            </button>
            {EXAMS.filter((e) => QUIZ_BANK[e.id]).map((exam) => (
              <button key={exam.id} onClick={() => setSelectedExam(exam.id)} style={{ padding: '14px 16px', borderRadius: 12, border: `2px solid ${selectedExam === exam.id ? '#6B2FA0' : '#E5E7EB'}`, background: selectedExam === exam.id ? '#F5EEFF' : 'white', textAlign: 'left', cursor: 'pointer', color: '#0E1C3D', fontWeight: selectedExam === exam.id ? 700 : 400, fontSize: 14 }}>
                {exam.name} — {QUIZ_BANK[exam.id]?.length ?? 0}문제
              </button>
            ))}
          </div>
          <button onClick={startQuiz} style={{ width: '100%', padding: '16px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #6B2FA0, #8B4CC5)', color: 'white', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            퀴즈 시작하기 →
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div style={{ paddingBottom: 80 }}>
        <div style={{ background: 'linear-gradient(135deg, #6B2FA0, #8B4CC5)', padding: '20px 20px 16px', color: 'white' }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>퀴즈 완료!</h1>
        </div>
        <div style={{ padding: '24px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 8 }}>{pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪'}</div>
          <div style={{ fontSize: 48, fontWeight: 800, color: pct >= 60 ? '#00A878' : '#EF4444' }}>{pct}점</div>
          <div style={{ fontSize: 16, color: '#6B7280', marginTop: 4 }}>
            {questions.length}문제 중 {correctCount}개 정답
          </div>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
            {results.map((r, i) => (
              <div key={i} style={{ background: r.correct ? '#F0FDF4' : '#FEF2F2', borderRadius: 12, padding: '12px 14px', border: `1px solid ${r.correct ? '#BBF7D0' : '#FECACA'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#6B7280' }}>Q{i + 1}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: r.correct ? '#00A878' : '#EF4444' }}>{r.correct ? '✓ 정답' : '✗ 오답'}</span>
                </div>
                <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.4 }}>{r.question.question}</div>
                {!r.correct && (
                  <div style={{ marginTop: 6, fontSize: 12, color: '#6B7280' }}>
                    <span style={{ color: '#EF4444' }}>내 답: {r.question.options[r.selected]}</span>
                    {' · '}
                    <span style={{ color: '#00A878' }}>정답: {r.question.options[r.question.answer]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setQuizStarted(false)} style={{ marginTop: 24, width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: '#0E1C3D', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            다시 풀기
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg, #6B2FA0, #8B4CC5)', padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 8 }}>
          <span>{current + 1} / {questions.length}</span>
          <span>{q.subject}</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 4, height: 4 }}>
          <div style={{ background: '#F2C94C', height: 4, borderRadius: 4, width: `${((current + 1) / questions.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
      </div>

      <div style={{ padding: '24px 16px' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#0E1C3D', lineHeight: 1.6, marginBottom: 24 }}>
          {q.question}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, i) => {
            let bg = 'white', border = '#E5E7EB', color = '#374151';
            if (answered) {
              if (i === q.answer) { bg = '#F0FDF4'; border = '#00A878'; color = '#00A878'; }
              else if (i === selected && i !== q.answer) { bg = '#FEF2F2'; border = '#EF4444'; color = '#EF4444'; }
            } else if (selected === i) {
              bg = '#F5EEFF'; border = '#6B2FA0';
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} style={{ padding: '14px 16px', borderRadius: 12, border: `2px solid ${border}`, background: bg, textAlign: 'left', cursor: answered ? 'default' : 'pointer', fontSize: 14, color, fontWeight: answered && i === q.answer ? 700 : 400, display: 'flex', gap: 10 }}>
                <span style={{ minWidth: 20, fontWeight: 700 }}>①②③④'[i]</span>
                {['①','②','③','④'][i]} {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ marginTop: 16, background: '#F8FAFF', borderRadius: 12, padding: '14px', border: '1px solid #E5EAFF' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B2FA0', marginBottom: 4 }}>해설</div>
            <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{q.explanation}</div>
          </div>
        )}

        {answered && (
          <button onClick={handleNext} style={{ marginTop: 16, width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: '#0E1C3D', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            {current + 1 < questions.length ? '다음 문제 →' : '결과 보기'}
          </button>
        )}
      </div>
    </div>
  );
}
