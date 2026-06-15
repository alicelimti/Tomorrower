import { useState } from 'react';
import { EXAMS, CATEGORIES } from '../../data/exams';

export default function Info() {
  const [catFilter, setCatFilter] = useState('it-data');
  const [selected, setSelected] = useState('adsp');

  const filteredExams = EXAMS.filter((e) => e.category === catFilter);
  const exam = EXAMS.find((e) => e.id === selected) || filteredExams[0];
  const cat = CATEGORIES.find((c) => c.id === exam?.category);

  const handleCatChange = (catId) => {
    setCatFilter(catId);
    const first = EXAMS.find((e) => e.category === catId);
    if (first) setSelected(first.id);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg, #7875E8 0%, #A87FD8 55%, #D4A4DC 100%)', padding: '20px 20px 0', color: 'white' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>시험 정보</h1>
        <p style={{ margin: '4px 0 12px', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>합격 기준 · 공식 사이트</p>
        {/* 카테고리 탭 */}
        <div style={{ display: 'flex', gap: 0 }}>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => handleCatChange(c.id)} style={{ flex: 1, padding: '10px 0', border: 'none', background: 'transparent', color: catFilter === c.id ? 'white' : 'rgba(255,255,255,0.5)', fontWeight: catFilter === c.id ? 700 : 400, fontSize: 14, cursor: 'pointer', borderBottom: catFilter === c.id ? '2px solid #F59E0B' : '2px solid transparent' }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 시험 선택 칩 */}
      <div style={{ overflowX: 'auto', padding: '12px 16px', borderBottom: '1px solid #EDE8FF', background: 'white' }}>
        <div style={{ display: 'flex', gap: 6, minWidth: 'max-content' }}>
          {filteredExams.map((e) => (
            <button key={e.id} onClick={() => setSelected(e.id)} style={{ padding: '7px 14px', borderRadius: 20, border: 'none', background: selected === e.id ? e.color : '#EDE8FF', color: selected === e.id ? 'white' : '#9B88CC', fontWeight: selected === e.id ? 700 : 400, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {e.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {exam && (
          <>
            {/* 시험 타이틀 */}
            <div style={{ background: exam.color, borderRadius: 16, padding: '18px 20px', marginBottom: 14, color: 'white' }}>
              <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 3 }}>{exam.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 10 }}>{exam.fullName}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>주관: {exam.org}</div>
            </div>

            {/* 합격 기준 */}
            <div style={{ display: 'grid', gridTemplateColumns: exam.passScore ? '1fr 1fr 1fr' : '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {exam.passScore && (
                <div style={{ background: '#F0FDF4', borderRadius: 12, padding: '14px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#48C89A' }}>{exam.passScore}점</div>
                  <div style={{ fontSize: 11, color: '#9B88CC', marginTop: 2 }}>합격 기준</div>
                </div>
              )}
              {exam.failScore && (
                <div style={{ background: '#FEF3C7', borderRadius: 12, padding: '14px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#F0C060' }}>{exam.failScore}점</div>
                  <div style={{ fontSize: 11, color: '#9B88CC', marginTop: 2 }}>과락 기준</div>
                </div>
              )}
              <div style={{ background: '#EFF6FF', borderRadius: 12, padding: '14px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#7875E8' }}>{exam.passRate}</div>
                <div style={{ fontSize: 11, color: '#9B88CC', marginTop: 2 }}>평균 합격률</div>
              </div>
            </div>

            {/* 검정료 */}
            {exam.fee && (
              <div style={{ background: 'white', borderRadius: 14, padding: '14px 16px', marginBottom: 14, border: '1px solid #EDE8FF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#2D1F5E' }}>검정료</span>
                <span style={{ fontSize: 13, color: '#9B5ED8', fontWeight: 700 }}>{exam.fee}</span>
              </div>
            )}

            {/* 시험 과목 */}
            <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #EDE8FF' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700, color: '#2D1F5E' }}>시험 과목</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {exam.subjects.map((subject, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: exam.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: '#374151' }}>{subject}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 공식 사이트 */}
            <div style={{ background: 'white', borderRadius: 14, padding: '16px', border: '1px solid #EDE8FF' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700, color: '#2D1F5E' }}>공식 사이트</h3>
              <a href={exam.orgUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#FAF8FF', borderRadius: 12, textDecoration: 'none', border: '1px solid #EDE8FF' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#2D1F5E' }}>{exam.org}</div>
                  <div style={{ fontSize: 12, color: '#C8B8E8', marginTop: 2 }}>{exam.orgUrl}</div>
                </div>
                <span style={{ fontSize: 18, color: '#7875E8' }}>→</span>
              </a>
            </div>

            {/* 카테고리 전체 합격 기준 */}
            <h3 style={{ margin: '22px 0 10px', fontSize: 14, fontWeight: 700, color: '#2D1F5E' }}>
              {cat?.label} 합격 컷트라인 비교
            </h3>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #EDE8FF' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: '#7875E8', color: 'white' }}>
                    <th style={{ padding: '10px 10px', textAlign: 'left', fontWeight: 600 }}>시험명</th>
                    <th style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 600 }}>합격</th>
                    <th style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 600 }}>과락</th>
                    <th style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 600 }}>합격률</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.map((e, i) => (
                    <tr key={e.id} style={{ background: e.id === selected ? '#EFF6FF' : i % 2 === 0 ? 'white' : '#FAF8FF', cursor: 'pointer' }} onClick={() => setSelected(e.id)}>
                      <td style={{ padding: '10px 10px', fontWeight: 600, color: e.color }}>{e.name}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#374151' }}>{e.passScore ? `${e.passScore}점` : '—'}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#EF6B8A' }}>{e.failScore ? `${e.failScore}점` : '—'}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#9B88CC', fontSize: 11 }}>{e.passRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
