// 문제은행 예시 데이터 — Phase 2에서 Firebase DB로 교체
export const QUIZ_BANK = {
  sqld: [
    {
      id: 'sqld-001',
      question: '다음 중 SQL의 DML에 해당하지 않는 것은?',
      options: ['SELECT', 'INSERT', 'UPDATE', 'CREATE'],
      answer: 3,
      explanation: 'CREATE는 DDL(Data Definition Language)에 해당합니다. DML은 SELECT, INSERT, UPDATE, DELETE입니다.',
      subject: 'SQL 기본 및 활용',
    },
    {
      id: 'sqld-002',
      question: '다음 중 NULL 값에 대한 설명으로 올바른 것은?',
      options: [
        'NULL은 0과 동일하다',
        'NULL은 공백 문자와 동일하다',
        'NULL은 알 수 없는 값 또는 미정인 값이다',
        'NULL끼리 비교하면 TRUE를 반환한다',
      ],
      answer: 2,
      explanation: 'NULL은 알 수 없는 값(Unknown) 또는 미정인 값을 의미하며, 0이나 공백과는 다릅니다.',
      subject: 'SQL 기본 및 활용',
    },
    {
      id: 'sqld-003',
      question: '정규화 과정에서 제2정규형(2NF)을 만족하기 위한 조건은?',
      options: [
        '모든 속성이 원자값을 가져야 한다',
        '부분 함수 종속을 제거해야 한다',
        '이행 함수 종속을 제거해야 한다',
        '다치 종속을 제거해야 한다',
      ],
      answer: 1,
      explanation: '제2정규형은 제1정규형을 만족하면서 부분 함수 종속(partial functional dependency)을 제거한 형태입니다.',
      subject: '데이터 모델링의 이해',
    },
  ],
  adsp: [
    {
      id: 'adsp-001',
      question: '데이터 분석 방법론 중 KDD(Knowledge Discovery in Database) 프로세스의 순서로 올바른 것은?',
      options: [
        '데이터 선택 → 전처리 → 변환 → 마이닝 → 해석/평가',
        '전처리 → 데이터 선택 → 변환 → 마이닝 → 해석/평가',
        '데이터 선택 → 변환 → 전처리 → 마이닝 → 해석/평가',
        '전처리 → 변환 → 데이터 선택 → 마이닝 → 해석/평가',
      ],
      answer: 0,
      explanation: 'KDD 프로세스: 데이터 선택 → 전처리 → 변환 → 데이터 마이닝 → 해석/평가',
      subject: '데이터 분석 기획',
    },
    {
      id: 'adsp-002',
      question: '다음 중 비정형 데이터에 해당하는 것은?',
      options: ['관계형 DB 테이블', 'CSV 파일', 'SNS 텍스트', 'XML 파일'],
      answer: 2,
      explanation: 'SNS 텍스트는 정해진 형식 없이 자유롭게 작성된 비정형 데이터입니다.',
      subject: '데이터 이해',
    },
  ],
};
