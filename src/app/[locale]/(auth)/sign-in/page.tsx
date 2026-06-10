"use client"

import { useState, useEffect } from "react"
import Image from "next/image";
import Link from "next/link";
import { useSessionStore } from "@/store/useSessionStore";

export default function SignInPage() {
  const { setLoggedIn } = useSessionStore();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [redirect, setRedirect] = useState("/");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("redirect");
    if (param) setRedirect(param);
  }, []);

  // 로그인 처리
  const handleLogin = async () => {
    setError("");

    if (!id.trim() || !pw.trim()) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pw }),
      });

      if (!res.ok) {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        return;
      }

      setLoggedIn(true);

      const redirectTo = redirect?.trim() || "/";
      window.location.href = redirectTo;
    } catch {
      setError("로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  // 엔터 키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#f4f7ec]">
      <div className="mb-4">
        <Link href={"/"}>
					<Image
						src="/image/ci_green.png"
						alt="로고"
						width={1000}
						height={308}
						priority
						className="mb-6 h-16 w-48"
					/>
				</Link>
      </div>

      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
        {/* 아이디 입력 */}
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
          onKeyDown={handleKeyDown}
          className="w-full mb-2 px-4 py-2 border rounded bg-gray-50"
        />

        {/* 비밀번호 입력 */}
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          type="password"
          placeholder="비밀번호"
          onKeyDown={handleKeyDown}
          className="w-full mb-4 px-4 py-2 border rounded bg-gray-50"
        />

        {/* 에러 메시지 */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#78b237] text-white py-2 rounded hover:bg-[#78b237]/90 transition disabled:opacity-60"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  )
}
