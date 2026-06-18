-- ================================================
-- migration_001: device_id → user_id 마이그레이션
-- user_exams 테이블을 Supabase Auth 기반으로 재생성
-- ================================================
-- Supabase SQL Editor에서 실행하세요.

-- 기존 테이블 삭제 (데이터 초기화)
drop table if exists user_exams;

-- 새 테이블 생성 (user_id 기반)
create table user_exams (
  id         uuid        default gen_random_uuid() primary key,
  user_id    uuid        not null references auth.users(id) on delete cascade,
  exam_id    text        not null,
  created_at timestamptz default now(),
  unique (user_id, exam_id)
);

create index idx_user_exams_user_id on user_exams (user_id);

alter table user_exams enable row level security;

-- 본인 데이터만 접근 가능 (로그인 필수)
create policy "users_own_data" on user_exams
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
