import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// ────────────────────────────────────────────────
// Next.js 기본 설정 + 국제화 플러그인(next-intl)
// ────────────────────────────────────────────────

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://dapi.kakao.com https://t1.daumcdn.net http://t1.daumcdn.net", // 에디터 라이브러리 + 카카오맵
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: http://t1.daumcdn.net https://t1.daumcdn.net http://mts.daumcdn.net https://mts.daumcdn.net", // 카카오맵 이미지 및 타일 지원 (https: 와일드카드 제거)
              "font-src 'self' data:",
              "connect-src 'self' https://dapi.kakao.com https://*.kakao.com", // HTTP 연결 제거 (보안 강화)
              "frame-ancestors 'none'",
              "frame-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);