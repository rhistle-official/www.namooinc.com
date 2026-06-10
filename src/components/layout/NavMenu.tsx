import { Link } from "@/i18n/navigation";
import { useHoverStore } from "@/store/useNavhoverStore";
import { useTranslations } from "next-intl";

interface NavMenu {
  title: string;
  subMenu: { key: string; href: string }[];
}

const navMenus: NavMenu[] = [
  {
    title: "vision",
    subMenu: [
      { key: "vision", href: "/vision" },
    ],
  },
  {
    title: "solution",
    subMenu: [
      { key: "corecode", href: "/product/corecode" },
      { key: "vexi", href: "/product/vexi" },
      { key: "mexi", href: "/product/mexi" },
    ],
  },
  {
    title: "support",
    subMenu: [
      { key: "library", href: "/support/library" },
    ],
  },
  {
    title: "company",
    subMenu: [
      { key: "ceomessage", href: "/company/ceomessage" },
      { key: "history", href: "/company/history" },
      { key: "ethics", href: "/company/ethics" },
      { key: "recruit", href: "/company/recruit" },
      { key: "welfare", href: "/company/welfare" },
      { key: "map", href: "/company/map" },
    ],
  },
];

const NavMenu = () => {
  const t = useTranslations("NavBar");
  const hovered = useHoverStore((state) => state.hovered);
  const setHovered = useHoverStore((state) => state.setHovered);

  return (
    <nav className="hidden sm:flex items-center space-x-6 whitespace-nowrap" aria-label="메인 메뉴">
      <ul className="flex items-center justify-center font-bold lg:text-lg">
        {navMenus.map((item) => (
          <li
            key={item.title}
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <button type="button" className="px-[1rem] py-4 lg:px-[2.5rem]">
              {/* 메뉴 */}
              {t(`${item.title}.title`)}
            </button>
            {hovered && (
              <ul className="absolute z-20 mx-[1rem] w-full lg:mx-[2.5rem]">
                {item.subMenu.map((sub) => {
                  const subKey = `${item.title}.subMenu.${sub.key}`;
                  const hasSubTitle = t.has(`${subKey}.subTitle`);

                  return (
                    <li key={sub.key} className="hover:text-[#96cb4f] py-2">
                      <Link
                        href={sub.href}
                        className="text-base font-semibold"
                      >
                        {/* 서브 메뉴 제목 */}
                        {t(`${subKey}.title`)}
                        {/* 서브 메뉴 부제목 (존재할 경우만 출력) */}
                        {hasSubTitle && (
                          <span className="block text-sm font-normal text-gray-500">
                            {t(`${subKey}.subTitle`)}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
