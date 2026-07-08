This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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

## 관리자 페이지 접속 방법 (Admin Access)

본 프로젝트는 일반 사용자에게 불필요한 혼란을 주지 않기 위해, **메인 화면이나 네비게이션 UI에 관리자용 로그인 및 대시보드로 이동하는 버튼을 의도적으로 노출하지 않습니다.** 

관리자 대시보드에 접근하려면 브라우저 주소창에 아래의 URL 경로를 직접 입력하여 접속해야 합니다.

- **개발 환경 (로컬)**: `http://localhost:3000/admin` (또는 `/login`, `/dashboard` 등 설정된 경로)
- **운영 환경 (배포)**: `https://[배포된-프로젝트-도메인]/admin`