export const CATEGORIES = [
  { id: 'it-data',  label: 'IT·Data',  color: '#6068E8', bg: '#EFEDFF' },
  { id: 'finance',  label: '금융·회계', color: '#9B5ED8', bg: '#F5EEFF' },
{ id: 'language', label: '언어',      color: '#C060C8', bg: '#FDF0FF' },
];

export const EXAMS = [
  // ── A. 데이터 및 IT 역량 (IT·Data) ──
  {
    id: 'adsp',
    category: 'it-data',
    name: 'ADsP',
    fullName: '데이터분석 준전문가',
    org: '한국데이터산업진흥원',
    orgUrl: 'https://www.dataq.or.kr',
    passScore: 60,
    failScore: 40,
    passRate: '40~50%',
    color: '#6068E8',
    subjects: ['데이터 이해', '데이터 분석 기획', '데이터 분석', '데이터 시각화'],
  },
  {
    id: 'sqld',
    category: 'it-data',
    name: 'SQLD',
    fullName: 'SQL 개발자',
    org: '한국데이터산업진흥원',
    orgUrl: 'https://www.dataq.or.kr',
    passScore: 60,
    failScore: 40,
    passRate: '50~60%',
    color: '#7875E8',
    subjects: ['데이터 모델링의 이해', 'SQL 기본 및 활용'],
  },
  {
    id: 'computer',
    category: 'it-data',
    name: '컴활 1급',
    fullName: '컴퓨터활용능력 1급',
    org: '대한상공회의소',
    orgUrl: 'https://license.korcham.net',
    passScore: 70,
    failScore: 40,
    passRate: '20~30%',
    color: '#8068E8',
    subjects: ['컴퓨터 일반', '스프레드시트 일반', '데이터베이스 일반'],
  },
  // ── B. 회계·재무 및 금융 실무 (Finance/Accounting) ──
  {
    id: 'credit-analyst',
    category: 'finance',
    name: '신용분석사',
    fullName: '신용분석사 (CCA)',
    org: '한국금융연수원',
    orgUrl: 'https://www.kbi.or.kr',
    passScore: 60,
    failScore: 40,
    passRate: '20~30%',
    fee: '66,000원 (1부 28,000원 / 2부 39,000원)',
    color: '#9B5ED8',
    subjects: ['재무분석', '신용조사 및 평가', '여신심사 및 관리'],
  },
  {
    id: 'investment-manager',
    category: 'finance',
    name: '투자자산운용사',
    fullName: '투자자산운용사',
    org: '한국금융투자협회',
    orgUrl: 'https://www.kofia.or.kr',
    passScore: 70,
    failScore: 40,
    passRate: '30~40%',
    color: '#A87FD8',
    subjects: ['펀드투자', '투자운용 및 전략', '법규 및 세제'],
  },
  {
    id: 'forex-1',
    category: 'finance',
    name: '외환전문역 I종',
    fullName: '외환전문역 I종 (국가공인자격)',
    org: '한국금융연수원',
    orgUrl: 'https://www.kbi.or.kr',
    passScore: 60,
    failScore: 40,
    passRate: '30~40%',
    fee: '55,000원',
    color: '#B068D8',
    subjects: ['외환 관련 법규 및 제도', '외국환 거래 실무', '수출입 결제 실무'],
  },
  {
    id: 'forex-2',
    category: 'finance',
    name: '외환전문역 II종',
    fullName: '외환전문역 II종 (국가공인자격)',
    org: '한국금융연수원',
    orgUrl: 'https://www.kbi.or.kr',
    passScore: 60,
    failScore: 40,
    passRate: '35~45%',
    fee: '55,000원',
    color: '#B878DC',
    subjects: ['외환 관련 법규 및 제도', '수출입 결제 실무', '무역금융 실무'],
  },
  {
    id: 'computer-accounting',
    category: 'finance',
    name: '전산회계',
    fullName: '전산회계 1급',
    org: '한국세무사회',
    orgUrl: 'https://www.kacpta.or.kr',
    passScore: 70,
    failScore: null,
    passRate: '40~55%',
    color: '#A060D0',
    subjects: ['재무회계', '원가회계', '세무회계', '회계 정보 처리'],
  },
  {
    id: 'financial-manager',
    category: 'finance',
    name: '재경관리사',
    fullName: '재경관리사',
    org: '삼일인재원',
    orgUrl: 'https://www.samilexam.com',
    passScore: 70,
    failScore: 40,
    passRate: '15~25%',
    color: '#9858C8',
    subjects: ['재무회계', '세무회계', '원가관리회계'],
  },
  // 언어
  {
    id: 'opic',
    category: 'language',
    name: 'OPIc',
    fullName: 'OPIc (영어/중국어)',
    org: 'ACTFL / YBM',
    orgUrl: 'https://www.opic.or.kr',
    passScore: null,
    failScore: null,
    passRate: 'AL 약 5%',
    color: '#A87FD8',
    subjects: ['Personal Background', 'Roleplays', 'Surprise Questions'],
  },
  {
    id: 'toeic',
    category: 'language',
    name: 'TOEIC',
    fullName: 'TOEIC LC+RC',
    org: 'YBM',
    orgUrl: 'https://www.toeic.co.kr',
    passScore: null,
    failScore: null,
    passRate: '점수제 (990점 만점)',
    color: '#C878D8',
    subjects: ['Listening Comprehension', 'Reading Comprehension'],
  },
  {
    id: 'toeic-s',
    category: 'language',
    name: 'TOEIC S',
    fullName: 'TOEIC Speaking',
    org: 'YBM',
    orgUrl: 'https://www.toeic.co.kr',
    passScore: null,
    failScore: null,
    passRate: '점수제 (200점 만점)',
    color: '#D490E0',
    subjects: ['Read a Text Aloud', 'Describe a Picture', 'Respond to Questions', 'Express an Opinion'],
  },
];

