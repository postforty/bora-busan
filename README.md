# 보라부산 (BoraBusan) 💜

글로벌 K-컬처 팬덤을 위한 부산 지역 특화 **'고정밀 성지순례 큐레이션 플랫폼'** 입니다. 부산의 주요 관광 명소 정보와 글로벌 K-Pop 아티스트(BTS 등)의 발자취를 결합한 하이브리드 로컬 가이드 서비스를 제공합니다.

## 🌟 프로젝트 개요

* **구축 목적**: 글로벌 K-컬처 팬덤의 니즈에 완벽하게 부합하는 부산 지역 특화 정보 제공
* **핵심 타겟**: 국내외 K-컬처 팬덤(FIT) 및 아티스트의 발자취를 따라 부산을 방문하는 글로벌 K-Pop 여행객
* **주요 기능 (MVP)**:
  * 마크다운(Markdown) 기반의 장소 및 성지순례 가이드 콘텐츠
  * 모바일 퍼스트(Mobile-First) 반응형 웹 디자인
  * 지도 기반 위치 가이드 제공
  * 고품질 시각적 가이드를 위한 이미지 최적화 뷰어

## 🛠 기술 스택 (Tech Stack)

* **Framework**: Next.js 16 (App Router)
* **Styling**: Tailwind CSS
* **Database & Auth**: Supabase
* **Deployment**: Cloudflare Pages
* **Map**: React Leaflet
* **Content**: Markdown (next-mdx-remote, gray-matter)

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬에서 실행하는 방법입니다.

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 에 접속하여 실행 결과를 확인합니다.

## 트러블슈팅 (Troubleshooting)

### NPM 패키지 설치 시 `ERESOLVE` (버전 충돌) 에러가 발생하는 경우

본 프로젝트는 최신 버전의 Next.js(16.x)를 사용 중이나, 일부 패키지(예: `@cloudflare/next-on-pages`)가 아직 해당 버전을 공식 지원하지 않아 설치 시 패키지 의존성 충돌(`peer dependency` 에러)이 발생할 수 있습니다.

새로운 환경에서 프로젝트를 클론하여 설정하거나 패키지를 추가로 설치할 때 다음 에러가 발생한다면:
```text
npm error ERESOLVE could not resolve
npm error Conflicting peer dependency: next@16.2.10
```

**해결 방법:**

터미널에 다음 명령어를 입력하여 로컬 설정으로 충돌을 무시하도록 기본값을 설정하세요. 한 번만 설정해 두면 이후 `npm install` 명령어가 에러 없이 정상적으로 동작합니다.

```bash
npm config set legacy-peer-deps true
```

또는 패키지를 설치할 때마다 수동으로 `--legacy-peer-deps` 옵션을 붙여서 실행해도 됩니다.
```bash
npm i --legacy-peer-deps
npm i [설치할-패키지명] --legacy-peer-deps
```

## 🗄️ 데이터베이스 설정 (Database Setup)

본 프로젝트는 Supabase를 데이터베이스로 사용합니다. 프로젝트를 처음 세팅할 때 아래의 SQL을 Supabase 대시보드의 **SQL Editor**에서 실행하여 필요한 테이블과 보안 정책(RLS)을 생성해야 합니다.

```sql
-- 1. posts 테이블 생성 (게시물 기본 정보)
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  image_url TEXT,
  likes INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  badge_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 2. post_translations 테이블 생성 (게시물 언어별 내용)
CREATE TABLE IF NOT EXISTS post_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  -- 같은 게시글에 같은 언어가 중복 생성되지 않도록 제한
  UNIQUE(post_id, locale) 
);

-- 3. 두 테이블에 RLS(Row Level Security) 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_translations ENABLE ROW LEVEL SECURITY;

-- 4. 웹사이트 방문자 누구나 게시물을 '조회(SELECT)' 할 수 있도록 권한 허용
CREATE POLICY "누구나 게시글 조회 가능" 
ON posts FOR SELECT 
USING (true);

CREATE POLICY "누구나 번역본 조회 가능" 
ON post_translations FOR SELECT 
USING (true);

-- 5. Data API 접근 권한 부여 (Security 설정에서 Automatically expose new tables를 껐을 경우 필수)
GRANT SELECT ON posts TO anon, authenticated;
GRANT SELECT ON post_translations TO anon, authenticated;
```

## 🔒 관리자 페이지 접속 방법 (Admin Access)

