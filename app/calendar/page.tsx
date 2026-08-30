"use client";

import { useState } from "react";
import Navigation from "../components/Navigation";

export default function CalendarPage() {
const [selectedDate, setSelectedDate] =
  useState<Date | null>(null);

const [currentDate, setCurrentDate] =
  useState(new Date());
  
  const year = currentDate.getFullYear();
const month = currentDate.getMonth();

const firstDay = new Date(year, month, 1).getDay();
const lastDate = new Date(year, month + 1, 0).getDate();

  
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#EAF6FF",
        color: "#234A68",
        padding: "60px 5%",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
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
          CALENDAR
        </h1>

        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          개인 일정 및 다이어리
        </p>

        <Navigation />
      </header>

      {/* ==================== CALENDAR ==================== */}

      <section
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "45px auto 0",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            padding: "35px",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
            boxSizing: "border-box",
          }}
        >
          {/* ==================== 월 이동 ==================== */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "#2878B5",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              ←
            </button>

            <h2
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: "400",
              }}
            >{year}년 {month + 1}월
            </h2>

            <button
              style={{
                border: "none",
                background: "transparent",
                color: "#2878B5",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              →
            </button>
          </div>

          {/* ==================== 요일 ==================== */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(7, minmax(0, 1fr))",
              borderBottom: "1px solid #B9DFF5",
              paddingBottom: "12px",
              marginBottom: "5px",
            }}
          >
            {[
              "U",
              "M",
              "T",
              "W",
              "R",
              "F",
              "S",
            ].map((day) => (
              <div
                key={day}
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: "#8AAFC5",
                }}
              >
                {day}
              </div>
            ))}
          </div>

{/* ==================== 날짜 ==================== */}

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(7, minmax(0, 1fr))",
  }}
>
  {Array.from({
  length: firstDay + lastDate,
}).map((_, index) => {
  const day = index - firstDay + 1;

  if (day < 1) {
    return <div key={index} />;
  }

  const date = new Date(year, month, day);

  const isToday =
    date.toDateString() ===
    new Date().toDateString();

  const isSelected =
    selectedDate?.toDateString() ===
    date.toDateString();

  return (
    <button
      key={index}
      onClick={() => setSelectedDate(date)}
      style={{
        minHeight: "80px",
        border: "none",
        background: isSelected
          ? "#FFF8D9"
          : "#FFFFFF",
        color: "#234A68",
        fontSize: "14px",
        fontWeight: isToday
          ? "700"
          : "400",
        cursor: "pointer",
        padding: "10px",
        textAlign: "left",
        transition:
          "background 0.2s ease",
      }}
    >
      {day}

      <div
        style={{
          marginTop: "8px",
          fontSize: "10px",
          color: "#5BB9E8",
        }}
      >
        {/* 나중에 일기/일정 표시 */}
      </div>
    </button>
  );
})}
   => (
    <button
      key={index}
      onClick={() => setSelectedDate(index)}
      style={{
        minHeight: "80px",
        border: "none",
        background:
          selectedDate === index
            ? "#FFF8D9"
            : "#FFFFFF",
        color: "#234A68",
        fontSize: "14px",
        cursor: "pointer",
        padding: "10px",
        textAlign: "left",
        transition: "background 0.2s ease",
      }}
    >
      {day}

      {/* 나중에 일기/일정 표시 */}
      <div
        style={{
          marginTop: "8px",
          fontSize: "10px",
          color: "#5BB9E8",
        }}
      >
        {/* ● */}
      </div>
    </button>
  ))}
</div>
        </div>

        {/* ==================== 선택한 날짜 ==================== */}

        <section
          style={{
            marginTop: "25px",
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: "400",
            }}
          >
            선택한 날짜
          </h2>

          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
              opacity: 0.7,
            }}
          >
            날짜를 선택하면 그날의 기록을 볼 수 있어요.
          </p>

          {/* ==================== 일기 / 일정 영역 ==================== */}

          <div
            style={{
              marginTop: "25px",
              paddingTop: "20px",
              borderTop: "1px solid #EAF6FF",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#8AAFC5",
              }}
            >
              아직 선택한 날짜가 없습니다.
            </p>
          </div>

          {/* ==================== 일정 추가 ==================== */}

          <div
            style={{
              marginTop: "25px",
              textAlign: "right",
            }}
          >
            <button
              style={{
                border: "none",
                background: "#2878B5",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "9px 16px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              + 일정 추가
            </button>
          </div>
        </section>

        {/* ==================== 관리자 일기 작성 ==================== */}

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
          }}
        >
          <button
            style={{
              border: "1px solid #B9DFF5",
              background: "#FFFFFF",
              color: "#2878B5",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            ✎ 일기 작성
          </button>
        </div>
      </section>
    </main>
  );
}
