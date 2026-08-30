"use client";

import { useState } from "react";

export default function DiaryPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showScheduleModal, setShowScheduleModal] =
    useState(false);

  const [scheduleTitle, setScheduleTitle] =
    useState("");

  const [scheduleStart, setScheduleStart] =
    useState("");

  const [scheduleEnd, setScheduleEnd] =
    useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= lastDate; i++) {
    days.push(i);
  }

  const goPreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const goNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const selectDate = (day: number) => {
    setSelectedDate(
      new Date(year, month, day)
    );
  };

  const selectedDateText =
    selectedDate.getFullYear() +
    "-" +
    String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0") +
    "-" +
    String(
      selectedDate.getDate()
    ).padStart(2, "0");

  const handleScheduleSave = () => {
    if (!scheduleTitle.trim()) {
      alert("일정 이름을 입력해주세요.");
      return;
    }

    if (!scheduleStart || !scheduleEnd) {
      alert("시작일과 종료일을 입력해주세요.");
      return;
    }

    alert(
      `"${scheduleTitle}" 일정이 추가되었습니다!`
    );

    setScheduleTitle("");
    setScheduleStart("");
    setScheduleEnd("");
    setShowScheduleModal(false);
  };

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
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* ==================== 제목 ==================== */}

        <h1
          style={{
            fontSize: "42px",
            fontWeight: "400",
            margin: 0,
          }}
        >
          DIARY
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: "35px",
            fontSize: "14px",
            opacity: 0.65,
          }}
        >
          기록하고 싶은 날을 선택하세요.
        </p>

        {/* ==================== 캘린더 ==================== */}

        <section
          style={{
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
            boxSizing: "border-box",
          }}
        >
          {/* 월 이동 */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "25px",
            }}
          >
            <button
              onClick={goPreviousMonth}
              style={{
                border: "none",
                background: "transparent",
                color: "#2878B5",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ←
            </button>

            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: "400",
              }}
            >
              {year}년 {month + 1}월
            </h2>

            <button
              onClick={goNextMonth}
              style={{
                border: "none",
                background: "transparent",
                color: "#2878B5",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              →
            </button>
          </div>

          {/* 요일 */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(7, minmax(0, 1fr))",
              marginBottom: "8px",
            }}
          >
            {[
              "일",
              "월",
              "화",
              "수",
              "목",
              "금",
              "토",
            ].map((day) => (
              <div
                key={day}
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  padding: "10px 0",
                  opacity: 0.6,
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(7, minmax(0, 1fr))",
              gap: "6px",
            }}
          >
            {days.map((day, index) => {
              if (day === null) {
                return (
                  <div
                    key={index}
                    style={{
                      minHeight: "75px",
                    }}
                  />
                );
              }

              const isSelected =
                selectedDate.getFullYear() === year &&
                selectedDate.getMonth() === month &&
                selectedDate.getDate() === day;

              return (
                <button
                  key={day}
                  onClick={() => selectDate(day)}
                  style={{
                    minHeight: "75px",
                    border: isSelected
                      ? "1px solid #2878B5"
                      : "1px solid transparent",
                    borderRadius: "10px",
                    background: isSelected
                      ? "#EAF6FF"
                      : "transparent",
                    color: "#234A68",
                    cursor: "pointer",
                    fontSize: "14px",
                    textAlign: "left",
                    padding: "10px",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </section>

        {/* ==================== 선택한 날짜 ==================== */}

        <section
          style={{
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            padding: "30px",
            marginTop: "25px",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            {selectedDateText}
          </h2>

          {/* 일기 영역 */}

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              borderRadius: "12px",
              background: "#F5FBFF",
              fontSize: "14px",
              opacity: 0.7,
            }}
          >
            이 날짜의 일기는 아직 없습니다.
          </div>

          {/* 일정 */}

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              일정
            </h3>

            <p
              style={{
                fontSize: "13px",
                opacity: 0.6,
              }}
            >
              등록된 일정이 없습니다.
            </p>
          </div>

          {/* 일정 추가 */}

          <button
            onClick={() =>
              setShowScheduleModal(true)
            }
            style={{
              marginTop: "10px",
              border: "none",
              background: "#2878B5",
              color: "#FFFFFF",
              borderRadius: "8px",
              padding: "9px 16px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            + 일정 추가
          </button>

          {/* 관리자 일기 작성 */}

          <div
            style={{
              marginTop: "25px",
              paddingTop: "20px",
              borderTop: "1px solid #EAF6FF",
            }}
          >
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "#2878B5",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              🔒 일기 작성
            </button>
          </div>
        </section>
      </div>

      {/* ==================== 일정 추가 팝업 ==================== */}

      {showScheduleModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(35, 74, 104, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "#FFFFFF",
              borderRadius: "18px",
              padding: "30px",
              boxShadow:
                "0 15px 40px rgba(40, 120, 181, 0.15)",
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
              일정 추가
            </h2>

            <div
              style={{
                marginTop: "25px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "7px",
                }}
              >
                일정 이름
              </label>

              <input
                type="text"
                value={scheduleTitle}
                onChange={(e) =>
                  setScheduleTitle(
                    e.target.value
                  )
                }
                placeholder="예: 친구 만나기"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border:
                    "1px solid #B9DFF5",
                  borderRadius: "8px",
                  padding: "10px",
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                marginTop: "18px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "7px",
                }}
              >
                시작일
              </label>

              <input
                type="date"
                value={scheduleStart}
                onChange={(e) =>
                  setScheduleStart(
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border:
                    "1px solid #B9DFF5",
                  borderRadius: "8px",
                  padding: "10px",
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                marginTop: "18px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "7px",
                }}
              >
                종료일
              </label>

              <input
                type="date"
                value={scheduleEnd}
                onChange={(e) =>
                  setScheduleEnd(
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border:
                    "1px solid #B9DFF5",
                  borderRadius: "8px",
                  padding: "10px",
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() =>
                  setShowScheduleModal(false)
                }
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#8AAFC5",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>

              <button
                onClick={handleScheduleSave}
                style={{
                  border: "none",
                  background: "#2878B5",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
