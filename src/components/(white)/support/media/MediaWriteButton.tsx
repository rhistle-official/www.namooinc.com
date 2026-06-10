"use client"

import { useRouter } from "@/i18n/navigation";
import { useSessionStore } from "@/store/useSessionStore";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const MediaWriteButton = () => {
  const t = useTranslations("media");
  const router = useRouter();
  const { isLoggedIn, isLoading } = useSessionStore();

  if (isLoading || !isLoggedIn) return null;

  return (
    <div className="flex justify-end mb-4">
      <Button
        className="cursor-pointer bg-[#78b237] hover:bg-[#78b237]/90 text-white font-semibold px-6 py-2 rounded-lg"
        onClick={() => router.push("/support/media/write")}
      >
        {t("mediaWrite.button")}
      </Button>
    </div>
  );
};

export default MediaWriteButton;