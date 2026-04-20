"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LogoutButton from "@/components/LogoutButton";

type DashboardNavItem = {
  label: string;
  href: string;
  isPrimary?: boolean;
};

type DashboardHeaderProps = {
  title: string;
  userName: string;
  role: string;
  navItems?: DashboardNavItem[];
};

export default function DashboardHeader({
  title,
  userName,
  role,
  navItems = [],
}: DashboardHeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-neutral-950/95 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-4">
              <Image
                src="/Logo.png"
                alt="MyC Asesores"
                width={90}
                height={36}
                className="object-contain"
                priority
              />

              <div>
                <h1 className="text-lg font-bold text-white sm:text-xl">{title}</h1>
                <p className="text-xs text-neutral-400 sm:text-sm">
                  {userName} · {role}
                </p>
              </div>
            </div>

            <LogoutButton />
          </div>

          {navItems.length > 0 && (
            <div className="border-t border-white/10 py-4">
              <div className="flex flex-wrap gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={
                      item.isPrimary
                        ? "rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
                        : "rounded-full bg-neutral-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
                    }
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <div style={{ height: headerHeight }} />
    </>
  );
}