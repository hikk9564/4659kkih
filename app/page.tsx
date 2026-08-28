```tsx
"use client";

import Navigation from "./components/Navigation";
import LoginButton from "./components/LoginButton";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#EAF6FF",
        color: "#234A68",
        padding: "60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* ==================== HEADER ==================== */}

      <header
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          borderBottom: "1px solid #B9DFF5",
          paddingBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
          hikk9564
        </h1>

        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          힉힉이집
        </p>

        {/* ✨ 상단 메뉴 */}
        <Navigation />
        <LoginButton />
      </header>

      {/* ==================== IMAGE AREA ==================== */}

      <section
        style={{
          maxWidth: "1100px",
          margin: "45px auto 0",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "25px",
        }}
      >
        {/* 이미지 1 */}

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(40, 120, 181, 0.08)",
            animation: "fadeUp 0.5s ease-out both",
          }}
        >
          <div
            style={{
              height: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F5FBFF",
              color: "#8AAFC5",
              fontSize: "13px",
            }}
          >
            이미지 1
          </div>

          {/* ✏️ 나중에 관리자 로그인 시에만 표시 */}
          <div
            style={{
              padding: "12px 18px",
              borderTop: "1px solid #EAF6FF",
              textAlign: "right",
            }}
          >
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "#2878B5",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              이미지 변경
            </button>
          </div>
        </div>

        {/* 이미지 2 */}

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(40, 120, 181, 0.08)",
            animation: "fadeUp 0.5s ease-out 0.1s both",
          }}
        >
          <div
            style={{
              height: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F5FBFF",
              color: "#8AAFC5",
              fontSize: "13px",
            }}
          >
            이미지 2
          </div>

          {/* ✏️ 나중에 관리자 로그인 시에만 표시 */}
          <div
            style={{
              padding: "12px 18px",
              borderTop: "1px solid #EAF6FF",
              textAlign: "right",
            }}
          >
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "#2878B5",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              이미지 변경
            </button>
          </div>
        </div>
      </section>

      {/* ==================== MAIN ==================== */}

      <section
        style={{
          maxWidth: "1100px",
          margin: "35px auto 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
        }}
      >
        {/* ==================== 방명록 ==================== */}

        <section
          style={{
            background: "#FFFFFF",
            padding: "35px",
            borderRadius: "20px",
            border: "1px solid #B9DFF5",
            boxShadow: "0 10px 30px rgba(40, 120, 181, 0.08)",
            animation: "fadeUp 0.5s ease-out 0.15s both",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "400",
              marginTop: 0,
              marginBottom: "25px",
            }}
          >
            방명록
          </h2>

          {/* 최근 방명록 */}

          <div
            style={{
              height: "240px",
              overflowY: "auto",
              paddingRight: "8px",
              marginBottom: "25px",
            }}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #EAF6FF",
                  fontSize: "14px",
                }}
              >
                <strong
                  style={{
                    fontWeight: "500",
                    marginRight: "8px",
                  }}
                >
                  {item % 2 === 0 ? "익명" : "힉힉"}
                </strong>

                <span style={{ opacity: 0.8 }}>
                  안녕하세요! 홈페이지 구경하고 갑니다.
                </span>
              </div>
            ))}
          </div>

          {/* ==================== 방명록 입력 ==================== */}

          <div
            style={{
              borderTop: "1px solid #B9DFF5",
              paddingTop: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
                fontSize: "13px",
              }}
            >
              <label>
                <input
                  type="checkbox"
                  style={{ marginRight: "5px" }}
                />
                익명
              </label>

              <input
                type="text"
                placeholder="닉네임"
                style={{
                  flex: 1,
                  border: "1px solid #B9DFF5",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  outline: "none",
                }}
              />
            </div>

            <textarea
              placeholder="방명록을 입력하세요"
              style={{
                width: "100%",
                height: "75px",
                boxSizing: "border-box",
                resize: "none",
                border: "1px solid #B9DFF5",
                borderRadius: "10px",
                padding: "10px",
                fontFamily: "inherit",
                fontSize: "13px",
                outline: "none",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <input
                type="password"
                placeholder="비밀번호"
                style={{
                  flex: 1,
                  border: "1px solid #B9DFF5",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  outline: "none",
                }}
              />

              <button
                style={{
                  border: "none",
                  background: "#2878B5",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  cursor: "pointer",
                }}
              >
                등록
              </button>
            </div>
          </div>

          <a
            href="/guestbook"
            style={{
              display: "block",
              marginTop: "25px",
              color: "#2878B5",
              textDecoration: "none",
              fontSize: "13px",
              textAlign: "right",
            }}
          >
            전체 방명록 보기 →
          </a>
        </section>

        {/* ==================== DIARY ==================== */}

        <section
          style={{
            background: "#FFFFFF",
            padding: "35px",
            borderRadius: "20px",
            border: "1px solid #B9DFF5",
            boxShadow: "0 10px 30px rgba(40, 120, 181, 0.08)",
            animation: "fadeUp 0.5s ease-out 0.2s both",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "400",
              marginTop: 0,
              marginBottom: "25px",
            }}
          >
            DIARY
          </h2>

          <div>
            {[1, 2].map((item) => (
              <a
                key={item}
                href={`/diary/${item}`}
                style={{
                  display: "block",
                  padding: "15px 5px",
                  borderBottom: "1px solid #EAF6FF",
                  color: "#234A68",
                  textDecoration: "none",
                  fontSize: "15px",
                }}
              >
                <span
                  style={{
                    color: "#5BB9E8",
                    marginRight: "8px",
                    fontSize: "11px",
                  }}
                >
                  ●
                </span>

                {item === 1 ? "오늘의 그림" : "비 오는 날"}
              </a>
            ))}
          </div>

          <a
            href="/diary"
            style={{
              display: "block",
              marginTop: "25px",
              color: "#2878B5",
              textDecoration: "none",
              fontSize: "13px",
              textAlign: "right",
            }}
          >
            다이어리 전체보기 →
          </a>
        </section>
      </section>

      {/* ==================== ANIMATION ==================== */}

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 700px) {
          main {
            padding: 30px !important;
          }
        }
      `}</style>
    </main>
  );
}
```

