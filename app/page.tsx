"use client";

import { useState } from "react";

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);

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

        <nav
          style={{
            marginTop: "25px",
            display: "flex",
            gap: "28px",
            fontSize: "14px",
            position: "relative",
          }}
        >
          {/* 소개 메뉴 */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#F2C94C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = aboutOpen
                  ? "#F2C94C"
                  : "#2878B5";
              }}
              style={{
                border: "none",
                background: "none",
                padding: 0,
                font: "inherit",
                color: aboutOpen ? "#F2C94C" : "#2878B5",
                cursor: "pointer",
              }}
            >
              소개
            </button>

            {/* 소개 드롭다운 */}
            {aboutOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "-15px",
                  width: "300px",
                  background: "#FFFFFF",
                  border: "1px solid #B9DFF5",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 10px 30px rgba(40, 120, 181, 0.12)",
                  zIndex: 10,
                }}
              >
                {/* 개인 소개 */}
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  ABOUT
                </h3>

                <p
                  style={{
                    lineHeight: "1.7",
                    fontSize: "14px",
                    margin: "0 0 25px",
                  }}
                >
                  {/* ✏️ 여기에 간단한 개인 소개를 입력하세요 */}
                  안녕하세요! 여기는 힉힉이의 홈페이지입니다.
                  <br />
                  좋아하는 것과 그림에 대한 이야기를 기록하고 있어요.
                </p>

                {/* SNS */}
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  SNS
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginBottom: "25px",
                  }}
                >
                  {/* ✏️ 아래 href="" 안에 SNS 주소를 넣으세요 */}
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#2878B5",
                      textDecoration: "none",
                    }}
                  >
                    Twitter →
                  </a>

                  {/* ✏️ 필요 없으면 이 SNS 항목을 삭제하세요 */}
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#2878B5",
                      textDecoration: "none",
                    }}
                  >
                    Instagram →
                  </a>

                  {/* ✏️ 필요하면 SNS 항목을 복사해서 추가하세요 */}
                </div>

                {/* 성향표 */}
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  성향표
                </h3>

                <p
                  style={{
                    lineHeight: "1.7",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  {/* ✏️ 여기에 성향표 내용을 입력하세요 */}
                  그림 이야기 / 자캐 이야기 좋아합니다.
                  <br />
                  편하게 교류해주세요!
                </p>
              </div>
            )}
          </div>

          <a href="/" style={{ color: "#2878B5", textDecoration: "none" }}>
            게시판
          </a>

          <a href="#자캐" style={{ color: "#2878B5", textDecoration: "none" }}>
            자캐
          </a>

          <a
            href="#선후관"
            style={{ color: "#2878B5", textDecoration: "none" }}
          >
            선후관
          </a>

          <a
            href="#커미션"
            style={{ color: "#2878B5", textDecoration: "none" }}
          >
            커미션
          </a>

          <a href="#기록" style={{ color: "#2878B5", textDecoration: "none" }}>
            기록
          </a>

          <a
            href="#방명록"
            style={{ color: "#2878B5", textDecoration: "none" }}
          >
            방명록
          </a>
        </nav>
      </header>

      <section
        style={{
          maxWidth: "1100px",
          margin: "70px auto 0",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "280px",
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#5BB9E8",
            fontSize: "14px",
            overflow: "hidden",
          }}
        >
          HEADER IMAGE
        </div>
      </section>

      <section
        style={{
          maxWidth: "1100px",
          margin: "50px auto 0",
          background: "#FFFFFF",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(40, 120, 181, 0.08)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          테스트 0
        </h2>

        <p
          style={{
            lineHeight: "1.8",
            maxWidth: "600px",
          }}
        >
          테스트 1
          <br />
          테스트 2
        </p>
      </section>
    </main>
  );
}
