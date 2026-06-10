"use client";

import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { deleteNotice } from "@/lib/api";
import { useSessionStore } from "@/store/useSessionStore";
import { useTranslations } from "next-intl";

const NoticeDeleteButton = ({ post_id }: { post_id: number }) => {
  const t = useTranslations("notice");
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const { isLoggedIn, isLoading } = useSessionStore();

  if (isLoading || !isLoggedIn) return null;

  const deleteHandler = async () => {
    try {
      // 서버 사이드 인증 API 호출
      const authRes = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: adminId, password: adminPw }),
      });

      if (!authRes.ok) {
        alert("관리자 인증 실패");
        return;
      }

      const authData = await authRes.json();
      if (!authData.success) {
        alert("관리자 인증 실패");
        return;
      }

      const res = await deleteNotice(post_id);
      if (res.error) throw new Error(res.error);
      alert(t("delete.success"));
      router.push("/support/notice");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(t("delete.fail"));
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-500/90">{t("delete.button")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="mx-auto max-w-xs rounded-xl sm:max-w-[25rem]">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete.desc")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("delete.desc")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2 py-4">
          <input
            type="text"
            placeholder="관리자 아이디"
            value={adminId}
            onChange={e => setAdminId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={adminPw}
            onChange={e => setAdminPw(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("delete.cancel")}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={deleteHandler}>{t("delete.confirm")}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default NoticeDeleteButton;