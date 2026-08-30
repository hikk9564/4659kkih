
"use client";

import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [currentDate, setCurrentDate] =
    useState(new Date());

  const [isScheduleOpen, setIsScheduleOpen] =
    useState(false);

  const [scheduleTitle, setScheduleTitle] =
    useState("");

  const [scheduleStart, setScheduleStart] =
    useState("");

  const [scheduleEnd, setScheduleEnd] =
    useState("");

  const [schedules, setSchedules] =
    useState<Schedule[]>([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const lastDate = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const totalCells = Math.ceil(
    (firstDay + lastDate) / 7
  ) * 7;

  // ==================== 일정 불러오기 ====================

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "schedules")
        );

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Schedule[];

        setSchedules(list);
      } catch (error) {
        console.error(
          "일정 불러오기 실패:",
          error
        );
      }
    };

    loadSchedules();
  }, []);

  // ==================== 날짜 문자열 ====================

  const makeDateString = (
    y: number,
    m: number,
    d: number
  ) => {
    return `${y}-${String(m + 1).padStart(
      2,
      "0"
    )}-${String(d).padStart(2, "0")}`;
  };

  // ==================== 월의 주 만들기 ====================

  const weeks = [];

  for (
    let i = 0;
    i < totalCells;
    i += 7
  ) {
    const week = [];

    for (let j = 0; j < 7; j++) {
      const index = i + j;
      const day =
        index - firstDay + 1;

      week.push(
        day >= 1 && day <= lastDate
          ? day
          : null
      );
    }

    weeks.push(week);
  }

  // ==================== 일정 추가 ====================

  const handleScheduleAdd = async () => {
    if (!scheduleTitle.trim()) {
      alert("일정 이름을 입력해주세요.");
      return;
    }

    if (!scheduleStart || !scheduleEnd) {
      alert(
        "시작일과 종료일을 선택해주세요."
      );
      return;
    }

    if (scheduleStart > scheduleEnd) {
      alert(
        "종료일은 시작일보다 빠를 수 없습니다."
      );
      return;
    }

    try {
      const newSchedule = {
        title: scheduleTitle.trim(),
        start: scheduleStart,
        end: scheduleEnd,
      };

      const docRef = await addDoc(
        collection(db, "schedules"),
        newSchedule
      );

      setSchedules((prev) => [
        ...prev,
        {
          id: docRef.id,
          ...newSchedule,
        },
      ]);

      alert("일정이 추가되었습니다!");

      setIsScheduleOpen(false);
      setScheduleTitle("");
      setScheduleStart("");
      setScheduleEnd("");
    } catch (error) {
      console.error(
        "일정 추가 실패:",
        error
      );

      alert("일정 추가에 실패했습니다.");
    }
  };

  // ==================== 화면 ====================

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#EAF6FF",
        color: "#234A68",
        padding: "60px 5%",
        fontFamily:
          "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* ==================== HEADER ==================== */}

      <header
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          borderBottom:
            "1px solid #B9DFF5",
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
            border:
              "1px solid #B9DFF5",
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
              justifyContent:
                "space-between",
              marginBottom: "30px",
            }}
          >
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    year,
                    month - 1,
                    1
                  )
                )
              }
              style={{
                border: "none",
                background:
                  "transparent",
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
            >
              {year}년 {month + 1}월
            </h2>

            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    year,
                    month + 1,
                    1
                  )
                )
              }
              style={{
                border: "none",
                background:
                  "transparent",
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
              borderBottom:
                "1px solid #B9DFF5",
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
                  textAlign:
                    "center",
                  fontSize: "13px",
                  color: "#8AAFC5",
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* ==================== 날짜 ==================== */}

          <div>
            {weeks.map(
              (week, weekIndex) => {
                const weekStart =
                  week.find(
                    (day) =>
                      day !== null
                  );

                const weekEnd =
                  [...week]
                    .reverse()
                    .find(
                      (day) =>
                        day !== null
                    );

                return (
                  <div
                    key={weekIndex}
                    style={{
                      position:
                        "relative",
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(7, minmax(0, 1fr))",
                      minHeight: "80px",
                    }}
                  >
                    {/* 날짜 */}

                    {week.map(
                      (day, dayIndex) => {
                        if (
                          day === null
                        ) {
                          return (
                            <div
                              key={
                                dayIndex
                              }
                              style={{
                                minHeight:
                                  "80px",
                              }}
                            />
                          );
                        }

                        const date =
                          new Date(
                            year,
                            month,
                            day
                          );

                        const dateString =
                          makeDateString(
                            year,
                            month,
                            day
                          );

                        const isToday =
                          date.toDateString() ===
                          new Date().toDateString();

                        const isSelected =
                          selectedDate?.toDateString() ===
                          date.toDateString();

                        return (
                          <button
                            key={
                              dayIndex
                            }
                            onClick={() =>
                              setSelectedDate(
                                date
                              )
                            }
                            style={{
                              minHeight:
                                "80px",
                              border:
                                "none",
                              background:
                                isSelected
                                  ? "#FFF8D9"
                                  : "#FFFFFF",
                              color:
                                "#234A68",
                              fontSize:
                                "14px",
                              fontWeight:
                                isToday
                                  ? "700"
                                  : "400",
                              cursor:
                                "pointer",
                              padding:
                                "10px",
                              textAlign:
                                "left",
                              position:
                                "relative",
                              zIndex: 2,
                            }}
                          >
                            {day}

                            {/* 일정 시작일의 제목 */}

                            {schedules
                              .filter(
                                (
                                  schedule
                                ) => {
                                  const startsHere =
                                    schedule.start ===
                                    dateString;

                                  const monthStart =
                                    day ===
                                    1;

                                  const continuesFromPreviousMonth =
                                    schedule.start <
                                      dateString &&
                                    schedule.end >=
                                      dateString;

                                  return (
                                    startsHere ||
                                    (monthStart &&
                                      continuesFromPreviousMonth)
                                  );
                                }
                              )
                              .map(
                                (
                                  schedule
                                ) => (
                                  <div
                                    key={
                                      schedule.id
                                    }
                                    style={{
                                      marginTop:
                                        "8px",
                                      fontSize:
                                        "10px",
                                      color:
                                        "#2878B5",
                                      position:
                                        "relative",
                                      zIndex: 3,
                                      whiteSpace:
                                        "nowrap",
                                      overflow:
                                        "hidden",
                                      textOverflow:
                                        "ellipsis",
                                    }}
                                  >
                                    {schedule.title}
                                  </div>
                                )
                              )}
                          </button>
                        );
                      }
                    )}

                    {/* ==================== 일정 막대 ==================== */}

                    {schedules.map(
                      (schedule) => {
                        const visibleStart =
                          Math.max(
                            weekStart ?? 1,
                            Number(
                              schedule.start.slice(
                                8,
                                10
                              )
                            )
                          );

                        const visibleEnd =
                          Math.min(
                            weekEnd ?? lastDate,
                            Number(
                              schedule.end.slice(
                                8,
                                10
                              )
                            )
                          );

                        const scheduleStartDate =
                          new Date(
                            schedule.start
                          );

                        const scheduleEndDate =
                          new Date(
                            schedule.end
                          );

                        const weekStartDate =
                          new Date(
                            year,
                            month,
                            weekStart ?? 1
                          );

                        const weekEndDate =
                          new Date(
                            year,
                            month,
                            weekEnd ?? lastDate
                          );

                        if (
                          scheduleEndDate <
                            weekStartDate ||
                          scheduleStartDate >
                            weekEndDate
                        ) {
                          return null;
                        }

                        const startColumn =
                          Math.max(
                            0,
                            week.findIndex(
                              (day) =>
                                day ===
                                visibleStart
                            )
                          );

                        const endColumn =
                          Math.max(
                            startColumn,
                            week.findIndex(
                              (day) =>
                                day ===
                                visibleEnd
                            )
                          );

                        return (
                          <div
                            key={
                              schedule.id
                            }
                            style={{
                              position:
                                "absolute",
                              left: `calc(${startColumn} * (100% / 7) + 5px)`,
                              width: `calc(${endColumn - startColumn + 1} * (100% / 7) - 10px)`,
                              top: "42px",
                              height:
                                "18px",
                              background:
                                "#FFF3A8",
                              borderRadius:
                                "5px",
                              zIndex: 1,
                              pointerEvents:
                                "none",
                              opacity: 0.85,
                            }}
                          />
                        );
                      }
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* ==================== 선택한 날짜 ==================== */}

        <section
          style={{
            marginTop: "25px",
            background:
              "#FFFFFF",
            border:
              "1px solid #B9DFF5",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
            boxSizing:
              "border-box",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: "400",
            }}
          >
            {selectedDate
              ? `${selectedDate.getFullYear()}년 ${
                  selectedDate.getMonth() + 1
                }월 ${selectedDate.getDate()}일`
              : "선택한 날짜"}
          </h2>

          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
              opacity: 0.7,
            }}
          >
            날짜를 선택하면 그날의
            기록을 볼 수 있어요.
          </p>

          <div
            style={{
              marginTop: "25px",
              paddingTop: "20px",
              borderTop:
                "1px solid #EAF6FF",
            }}
          >
            {!selectedDate ? (
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color:
                    "#8AAFC5",
                }}
              >
                아직 선택한 날짜가
                없습니다.
              </p>
            ) : (
              (() => {
                const selectedString =
                  makeDateString(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate()
                  );

                const selectedSchedules =
                  schedules.filter(
                    (schedule) =>
                      selectedString >=
                        schedule.start &&
                      selectedString <=
                        schedule.end
                  );

                return selectedSchedules.length >
                  0 ? (
                  selectedSchedules.map(
                    (schedule) => (
                      <div
                        key={
                          schedule.id
                        }
                        style={{
                          marginBottom:
                            "10px",
                          fontSize:
                            "14px",
                        }}
                      >
                        <span
                          style={{
                            color:
                              "#F2C94C",
                            marginRight:
                              "8px",
                          }}
                        >
                          ●
                        </span>
                        {
                          schedule.title
                        }
                      </div>
                    )
                  )
                ) : (
                  <p
                    style={{
                      margin: 0,
                      fontSize:
                        "14px",
                      color:
                        "#8AAFC5",
                    }}
                  >
                    등록된 일정이
                    없습니다.
                  </p>
                );
              })()
            )}
          </div>

          {/* ==================== 일정 추가 ==================== */}

          <div
            style={{
              marginTop: "25px",
              textAlign:
                "right",
            }}
          >
            <button
              onClick={() =>
                setIsScheduleOpen(
                  true
                )
              }
              style={{
                border: "none",
                background:
                  "#2878B5",
                color:
                  "#FFFFFF",
                borderRadius:
                  "8px",
                padding:
                  "9px 16px",
                fontSize:
                  "13px",
                cursor:
                  "pointer",
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
            textAlign:
              "center",
          }}
        >
          <button
            style={{
              border:
                "1px solid #B9DFF5",
              background:
                "#FFFFFF",
              color:
                "#2878B5",
              borderRadius:
                "10px",
              padding:
                "10px 20px",
              fontSize:
                "13px",
              cursor:
                "pointer",
            }}
          >
            ✎ 일기 작성
          </button>
        </div>
      </section>

      {/* ==================== 일정 팝업 ==================== */}

      {isScheduleOpen && (
        <div
          style={{
            position:
              "fixed",
            inset: 0,
            background:
              "rgba(35, 74, 104, 0.25)",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 1000,
            padding: "20px",
            boxSizing:
              "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth:
                "420px",
              background:
                "#FFFFFF",
              borderRadius:
                "20px",
              padding:
                "30px",
              boxShadow:
                "0 15px 40px rgba(40, 120, 181, 0.2)",
              boxSizing:
                "border-box",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize:
                  "22px",
                fontWeight:
                  "400",
              }}
            >
              일정 추가
            </h2>

            <input
              type="text"
              placeholder="일정 이름"
              value={
                scheduleTitle
              }
              onChange={(e) =>
                setScheduleTitle(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                marginTop:
                  "20px",
                padding:
                  "10px",
                border:
                  "1px solid #B9DFF5",
                borderRadius:
                  "8px",
                boxSizing:
                  "border-box",
                outline:
                  "none",
              }}
            />

            <p
              style={{
                marginTop:
                  "20px",
                marginBottom:
                  "8px",
                fontSize:
                  "13px",
              }}
            >
              시작일
            </p>

            <input
              type="date"
              value={
                scheduleStart
              }
              onChange={(e) =>
                setScheduleStart(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding:
                  "10px",
                border:
                  "1px solid #B9DFF5",
                borderRadius:
                  "8px",
                boxSizing:
                  "border-box",
              }}
            />

            <p
              style={{
                marginTop:
                  "15px",
                marginBottom:
                  "8px",
                fontSize:
                  "13px",
              }}
            >
              종료일
            </p>

            <input
              type="date"
              value={
                scheduleEnd
              }
              onChange={(e) =>
                setScheduleEnd(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding:
                  "10px",
                border:
                  "1px solid #B9DFF5",
                borderRadius:
                  "8px",
                boxSizing:
                  "border-box",
              }}
            />

            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "flex-end",
                gap: "8px",
                marginTop:
                  "25px",
              }}
            >
              <button
                onClick={() => {
                  setIsScheduleOpen(
                    false
                  );
                }}
                style={{
                  border: "none",
                  background:
                    "transparent",
                  color:
                    "#8AAFC5",
                  padding:
                    "8px 12px",
                  cursor:
                    "pointer",
                }}
              >
                취소
              </button>

              <button
                onClick={
                  handleScheduleAdd
                }
                style={{
                  border: "none",
                  background:
                    "#2878B5",
                  color:
                    "#FFFFFF",
                  borderRadius:
                    "8px",
                  padding:
                    "8px 15px",
                  cursor:
                    "pointer",
                }}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


