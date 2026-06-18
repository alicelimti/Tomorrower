-- ================================================
-- user_exams: 사용자별 시험 선택 목록
-- ================================================
-- Supabase SQL Editor에서 실행하세요.

create table if not exists user_exams (
  id         uuid        default gen_random_uuid() primary key,
  device_id  text        not null,
  exam_id    text        not null,
  created_at timestamptz default now(),
  unique (device_id, exam_id)
);

-- 인덱스: device_id로 자주 조회하므로 추가
create index if not exists idx_user_exams_device_id on user_exams (device_id);

-- RLS 활성화 (Row Level Security)
alter table user_exams enable row level security;

-- 익명 접근 정책: 누구나 읽기/쓰기 허용 (로그인 구현 후 정책 교체 예정)
create policy "anon_all" on user_exams
  for all
  using (true)
  with check (true);