본 프로젝트는 일반 사용자에게 불필요한 혼란을 주지 않기 위해, **메인 화면이나 네비게이션 UI에 관리자용 로그인 및 대시보드로 이동하는 버튼을 의도적으로 노출하지 않습니다.** 

관리자 대시보드에 접근하려면 브라우저 주소창에 아래의 URL 경로를 직접 입력하여 접속해야 합니다.

* **개발 환경 (로컬)**: `http://localhost:3000/admin`
* **운영 환경 (배포)**: `https://[배포된-프로젝트-도메인]/admin`

## 📝 어드민 글 작성 가이드 (Admin Writing Guide)

본 프로젝트는 자체 관리자(Admin) 페이지를 통해 다국어 콘텐츠를 쉽게 생성 및 관리할 수 있습니다. 

### 1. 주요 기능
* **다국어 지원 및 AI 자동 번역**: 한국어로 글을 작성한 후 `AI 자동 번역` 버튼을 클릭하면 영어, 일본어, 중국어로 제목/본문/메타데이터가 자동 번역됩니다. (Gemini AI 연동)
* **포맷 타입 (Post Type)**:
  * `Standard`: 일반적인 마크다운 블로그 형태
  * `Place`: 특정 장소 스팟 정보(주소, 영업시간, 팁, 위/경도 좌표 등)를 메타데이터(JSON)로 관리하는 형태
  * `Course`: 당일/다일 코스 등 타임라인 일정으로 표시되는 형태
  * `Video`: 유튜브 등 관련 영상을 메인으로 하는 형태
* **카테고리**: K-Pop Pilgrimage, Cafe Tour, Foodie Finds, Coastal Life 등 세분화된 카테고리를 지원합니다.

### 2. 글 작성 순서
1. 어드민 대시보드에서 **새 글 작성(Write)** 또는 **수정(Edit)** 페이지로 이동합니다.
2. **작성 언어 선택**: 기본 언어(한국어) 외에 발행할 다국어(영어, 일본어, 중국어)를 체크박스에서 선택합니다.
3. **공통 정보 세팅**: 카테고리, 슬러그(URL), 게시글 포맷 타입, 공통 썸네일 이미지를 등록합니다.
4. **한국어(원문) 작성**:
   * 제목과 요약 설명 입력
   * 포맷 타입이 `Place`나 `Course`인 경우, 제공되는 **Metadata (JSON)** 템플릿 양식에 맞춰 주소나 일정 데이터를 입력합니다.
   * **본문 (마크다운)** 에디터 영역에 글과 사진을 자유롭게 작성합니다.
5. **다국어 자동 번역**: 선택한 추가 언어 영역 우측 상단의 `AI 자동 번역` 버튼을 클릭하여 한국어 원문을 번역합니다. (번역 완료 후 어색한 부분은 수동으로 수정 가능합니다)
6. 모든 내용을 확인한 후 하단의 **작성/수정 버튼**을 눌러 발행을 완료합니다.

### 3. 메타데이터(Metadata JSON) 작성 양식 가이드

글 작성 시 선택한 **포맷 타입(Post Type)** 에 따라 `Metadata (JSON)` 입력란에 기본 템플릿이 자동으로 채워집니다. 아래 가이드를 참고하여 실제 데이터로 수정하세요.

#### 📍 장소 스팟형 (Place)
단일 목적지(카페, 식당, 촬영지 등)를 소개할 때 사용합니다.
```json
{
  "type": "place",
  "address": "부산광역시 해운대구 달맞이길 117번가길 120-30", // 실제 도로명 주소
  "nearest_station": "해운대역 1번 출구", // 가까운 대중교통 정보
  "hours": "매일 10:00 - 21:00 (월요일 휴무)", // 영업 및 휴무 시간
  "tips": "창가 자리 2층이 사진이 가장 잘 나옵니다.", // 팬들을 위한 꿀팁
  "coordinates": { 
    "lat": 35.158, 
    "lng": 129.172 
  }, // 지도에 표시될 정확한 위/경도 좌표
  "related_content": [
    { "type": "mv", "title": "Yet To Come 뮤직비디오 촬영지" } // 관련 콘텐츠
  ]
}
```

