"use client"

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/store/useSessionStore";
import { useTranslations } from "next-intl";

const NoticeWriteButton = () => {
  const t = useTranslations("notice");
  const router = useRouter();
  const { isLoggedIn, isLoading } = useSessionStore();

  if (isLoading || !isLoggedIn) return null;

  return (
    <div className="flex justify-end mb-4">
      <Button
        className="cursor-pointer bg-[#78b237] hover:bg-[#78b237]/90 text-white font-semibold px-6 py-2 rounded-lg"
        onClick={() => router.push("/support/notice/write")}
      >
        {t("noticeWrite.button")}
      </Button>
    </div>
  );
};

export default NoticeWriteButton;