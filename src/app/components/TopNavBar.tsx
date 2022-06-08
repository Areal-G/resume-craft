"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.svg";
import { cx } from "lib/cx";
import {
  PencilSquareIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  {
    href: "/resume-builder",
    label: "Builder",
    longLabel: "Resume Builder",
    Icon: PencilSquareIcon,
    // The import step is the entry point to the builder
    matches: ["/resume-builder", "/resume-import"],
  },
  {
    href: "/resume-parser",
    label: "Parser",
    longLabel: "ATS Parser",
    Icon: DocumentMagnifyingGlassIcon,
    matches: ["/resume-parser"],
  },
];

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoSrc}
            alt=""
            aria-hidden="true"
            className="h-8 w-8"
            priority
          />
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Resume{" "}
            <span className="text-[color:var(--theme-purple)]">Craft</span>
          </span>
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center rounded-full bg-gray-100 p-1 text-sm font-medium ring-1 ring-inset ring-gray-200"
        >
          {NAV_ITEMS.map(({ href, label, longLabel, Icon, matches }) => {
            const isActive = matches.some((path) => pathName.startsWith(path));
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cx(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[color:var(--theme-purple)] lg:px-4",
                  isActive
                    ? "bg-[color:var(--theme-purple)] text-white shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="lg:hidden">{label}</span>
                <span className="hidden lg:inline">{longLabel}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