#### 🚶 일정 코스형 (Course)
하루 또는 여러 날의 여행 코스를 타임라인 형태로 보여줄 때 사용합니다.
```json
{
  "type": "course",
  "duration_days": 1, // 일정 기간 (당일=1)
  "transport": "지하철 + 도보", // 주 이동 수단
  "steps": [
    { 
      "time": "09:30-11:30", // 소요 시간대
      "place_name": "광안리 해수욕장", // 스팟 이름
      "activities": ["해변 인증샷", "아침 산책"] // 주요 활동 내역
    },
    { 
      "time": "12:00-13:30", 
      "place_name": "밀면 맛집", 
      "activities": ["점심 식사"] 
    }
  ]
}
```

#### 🎬 영상 메인형 (Video)
유튜브 등 영상이 메인이 되는 콘텐츠에 사용합니다.
```json
{
  "type": "video",
  "video_url": "https://youtube.com/watch?v=비디오아이디", // 임베드할 영상 링크
  "duration": "10:30" // 영상 총 재생 시간
}
```

## 🛠️ 트러블슈팅 (Troubleshooting)

### Supabase 데이터베이스 및 스토리지 설정 관련
프로젝트 진행 중 발생했던 Supabase 관련 주요 오류와 해결 방법입니다. 동일한 데이터베이스 환경을 새로 구축할 경우 아래 사항들을 유의해야 합니다.

**1. 다국어 게시글 저장 시 `403 Forbidden` 오류**
* **증상**: 관리자 페이지에서 글 작성 후 저장할 때 `posts` 테이블 접근 권한 거부 발생.
* **원인**: RLS(Row Level Security) 정책은 설정되어 있었으나, `authenticated` 역할(Role)에 대한 테이블 수준의 쓰기(INSERT, UPDATE, DELETE) 권한(GRANT) 자체가 누락되어 발생함.
* **해결**: SQL 에디터에서 아래 명령어를 실행하여 테이블 권한 부여.
  ```sql
  GRANT INSERT, UPDATE, DELETE ON public.posts TO authenticated;
  GRANT INSERT, UPDATE, DELETE ON public.post_translations TO authenticated;
  ```

**2. 썸네일 이미지 업로드 시 `400 Bad Request` 오류**
* **증상**: 글 작성 시 썸네일 이미지를 첨부하고 저장하면 스토리지 업로드 실패 발생.
* **원인**: 이미지를 저장할 `blog-media` 스토리지 버킷이 생성되어 있지 않았음.
* **해결**: `blog-media` 버킷을 생성하고, 누구나 읽을 수 있도록(Public) 설정한 뒤 `authenticated` 사용자만 업로드, 수정, 삭제 가능하도록 스토리지 RLS 정책을 추가함.
  ```sql
  -- 버킷 생성
  INSERT INTO storage.buckets (id, name, public) VALUES ('blog-media', 'blog-media', true);

  -- RLS 정책 설정
  CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-media');
  CREATE POLICY "Auth Upload Access" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-media');
  CREATE POLICY "Auth Update Access" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'blog-media');
  CREATE POLICY "Auth Delete Access" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog-media');
  ```

**3. 조회수 및 좋아요 클릭 시 `404 Not Found` 오류**
* **증상**: 게시글 상세 보기 진입 시, 또는 좋아요 버튼 클릭 시 클라이언트 콘솔에 RPC 호출 실패 발생.
* **원인**: 클라이언트에서 호출하는 `increment_view`, `increment_like`, `decrement_like` PostgreSQL 함수가 DB에 없었음.
* **해결**: 조회수와 좋아요 카운트를 안전하게 변경할 수 있도록 `SECURITY DEFINER` 옵션이 적용된 RPC 함수 3종을 생성하여 해결.
  ```sql
  -- 조회수 증가
  CREATE OR REPLACE FUNCTION public.increment_view(post_slug text)
  RETURNS void
  LANGUAGE sql
  SECURITY DEFINER
  AS $$
    UPDATE public.posts
    SET views = COALESCE(views, 0) + 1
    WHERE slug = post_slug;
  $$;

  -- 좋아요 증가
  CREATE OR REPLACE FUNCTION public.increment_like(post_slug text)
  RETURNS void
  LANGUAGE sql
  SECURITY DEFINER
  AS $$
    UPDATE public.posts
    SET likes = COALESCE(likes, 0) + 1
    WHERE slug = post_slug;
  $$;

  -- 좋아요 감소
  CREATE OR REPLACE FUNCTION public.decrement_like(post_slug text)
  RETURNS void
  LANGUAGE sql
  SECURITY DEFINER
  AS $$
    UPDATE public.posts
    SET likes = GREATEST(COALESCE(likes, 0) - 1, 0)
    WHERE slug = post_slug;
  $$;
  ```