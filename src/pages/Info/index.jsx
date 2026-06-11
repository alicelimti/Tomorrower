import { useState } from 'react';
import { EXAMS } from '../../data/exams';

export default function Info() {
  const [selected, setSelected] = useState(EXAMS[0].id);
  const exam = EXAMS.find((e) => e.id === selected);

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg, #0E1C3D 0%, #003087 100%)', padding: '20px 20px 16px', color: 'white' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>시험 정보</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>합격 기준 · 공식 사이트</p>
      </div>

      {/* 시험 선택 탭 */}
      <div style={{ overflowX: 'auto', padding: '12px 16px 0', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', gap: 6, minWidth: 'max-content' }}>
          {EXAMS.map((e) => (
            <button key={e.id} onClick={() => setSelected(e.id)} style={{ padding: '8px 14px', borderRadius: 20, border: 'none', background: selected === e.id ? e.color : '#F3F4F6', color: selected === e.id ? 'white' : '#6B7280', fontWeight: selected === e.id ? 700 : 400, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {e.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* 시험 기본 정보 */}
        <div style={{ background: exam.color, borderRadius: 16, padding: '20px', marginBottom: 16, color: 'white' }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{exam.name}</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 12 }}>{exam.fullName}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>주관: {exam.org}</div>
        </div>

        {/* 합격 기준 카드 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
          <div style={{ background: '#F0FDF4', borderRadius: 12, padding: '14px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#00A878' }}>{exam.passScore}점</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>합격 기준</div>
          </div>
          <div style={{ background: '#FEF3C7', borderRadius: 12, padding: '14px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#D97706' }}>{exam.failScore}점</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>과락 기준</div>
          </div>
          <div style={{ background: '#EEF2FF', borderRadius: 12, padding: '14px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#4F46E5' }}>{exam.passRate}</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>평균 합격률</div>
          </div>
        </div>

        {/* 시험 과목 */}
        <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 16, border: '1px solid #E5E7EB' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700, color: '#0E1C3D' }}>시험 과목</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {exam.subjects.map((subject, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: exam.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#374151' }}>{subject}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 공식 사이트 */}
        <div style={{ background: 'white', borderRadius: 14, padding: '16px', border: '1px solid #E5E7EB' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700, color: '#0E1C3D' }}>공식 사이트</h3>
          <a href={exam.orgUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#F8FAFF', borderRadius: 12, textDecoration: 'none', border: '1px solid #E5EAFF' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0E1C3D' }}>{exam.org}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{exam.orgUrl}</div>
            </div>
            <span style={{ fontSize: 20 }}>→</span>
          </a>
          <p style={{ margin: '10px 0 0', fontSize: 12, color: '#9CA3AF' }}>
            * 공식 사이트에서 원서 접수 및 최신 일정을 확인하세요.
          </p>
        </div>

        {/* 전체 시험 합격 기준 테이블 */}
        <h3 style={{ margin: '24px 0 12px', fontSize: 15, fontWeight: 700, color: '#0E1C3D' }}>전체 합격 컷트라인</h3>
        <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #E5E7EB' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#0E1C3D', color: 'white' }}>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600 }}>시험명</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 600 }}>합격</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 600 }}>과락</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 600 }}>합격률</th>
              </tr>
            </thead>
            <tbody>
              {EXAMS.map((e, i) => (
                <tr key={e.id} style={{ background: i % 2 === 0 ? 'white' : '#F9FAFB' }}>
                  <td style={{ padding: '10px 8px', fontWeight: 600, color: e.color }}>{e.name}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', color: '#374151' }}>{e.passScore}점</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', color: '#EF4444' }}>{e.failScore}점</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', color: '#6B7280' }}>{e.passRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
