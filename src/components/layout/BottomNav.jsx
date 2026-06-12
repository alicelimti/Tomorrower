import { NavLink } from 'react-router-dom';

const BRAND = '#7875E8';
const MUTED = '#C8B8E8';

const NAV_ITEMS = [
  {
    to: '/',
    label: '홈',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? BRAND : 'none'} stroke={active ? BRAND : MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    to: '/schedule',
    label: '일정',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? BRAND : MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        {active && <circle cx="12" cy="16" r="2" fill="#F0C060" stroke="none" />}
      </svg>
    ),
  },
  {
    to: '/info',
    label: '정보',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? BRAND : MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    to: '/quiz',
    label: '퀴즈',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? BRAND : MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" strokeWidth="2.5" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: 'white', borderTop: '1px solid #EDE8FF', paddingBottom: 'env(safe-area-inset-bottom)', zIndex: 50 }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 60 }}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1, textDecoration: 'none' }}
          >
            {({ isActive }) => (
              <>
                {item.icon(isActive)}
                <span style={{ fontSize: 11, color: isActive ? BRAND : MUTED, fontWeight: isActive ? 700 : 400 }}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
