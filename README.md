This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경변수를 설정하세요:

```bash
# Kakao Map API Key
NEXT_PUBLIC_KAKAO_MAP_KEY=your_kakao_map_api_key_here
```

**카카오맵 API 키 발급 방법:**
1. [Kakao Developers](https://developers.kakao.com/)에 로그인
2. 애플리케이션 생성
3. JavaScript 앱 키 복사
4. `.env` 파일에 붙여넣기

**SLACK API 키 발급 방법**
1. [Slack API](https://api.slack.com/apps) 페이지에 접속  
2. **Create New App** → "From scratch" 선택  
3. 앱 이름과 워크스페이스를 입력 후 생성  
4. 생성한 앱에서 **Incoming Webhooks** 메뉴 클릭  
5. `Activate Incoming Webhooks` → ON  
6. **Add New Webhook to Workspace** → 알림을 받을 채널 선택 → 허용  
7. 생성된 **Webhook URL** 을 복사
8. `.env`  파일에 붙여넣기

**이메일 환경 변수 설정**
1. 이메일 발송에 사용할 계정을 준비하세요.  
   - Gmail → [앱 비밀번호](https://support.google.com/accounts/answer/185833) 생성  
   - 또는 회사 SMTP 계정 정보 사용
2. 아래 값을 `.env` 파일에 추가
```bash
EMAIL_USER=발신자_이메일주소
EMAIL_PASS=앱비밀번호_또는_SMTP_패스워드
EMAIL_TO=수신자_이메일주소(ex: developer.namooinc.com)
```

### 2. 개발 서버 실행

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