// 2026년 실제 시험 일정 (출처: 한국데이터산업진흥원 공식 홈페이지)
export const EXAM_SCHEDULE = [
  // ── ADSP 데이터분석 준전문가 ──
  // 제49회 합격 발표 (과거 회차 결과)
  { id: 'adsp-49-r',  examId: 'adsp', type: 'result',         date: '2026-06-05', label: 'ADSP 제49회 합격 발표' },
  // 제50회 (접수 7.6~10 / 시험 8.8 / 합발 8.28)
  { id: 'adsp-50-rs', examId: 'adsp', type: 'register_start', date: '2026-07-06', label: 'ADSP 제50회 접수 시작' },
  { id: 'adsp-50-re', examId: 'adsp', type: 'register_end',   date: '2026-07-10', label: 'ADSP 제50회 접수 마감' },
  { id: 'adsp-50-ex', examId: 'adsp', type: 'exam',           date: '2026-08-08', label: 'ADSP 제50회 시험일' },
  { id: 'adsp-50-r',  examId: 'adsp', type: 'result',         date: '2026-08-28', label: 'ADSP 제50회 합격 발표' },
  { id: 'adsp-50-nx', examId: 'adsp', type: 'next_exam',      date: '2026-10-31', label: 'ADSP 제51회 시험 예정' },
  // 제51회 (접수 9.28~10.2 / 시험 10.31 / 합발 11.20)
  { id: 'adsp-51-rs', examId: 'adsp', type: 'register_start', date: '2026-09-28', label: 'ADSP 제51회 접수 시작' },
  { id: 'adsp-51-re', examId: 'adsp', type: 'register_end',   date: '2026-10-02', label: 'ADSP 제51회 접수 마감' },
  { id: 'adsp-51-ex', examId: 'adsp', type: 'exam',           date: '2026-10-31', label: 'ADSP 제51회 시험일' },
  { id: 'adsp-51-r',  examId: 'adsp', type: 'result',         date: '2026-11-20', label: 'ADSP 제51회 합격 발표' },

  // ── SQLD SQL 개발자 ──
  // 제61회 합격 발표 (시험은 5.31 완료, 결과만 미발표)
  { id: 'sqld-61-r',  examId: 'sqld', type: 'result',         date: '2026-06-19', label: 'SQLD 제61회 합격 발표' },
  // 제62회 (접수 7.20~24 / 시험 8.22 / 합발 9.11)
  { id: 'sqld-62-rs', examId: 'sqld', type: 'register_start', date: '2026-07-20', label: 'SQLD 제62회 접수 시작' },
  { id: 'sqld-62-re', examId: 'sqld', type: 'register_end',   date: '2026-07-24', label: 'SQLD 제62회 접수 마감' },
  { id: 'sqld-62-ex', examId: 'sqld', type: 'exam',           date: '2026-08-22', label: 'SQLD 제62회 시험일' },
  { id: 'sqld-62-r',  examId: 'sqld', type: 'result',         date: '2026-09-11', label: 'SQLD 제62회 합격 발표' },
  { id: 'sqld-62-nx', examId: 'sqld', type: 'next_exam',      date: '2026-11-14', label: 'SQLD 제63회 시험 예정' },
  // 제63회 (접수 10.12~16 / 시험 11.14 / 합발 12.4)
  { id: 'sqld-63-rs', examId: 'sqld', type: 'register_start', date: '2026-10-12', label: 'SQLD 제63회 접수 시작' },
  { id: 'sqld-63-re', examId: 'sqld', type: 'register_end',   date: '2026-10-16', label: 'SQLD 제63회 접수 마감' },
  { id: 'sqld-63-ex', examId: 'sqld', type: 'exam',           date: '2026-11-14', label: 'SQLD 제63회 시험일' },
  { id: 'sqld-63-r',  examId: 'sqld', type: 'result',         date: '2026-12-04', label: 'SQLD 제63회 합격 발표' },

  // ── 재경관리사 ──
  // 125회 (접수 5.26~6.2 마감 / 시험 6.20 / 합발 6.26)
  { id: 'fm-125-rs', examId: 'financial-manager', type: 'register_start', date: '2026-05-26', label: '재경관리사 125회 접수 시작' },
  { id: 'fm-125-re', examId: 'financial-manager', type: 'register_end',   date: '2026-06-02', label: '재경관리사 125회 접수 마감' },
  { id: 'fm-125-ex', examId: 'financial-manager', type: 'exam',           date: '2026-06-20', label: '재경관리사 125회 시험일' },
  { id: 'fm-125-r',  examId: 'financial-manager', type: 'result',         date: '2026-06-26', label: '재경관리사 125회 합격 발표' },
  { id: 'fm-125-nx', examId: 'financial-manager', type: 'next_exam',      date: '2026-07-25', label: '재경관리사 126회 시험 예정' },
  // 126회 (접수 6.30~7.7 / 시험 7.25 / 합발 7.31)
  { id: 'fm-126-rs', examId: 'financial-manager', type: 'register_start', date: '2026-06-30', label: '재경관리사 126회 접수 시작' },
  { id: 'fm-126-re', examId: 'financial-manager', type: 'register_end',   date: '2026-07-07', label: '재경관리사 126회 접수 마감' },
  { id: 'fm-126-ex', examId: 'financial-manager', type: 'exam',           date: '2026-07-25', label: '재경관리사 126회 시험일' },
  { id: 'fm-126-r',  examId: 'financial-manager', type: 'result',         date: '2026-07-31', label: '재경관리사 126회 합격 발표' },
  { id: 'fm-126-nx', examId: 'financial-manager', type: 'next_exam',      date: '2026-09-19', label: '재경관리사 127회 시험 예정' },
  // 127회 (접수 8.20~8.27 / 시험 9.19 / 합발 9.29)
  { id: 'fm-127-rs', examId: 'financial-manager', type: 'register_start', date: '2026-08-20', label: '재경관리사 127회 접수 시작' },
  { id: 'fm-127-re', examId: 'financial-manager', type: 'register_end',   date: '2026-08-27', label: '재경관리사 127회 접수 마감' },
  { id: 'fm-127-ex', examId: 'financial-manager', type: 'exam',           date: '2026-09-19', label: '재경관리사 127회 시험일' },
  { id: 'fm-127-r',  examId: 'financial-manager', type: 'result',         date: '2026-09-29', label: '재경관리사 127회 합격 발표' },
  { id: 'fm-127-nx', examId: 'financial-manager', type: 'next_exam',      date: '2026-11-14', label: '재경관리사 128회 시험 예정' },
  // 128회 (접수 10.15~10.22 / 시험 11.14 / 합발 11.20)
  { id: 'fm-128-rs', examId: 'financial-manager', type: 'register_start', date: '2026-10-15', label: '재경관리사 128회 접수 시작' },
  { id: 'fm-128-re', examId: 'financial-manager', type: 'register_end',   date: '2026-10-22', label: '재경관리사 128회 접수 마감' },
  { id: 'fm-128-ex', examId: 'financial-manager', type: 'exam',           date: '2026-11-14', label: '재경관리사 128회 시험일' },
  { id: 'fm-128-r',  examId: 'financial-manager', type: 'result',         date: '2026-11-20', label: '재경관리사 128회 합격 발표' },
  { id: 'fm-128-nx', examId: 'financial-manager', type: 'next_exam',      date: '2026-12-19', label: '재경관리사 129회 시험 예정' },
  // 129회 (접수 11.24~12.1 / 시험 12.19 / 합발 12.24)
  { id: 'fm-129-rs', examId: 'financial-manager', type: 'register_start', date: '2026-11-24', label: '재경관리사 129회 접수 시작' },
  { id: 'fm-129-re', examId: 'financial-manager', type: 'register_end',   date: '2026-12-01', label: '재경관리사 129회 접수 마감' },
  { id: 'fm-129-ex', examId: 'financial-manager', type: 'exam',           date: '2026-12-19', label: '재경관리사 129회 시험일' },
  { id: 'fm-129-r',  examId: 'financial-manager', type: 'result',         date: '2026-12-24', label: '재경관리사 129회 합격 발표' },

  // ── 외환전문역 I종 ──
  // 56회 (접수 6.2~6.9 마감 / 시험 7.11 / 합발 7.24)
  { id: 'fx1-56-rs', examId: 'forex-1', type: 'register_start', date: '2026-06-02', label: '외환전문역 I종 56회 접수 시작' },
  { id: 'fx1-56-re', examId: 'forex-1', type: 'register_end',   date: '2026-06-09', label: '외환전문역 I종 56회 접수 마감' },
  { id: 'fx1-56-ex', examId: 'forex-1', type: 'exam',           date: '2026-07-11', label: '외환전문역 I종 56회 시험일' },
  { id: 'fx1-56-r',  examId: 'forex-1', type: 'result',         date: '2026-07-24', label: '외환전문역 I종 56회 합격 발표' },
  { id: 'fx1-56-nx', examId: 'forex-1', type: 'next_exam',      date: '2026-11-21', label: '외환전문역 I종 57회 시험 예정' },
  // 57회 (접수 10.13~10.20 / 시험 11.21 / 합발 12.4)
  { id: 'fx1-57-rs', examId: 'forex-1', type: 'register_start', date: '2026-10-13', label: '외환전문역 I종 57회 접수 시작' },
  { id: 'fx1-57-re', examId: 'forex-1', type: 'register_end',   date: '2026-10-20', label: '외환전문역 I종 57회 접수 마감' },
  { id: 'fx1-57-ex', examId: 'forex-1', type: 'exam',           date: '2026-11-21', label: '외환전문역 I종 57회 시험일' },
  { id: 'fx1-57-r',  examId: 'forex-1', type: 'result',         date: '2026-12-04', label: '외환전문역 I종 57회 합격 발표' },

  // ── 외환전문역 II종 (I종과 동일 일정) ──
  { id: 'fx2-56-rs', examId: 'forex-2', type: 'register_start', date: '2026-06-02', label: '외환전문역 II종 56회 접수 시작' },
  { id: 'fx2-56-re', examId: 'forex-2', type: 'register_end',   date: '2026-06-09', label: '외환전문역 II종 56회 접수 마감' },
  { id: 'fx2-56-ex', examId: 'forex-2', type: 'exam',           date: '2026-07-11', label: '외환전문역 II종 56회 시험일' },
  { id: 'fx2-56-r',  examId: 'forex-2', type: 'result',         date: '2026-07-24', label: '외환전문역 II종 56회 합격 발표' },
  { id: 'fx2-56-nx', examId: 'forex-2', type: 'next_exam',      date: '2026-11-21', label: '외환전문역 II종 57회 시험 예정' },
  { id: 'fx2-57-rs', examId: 'forex-2', type: 'register_start', date: '2026-10-13', label: '외환전문역 II종 57회 접수 시작' },
  { id: 'fx2-57-re', examId: 'forex-2', type: 'register_end',   date: '2026-10-20', label: '외환전문역 II종 57회 접수 마감' },
  { id: 'fx2-57-ex', examId: 'forex-2', type: 'exam',           date: '2026-11-21', label: '외환전문역 II종 57회 시험일' },
  { id: 'fx2-57-r',  examId: 'forex-2', type: 'result',         date: '2026-12-04', label: '외환전문역 II종 57회 합격 발표' },

  // ── 신용분석사 (CCA) ──
  // 제66회 (접수 9.22~9.29 / 시험 10.31 / 합발 11.13)
  { id: 'cca-66-rs', examId: 'credit-analyst', type: 'register_start', date: '2026-09-22', label: '신용분석사 제66회 접수 시작' },
  { id: 'cca-66-re', examId: 'credit-analyst', type: 'register_end',   date: '2026-09-29', label: '신용분석사 제66회 접수 마감' },
  { id: 'cca-66-ex', examId: 'credit-analyst', type: 'exam',           date: '2026-10-31', label: '신용분석사 제66회 시험일' },
  { id: 'cca-66-r',  examId: 'credit-analyst', type: 'result',         date: '2026-11-13', label: '신용분석사 제66회 합격 발표' },

  // ── TOEIC ──
  { id: 't1', examId: 'toeic', type: 'register_start', date: '2026-06-20', label: 'TOEIC 접수 시작' },
  { id: 't2', examId: 'toeic', type: 'register_end',   date: '2026-06-27', label: 'TOEIC 접수 마감' },
  { id: 't3', examId: 'toeic', type: 'exam',           date: '2026-07-19', label: 'TOEIC 시험일' },
];

export const SCHEDULE_TYPE_COLORS = {
  register_start: '#48C89A',
  register_end:   '#F0C060',
  cancel_end:     '#EF6B8A',
  exam:           '#7875E8',
  result:         '#A87FD8',
  next_exam:      '#C8B8E8',
};

export const SCHEDULE_TYPE_LABELS = {
  register_start: '접수 시작',
  register_end:   '접수 마감',
  cancel_end:     '취소 마감',
  exam:           '시험일',
  result:         '합격 발표',
  next_exam:      '다음 시험',
};
