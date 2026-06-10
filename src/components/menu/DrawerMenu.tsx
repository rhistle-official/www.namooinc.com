'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import Logo from "../ui/Logo";

export default function DrawerMenu({
  open, onClose,
}: { open: boolean; onClose: () => void }) {
  const t = useTranslations('NavBar')

  // ESC로 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // 아코디언 상태(열린 섹션 id)
  const [active, setActive] = useState<string | null>(null)
  const toggle = (id: string) => setActive(v => (v === id ? null : id))

  // 메뉴 데이터(라벨은 번역)
  const sections = [
    {
      id: 'vision',
      title: t('vision.title'),
      items: [{ href: '/vision', label: t('vision.subMenu.vision.title') }],
    },
    {
      id: 'solution',
      title: t('solution.title'),
      items: [
        { href: '/product/corecode', label: t('solution.subMenu.corecode.title'), sub: t('solution.subMenu.corecode.subTitle') },
        { href: '/product/vexi',     label: t('solution.subMenu.vexi.title'),     sub: t('solution.subMenu.vexi.subTitle') },
        { href: '/product/mexi',     label: t('solution.subMenu.mexi.title'),     sub: t('solution.subMenu.mexi.subTitle') },
      ],
    },
    {
      id: 'support',
      title: t('support.title'),
      items: [
        { href: '/support/library', label: t('support.subMenu.library.title') },
      ],
    },
    {
      id: 'company',
      title: t('company.title'),
      items: [
        { href: '/company/ceomessage',     label: t('company.subMenu.ceomessage.title') },
        { href: '/company/history', label: t('company.subMenu.history.title') },
        { href: '/company/ethics',  label: t('company.subMenu.ethics.title') },
        { href: '/company/recruit', label: t('company.subMenu.recruit.title') },
        { href: '/company/welfare', label: t('company.subMenu.welfare.title') },
        { href: '/company/map',     label: t('company.subMenu.map.title') },
      ],
    },
  ]

  return (
    <>
      {/* 딤드 배경(클릭 시 닫기) */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      {/* 오른쪽 패널 + 슬라이드 애니메이션 */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-50 h-full w-[min(90vw,360px)] bg-neutral-900 text-white shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* 상단 바: 좌측 로고/타이틀(옵션),  */}
        <div className="relative flex h-14 items-center border-b border-white/10 px-4">
          <Logo image="ci_white.png" />
          <button
            onClick={onClose}
            aria-label="메뉴 닫기"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl leading-none text-white/80 hover:text-white"
          >
            →
          </button>
        </div>

        {/* 스크롤 영역 */}
        <div className="h-[calc(100%-56px)] overflow-y-auto px-2 py-2">
          {sections.map(sec => {
            const opened = active === sec.id
            return (
              <div key={sec.id} className="select-none">
                {/* 메인 타이틀(클릭 시 토글) */}
                <button
                  className="flex w-full items-center justify-between px-3 py-4 text-left text-[17px] font-semibold text-white hover:text-[#78b237]"
                  onClick={() => toggle(sec.id)}
                  aria-expanded={opened}
                >
                  <span>{sec.title}</span>
                  <Chevron opened={opened} />
                </button>

                {/* 서브 리스트(아코디언) */}
                <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ${opened ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <ul className="pb-2">
                    {sec.items.map((it) => (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          onClick={onClose} // 이동 시 닫기
                          className="block px-5 py-2 text-[15px] text-white/80 hover:text-white hover:bg-white/5"
                        >
                          <div className="font-medium">{it.label}</div>
                          {/* {it.sub && <div className="text-sm text-neutral-500">{it.sub}</div>} */}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 섹션 구분선 */}
                <div className="border-b border-neutral-200" />
              </div>
            )
          })}
        </div>
      </aside>
    </>
  )
}

/* ▼ 아이콘: 열림/닫힘 표시(회전) */
function Chevron({ opened }: { opened: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20" height="20"
      className={`transition-transform ${opened ? 'rotate-180' : 'rotate-0'}`}
    >
      {/* 아래쪽 화살표 */}
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}