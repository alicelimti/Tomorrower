export const EXAMS = [
  {
    id: 'adsp',
    name: 'ADSP',
    fullName: '데이터분석 준전문가',
    org: '한국데이터산업진흥원',
    orgUrl: 'https://www.dataq.or.kr',
    passScore: 60,
    failScore: 40,
    passRate: '40~50%',
    color: '#003087',
    subjects: ['데이터 이해', '데이터 분석 기획', '데이터 분석', '데이터 시각화'],
  },
  {
    id: 'sqld',
    name: 'SQLD',
    fullName: 'SQL 개발자',
    org: '한국데이터산업진흥원',
    orgUrl: 'https://www.dataq.or.kr',
    passScore: 60,
    failScore: 40,
    passRate: '50~60%',
    color: '#0E1C3D',
    subjects: ['데이터 모델링의 이해', 'SQL 기본 및 활용'],
  },
  {
    id: 'credit-analyst',
    name: '신용분석사',
    fullName: '신용분석사',
    org: '한국금융연수원',
    orgUrl: 'https://www.kbiz.or.kr',
    passScore: 60,
    failScore: 40,
    passRate: '20~30%',
    color: '#6B2FA0',
    subjects: ['재무분석', '신용조사 및 평가', '여신심사 및 관리'],
  },
  {
    id: 'investment-manager',
    name: '투자운용사',
    fullName: '투자운용사',
    org: '한국금융투자협회',
    orgUrl: 'https://www.kofia.or.kr',
    passScore: 70,
    failScore: 40,
    passRate: '30~40%',
    color: '#00A878',
    subjects: ['펀드투자', '투자운용 및 전략', '법규 및 세제'],
  },
  {
    id: 'fund-agent',
    name: '펀드투자권유대행인',
    fullName: '펀드투자권유대행인',
    org: '한국금융투자협회',
    orgUrl: 'https://www.kofia.or.kr',
    passScore: 70,
    failScore: 40,
    passRate: '60~70%',
    color: '#003087',
    subjects: ['펀드일반', '법규'],
  },
  {
    id: 'securities-analyst',
    name: '증권분석사',
    fullName: '증권분석사',
    org: '한국증권분석사회',
    orgUrl: 'https://www.kaseba.or.kr',
    passScore: 60,
    failScore: 40,
    passRate: '25~35%',
    color: '#D4A82E',
    subjects: ['재무분석', '증권분석', '포트폴리오 관리'],
  },
];

// 2025년 주요 시험 일정 (예시 데이터 — 실제 공식 일정으로 교체 필요)
export const EXAM_SCHEDULE = [
  // SQLD
  { id: 's1', examId: 'sqld', type: 'register_start', date: '2025-02-10', label: 'SQLD 접수 시작' },
  { id: 's2', examId: 'sqld', type: 'register_end', date: '2025-02-14', label: 'SQLD 접수 마감' },
  { id: 's3', examId: 'sqld', type: 'exam', date: '2025-03-23', label: 'SQLD 시험일' },
  { id: 's4', examId: 'sqld', type: 'result', date: '2025-04-25', label: 'SQLD 합격 발표' },

  // ADSP
  { id: 'a1', examId: 'adsp', type: 'register_start', date: '2025-02-17', label: 'ADSP 접수 시작' },
  { id: 'a2', examId: 'adsp', type: 'register_end', date: '2025-03-07', label: 'ADSP 접수 마감' },
  { id: 'a3', examId: 'adsp', type: 'exam', date: '2025-04-05', label: 'ADSP 시험일' },
  { id: 'a4', examId: 'adsp', type: 'result', date: '2025-05-09', label: 'ADSP 합격 발표' },

  // 신용분석사
  { id: 'c1', examId: 'credit-analyst', type: 'register_start', date: '2025-03-03', label: '신용분석사 접수 시작' },
  { id: 'c2', examId: 'credit-analyst', type: 'register_end', date: '2025-03-14', label: '신용분석사 접수 마감' },
  { id: 'c3', examId: 'credit-analyst', type: 'exam', date: '2025-04-12', label: '신용분석사 시험일' },

  // 투자운용사
  { id: 'i1', examId: 'investment-manager', type: 'register_start', date: '2025-03-17', label: '투자운용사 접수 시작' },
  { id: 'i2', examId: 'investment-manager', type: 'register_end', date: '2025-03-28', label: '투자운용사 접수 마감' },
  { id: 'i3', examId: 'investment-manager', type: 'exam', date: '2025-04-26', label: '투자운용사 시험일' },
];

export const SCHEDULE_TYPE_COLORS = {
  register_start: '#00A878',
  register_end: '#F2C94C',
  exam: '#003087',
  result: '#6B2FA0',
  cancel: '#EF4444',
};

export const SCHEDULE_TYPE_LABELS = {
  register_start: '접수 시작',
  register_end: '접수 마감',
  exam: '시험일',
  result: '합격 발표',
  cancel: '취소·변경',
};
