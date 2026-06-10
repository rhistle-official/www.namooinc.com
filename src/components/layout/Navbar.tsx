"use client";

import { useEffect, useState } from "react";
import ArrowUpRight from "../../../public/svg/ArrowUpRight";
import LocaleSwicher from "../LocaleSwicher";
import Logo from "../ui/Logo";
import MobileMenu from "../menu/MobileMenu";
import NavMenu from "./NavMenu";
import { useSessionStore } from "@/store/useSessionStore";
import LoginButton from "@/components/auth/LoginButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const NavBar = ({ bgColor }: { bgColor: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const { isLoggedIn, isLoading, setLoggedIn } = useSessionStore();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      setLoggedIn(false);
      window.location.href = "/";
    }
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  
  const pathname = usePathname();
  const isOnInquiryPage = pathname.includes("inquiry");
  const isAuthPage = pathname.includes("/sign-in") 
  || pathname.includes("/sign-up") 
  || pathname.includes("/forgot-password");

  const t = useTranslations("NavBar");   
  
  useEffect(() => {
    const scrollHandler = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsOpen(scrollY > 50);
    };

    window.addEventListener("scroll", scrollHandler);

    // 초기 실행 (처음부터 50 이상일 수도 있으니)
    scrollHandler();

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobileMenuOpen(window.innerWidth < 768);
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    bgColor === "bg-black"
      ? setImage("ci_white.png")
      : setImage("ci_green.png");
  }, [bgColor]);

  return (
    <header className="fixed z-20 w-full">
      <div
        className={`flex h-[6.25rem] items-center justify-between px-[2rem] lg:px-[5rem] ${isOpen ? `${bgColor} opacity-90` : ""}`}
      >
        <div className="flex items-center">
          <Logo image={image} />
          <NavMenu />
        </div>
        {isMobileMenuOpen ? (
          <MobileMenu />
        ) : (
          <div className="flex items-center gap-2">
            {
              !isOnInquiryPage && (
                <Link
                  href="/inquiry/corecode-inquiry"
                  className="flex cursor-pointer items-center py-4 lg:px-[2.5rem] whitespace-nowrap gap-1"
                >
                  <span>{t("contact.contact")}</span>
                  <ArrowUpRight />
                </Link>
              )
            }
            <LocaleSwicher />
            {!isAuthPage && (   
              <>
                {isLoading && (
                  <button className="ml-2 rounded bg-[#78b237] text-white px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 w-auto max-w-[150px] whitespace-nowrap">
                    ...
                  </button>
                )}

                {!isLoading && !isLoggedIn && <LoginButton />}

                {!isLoading && isLoggedIn && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="ml-2 rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 w-auto max-w-[150px] whitespace-nowrap"
                  >
                    {t("logoutButton.logout")}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;