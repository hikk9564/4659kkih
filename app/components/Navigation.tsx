"use client";

import Link from "next/link";
import { useState } from "react";

type MenuItem = {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
};

const menuItems: MenuItem[] = [
  {
    label: "홈",
    href: "/",
  },
  {
    label: "기록",
    children: [
      {
        label: "일기",
        href: "/diary",
      },
      {
        label: "방명록",
        href: "/guestbook",
      },
    ],
  },
  {
    label: "캘린더",
    href: "/calendar",
  },
  {
    label: "성향표",
    href: "/personality",
  },
];

export default function Navigation() {
  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  return (
    <nav
      style={{
        marginTop: "25px",
        display: "flex",
        alignItems: "center",
        gap: "28px",
        position: "relative",
        zIndex: 100,
      }}
    >
      {menuItems.map((item) => {
        const hasChildren =
          item.children &&
          item.children.length > 0;

        return (
          <div
            key={item.label}
            style={{
              position: "relative",
            }}
            onMouseEnter={() =>
              hasChildren
                ? setOpenMenu(item.label)
                : setOpenMenu(null)
            }
            onMouseLeave={() => {
              if (hasChildren) {
                setOpenMenu(null);
              }
            }}
          >
            {item.href ? (
              <Link
                href={item.href}
                style={{
                  textDecoration: "none",
                  color:
                    openMenu === item.label
                      ? "#F2C94C"
                      : "#234A68",
                  fontSize: "14px",
                  transition:
                    "color 0.2s ease",
                  display: "block",
                  padding: "8px 0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "#F2C94C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "#234A68";
                }}
              >
                {item.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setOpenMenu(
                    openMenu === item.label
                      ? null
                      : item.label
                  )
                }
                style={{
                  border: "none",
                  background: "transparent",
                  color:
                    openMenu === item.label
                      ? "#F2C94C"
                      : "#234A68",
                  fontSize: "14px",
                  cursor: "pointer",
                  padding: "8px 0",
                  transition:
                    "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "#F2C94C";
                }}
                onMouseLeave={(e) => {
                  if (
                    openMenu !== item.label
                  ) {
                    e.currentTarget.style.color =
                      "#234A68";
                  }
                }}
              >
                {item.label}
              </button>
            )}

            {/* ==================== 하위 메뉴 ==================== */}

            {hasChildren &&
              openMenu === item.label && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "-12px",
                    width: "130px",
                    padding: "8px",
                    background: "#FFFFFF",
                    border:
                      "1px solid #B9DFF5",
                    borderRadius: "10px",
                    boxShadow:
                      "0 8px 20px rgba(40, 120, 181, 0.12)",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={() =>
                    setOpenMenu(item.label)
                  }
                  onMouseLeave={() =>
                    setOpenMenu(null)
                  }
                >
                  {item.children?.map(
                    (child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        style={{
                          display: "block",
                          textDecoration:
                            "none",
                          color: "#234A68",
                          fontSize: "13px",
                          padding:
                            "9px 10px",
                          borderRadius: "7px",
                          transition:
                            "background 0.2s ease, color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "#EAF6FF";
                          e.currentTarget.style.color =
                            "#F2C94C";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "transparent";
                          e.currentTarget.style.color =
                            "#234A68";
                        }}
                      >
                        {child.label}
                      </Link>
                    )
                  )}
                </div>
              )}
          </div>
        );
      })}
    </nav>
  );
}
