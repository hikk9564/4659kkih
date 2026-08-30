```tsx
"use client";

import Link from "next/link";
import { useState } from "react";

type MenuItem = {
  name: string;
  href: string;
};

type Menu = {
  name: string;
  href?: string;
  items?: MenuItem[];
};

const menus: Menu[] = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "기록",
    items: [
      {
        name: "일기",
        href: "/diary",
      },
      {
        name: "캘린더",
        href: "/calendar",
      },
    ],
  },
  {
    name: "게시판",
    href: "/board",
  },
];

export default function Navigation() {
  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  return (
    <nav
      style={{
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        gap: "25px",
        flexWrap: "wrap",
      }}
    >
      {menus.map((menu) => {
        const hasSubMenu =
          !!menu.items &&
          menu.items.length > 0;

        return (
          <div
            key={menu.name}
            style={{
              position: "relative",
            }}
            onMouseEnter={() => {
              if (hasSubMenu) {
                setOpenMenu(menu.name);
              }
            }}
            onMouseLeave={() => {
              if (hasSubMenu) {
                setOpenMenu(null);
              }
            }}
          >
            {menu.href ? (
              <Link
                href={menu.href}
                style={{
                  color: "#234A68",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {menu.name}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(
                    openMenu === menu.name
                      ? null
                      : menu.name
                  );
                }}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#234A68",
                  padding: 0,
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {menu.name}
              </button>
            )}

            {hasSubMenu &&
              openMenu === menu.name && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform:
                      "translateX(-50%)",
                    marginTop: "10px",
                    minWidth: "120px",
                    background: "#FFFFFF",
                    border:
                      "1px solid #B9DFF5",
                    borderRadius: "10px",
                    padding: "6px",
                    boxShadow:
                      "0 8px 20px rgba(40, 120, 181, 0.12)",
                    zIndex: 100,
                  }}
                >
                  {menu.items?.map(
                    (item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        style={{
                          display: "block",
                          padding:
                            "9px 12px",
                          color:
                            "#234A68",
                          textDecoration:
                            "none",
                          fontSize:
                            "13px",
                          borderRadius:
                            "7px",
                        }}
                        onMouseEnter={(
                          e
                        ) => {
                          e.currentTarget.style.background =
                            "#EAF6FF";
                          e.currentTarget.style.color =
                            "#2878B5";
                        }}
                        onMouseLeave={(
                          e
                        ) => {
                          e.currentTarget.style.background =
                            "transparent";
                          e.currentTarget.style.color =
                            "#234A68";
                        }}
                      >
                        {item.name}
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
```
