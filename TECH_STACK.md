# Tomorrower 기술 스택

## 프론트엔드

| 도구 | 버전 | 용도 |
|---|---|---|
| **React** | 19 | UI 컴포넌트, 상태 관리 |
| **React Router DOM** | v7 | SPA 라우팅 (탭 전환) |
| **Vite** | v8 | 빌드 도구 및 개발 서버 |
| **Tailwind CSS** | v4 | CSS 유틸리티 |
| **vite-plugin-pwa** | v1.3 | PWA 설정, 서비스 워커, Web App Manifest |

## 백엔드 / 인프라

| 도구 | 용도 |
|---|---|
| **Supabase** | DB (`user_exams` 테이블), Google OAuth, Row Level Security |

## 배포

| 도구 | 용도 |
|---|---|
| **GitHub Pages** | 정적 호스팅 |
| **GitHub Actions** | `main` 브랜치 푸시 시 자동 빌드·배포 CI/CD |

## 기타

| 도구 | 용도 |
|---|---|
| **Workbox** (vite-plugin-pwa 내장) | 오프라인 캐싱, 앱 셸 precache |
| **Pretendard** (CDN) | 한국어 최적화 폰트 |

---

> ~~Firebase~~ → Supabase로 교체 (2026-06-18)  
> ~~Vercel~~ → GitHub Pages로 배포 전환 (2026-06-16)
