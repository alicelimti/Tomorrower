const BADGES = [
  { id: 'first-quiz', emoji: '🎯', name: '첫 퀴즈', desc: '첫 번째 퀴즈 완료', unlocked: true },
  { id: 'streak-3', emoji: '🔥', name: '3일 연속', desc: '3일 연속 퀴즈 완료', unlocked: true },
  { id: 'streak-7', emoji: '⚡', name: '7일 연속', desc: '7일 연속 퀴즈 완료', unlocked: false },
  { id: 'perfect', emoji: '💎', name: '만점왕', desc: '퀴즈 10/10 달성', unlocked: false },
  { id: 'exam-reg', emoji: '📋', name: '원서 접수', desc: '시험 원서 접수 완료', unlocked: false },
  { id: 'pass', emoji: '🏆', name: '합격!', desc: '자격증 합격 달성', unlocked: false },
];

const WEEKLY_STATS = [
  { day: '월', count: 10 },
  { day: '화', count: 7 },
  { day: '수', count: 10 },
  { day: '목', count: 3 },
  { day: '금', count: 0 },
  { day: '토', count: 10 },
  { day: '일', count: 5 },
];

export default function My() {
  const totalSolved = WEEKLY_STATS.reduce((a, b) => a + b.count, 0);
  const maxCount = Math.max(...WEEKLY_STATS.map((d) => d.count));

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg, #0E1C3D 0%, #003087 100%)', padding: '20px 20px 16px', color: 'white' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>마이페이지</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>학습 현황 & 달성 배지</p>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* 프로필 카드 */}
        <div style={{ background: 'white', borderRadius: 16, padding: '20px', marginBottom: 16, border: '1px solid #E5E7EB', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: 'linear-gradient(135deg, #0E1C3D, #6B2FA0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
            T
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#0E1C3D' }}>미루니</div>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>Firebase 연동 후 실제 프로필로 교체</div>
          </div>
        </div>

        {/* 이번 주 학습 현황 */}
        <div style={{ background: 'white', borderRadius: 16, padding: '16px', marginBottom: 16, border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#0E1C3D' }}>이번 주 학습</h3>
            <span style={{ fontSize: 13, color: '#6B2FA0', fontWeight: 700 }}>{totalSolved}문제 풀이</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 80 }}>
            {WEEKLY_STATS.map((d) => (
              <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', background: d.count > 0 ? '#6B2FA0' : '#F3F4F6', borderRadius: 4, height: maxCount > 0 ? `${(d.count / maxCount) * 60}px` : '4px', minHeight: 4, transition: 'height 0.3s' }} />
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 통계 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[
            { label: '총 풀이', value: '45문제', color: '#003087' },
            { label: '정답률', value: '72%', color: '#00A878' },
            { label: '연속', value: '3일', color: '#F2C94C', textColor: '#0E1C3D' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: 'white', borderRadius: 12, padding: '14px 10px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: stat.color ?? stat.textColor }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 배지 */}
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700, color: '#0E1C3D' }}>달성 배지</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {BADGES.map((badge) => (
            <div key={badge.id} style={{ background: badge.unlocked ? 'white' : '#F9FAFB', borderRadius: 14, padding: '16px 8px', textAlign: 'center', border: `1px solid ${badge.unlocked ? '#E5E7EB' : '#F3F4F6'}`, opacity: badge.unlocked ? 1 : 0.5 }}>
              <div style={{ fontSize: 28, marginBottom: 6, filter: badge.unlocked ? 'none' : 'grayscale(1)' }}>{badge.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0E1C3D' }}>{badge.name}</div>
              <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2, lineHeight: 1.3 }}>{badge.desc}</div>
            </div>
          ))}
        </div>

        {/* 알림 설정 (Phase 1 후 구현) */}
        <div style={{ marginTop: 24, background: '#F8FAFF', borderRadius: 14, padding: '16px', border: '1px solid #E5EAFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0E1C3D' }}>📣 스마트 알림</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>D-30/7/1 자동 푸시 알림</div>
            </div>
            <div style={{ width: 44, height: 24, borderRadius: 12, background: '#003087', position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: 'white', position: 'absolute', top: 2, right: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
