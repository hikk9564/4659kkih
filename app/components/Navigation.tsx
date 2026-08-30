"use client";

import { useState } from "react";

const menus = [
  {
    name: "소개",
    href: "/about",
    items: [],
  },
  {
    name: "홈",
    href: "/",
    items: ["방명록", "커미션"],
  },
  {
    name: "커뮤",
    href: "/community",
    items: [],
  },
  {
    name: "기록",
    href: "#",
    items: ["다이어리", "메뉴 이름 2", "메뉴 이름 3"],
  },
];

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav
      style={{
        marginTop: "25px",
        display: "flex",
        gap: "28px",
        fontSize: "14px",
        position: "relative",
        flexWrap: "wrap",
      }}
    >
      {menus.map((menu) => (
        <div
          key={menu.name}
          style={{
            position: "relative",
          }}
          onMouseEnter={() => setOpenMenu(menu.name)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <a
            href={menu.href}
            onClick={() => {
              if (menu.items.length > 0) {
                setOpenMenu(
                  openMenu === menu.name ? null : menu.name
                );
              }
            }}
            style={{
              color:
                openMenu === menu.name
                  ? "#F2C94C"
                  : "#2878B5",
              textDecoration: "none",
              cursor: "pointer",
              display: "inline-block",
              padding: "5px 0",
            }}
          >
            {menu.name}
          </a>

          {openMenu === menu.name &&
            menu.items.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "34px",
                  left: "-15px",
                  width: "150px",
                  background: "#FFFFFF",
                  border: "1px solid #B9DFF5",
                  borderRadius: "15px",
                  padding: "10px",
                  boxShadow:
                    "0 10px 30px rgba(40, 120, 181, 0.12)",
                  zIndex: 100,
                  animation: "dropdownUp 0.25s ease-out",
                }}
              >
                {menu.items.map((item, index) => (
                  <a
                    key={item}
                    href={`/menu/${menu.name}-${index + 1}`}
                    style={{
                      display: "block",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      color: "#2878B5",
                      textDecoration: "none",
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
                        "#2878B5";
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
        </div>
      ))}

      <style jsx>{`
        @keyframes dropdownUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
