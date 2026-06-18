import { useRegisterSW } from 'virtual:pwa-register/react';

export default function UpdatePrompt() {
  const { needRefresh: [needRefresh], updateServiceWorker } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)', maxWidth: 398,
      background: '#2D1F5E', borderRadius: 14, padding: '14px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(120,117,232,0.35)', zIndex: 100,
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>새 버전이 있습니다</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>새로고침하면 최신 버전으로 업데이트돼요</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 12 }}>
        <button
          onClick={() => updateServiceWorker(false)}
          style={{ padding: '7px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 12, cursor: 'pointer' }}
        >
          나중에
        </button>
        <button
          onClick={() => updateServiceWorker(true)}
          style={{ padding: '7px 14px', borderRadius: 10, border: 'none', background: '#7875E8', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
        >
          새로고침
        </button>
      </div>
    </div>
  );
}
