
"use client";

import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

type Diary = {
  id: string;
  title: string;
  content: string;
  date: string;
  icon: string;
  isPublic: boolean;
  createdAt?: number;
};

const diaryIcons = [
  "🌱",
  "☀️",
  "🌙",
  "☁️",
  "🌧️",
  "⭐",
  "🌸",
  "🍀",
  "🎨",
  "📖",
];

export default function DiaryPage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [selectedDiary, setSelectedDiary] =
    useState<Diary | null>(null);

  const [isWriteOpen, setIsWriteOpen] =
    useState(false);

  const [diaryTitle, setDiaryTitle] =
    useState("");

  const [diaryContent, setDiaryContent] =
    useState("");

  const [diaryDate, setDiaryDate] =
    useState("");

  const [diaryIcon, setDiaryIcon] =
    useState("🌱");

  const [isPublic, setIsPublic] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

  // ==================== 공개 일기 불러오기 ====================

  useEffect(() => {
    const loadDiaries = async () => {
      try {
        const diaryQuery = query(
          collection(db, "diaries"),
          where("isPublic", "==", true),
          orderBy("date", "desc")
        );

        const snapshot =
          await getDocs(diaryQuery);

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Diary[];

        setDiaries(list);
      } catch (error) {
        console.error(
          "일기 불러오기 실패:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDiaries();
  }, []);

  // ==================== 일기 저장 ====================

  const handleDiarySave = async () => {
    if (!diaryTitle.trim()) {
      alert("일기 제목을 입력해주세요.");
      return;
    }

    if (!diaryContent.trim()) {
      alert("일기 내용을 입력해주세요.");
      return;
    }

    if (!diaryDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    try {
      const newDiary = {
        title: diaryTitle.trim(),
        content: diaryContent.trim(),
        date: diaryDate,
        icon: diaryIcon,
        isPublic,
        createdAt: Date.now(),
      };

      const docRef = await addDoc(
        collection(db, "diaries"),
        newDiary
      );

      // 공개 일기만 목록에 추가
      if (isPublic) {
        setDiaries((prev) =>
          [
            {
              id: docRef.id,
              ...newDiary,
            },
            ...prev,
          ].sort((a, b) =>
            b.date.localeCompare(a.date)
          )
        );
      }

      alert("일기가 저장되었습니다!");

      setDiaryTitle("");
      setDiaryContent("");
      setDiaryDate("");
      setDiaryIcon("🌱");
      setIsPublic(true);
      setIsWriteOpen(false);
    } catch (error) {
      console.error(
        "일기 저장 실패:",
        error
      );

      alert("일기 저장에 실패했습니다.");
    }
  };

  // ==================== 날짜 표시 ====================

  const formatDate = (date: string) => {
    const [year, month, day] =
      date.split("-");

    return `${year}.${month}.${day}`;
  };

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
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* ==================== HEADER ==================== */}

        <header
          style={{
            borderBottom:
              "1px solid #B9DFF5",
            paddingBottom: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "400",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            DIARY
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: "20px",
              fontSize: "14px",
              opacity: 0.65,
            }}
          >
            지나온 날들의 기록
          </p>

          <Navigation />
        </header>

        {/* ==================== 다이어리 목록 ==================== */}

        <section
          style={{
            marginTop: "35px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              ALL DIARY
            </h2>

            <button
              onClick={() =>
                setIsWriteOpen(true)
              }
              style={{
                border: "none",
                background: "#2878B5",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "9px 15px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              ✎ 일기 작성
            </button>
          </div>

          {/* 목록 */}

          <div
            style={{
              background: "#FFFFFF",
              border:
                "1px solid #B9DFF5",
              borderRadius: "20px",
              padding: "10px",
              boxShadow:
                "0 10px 30px rgba(40, 120, 181, 0.08)",
              boxSizing: "border-box",
            }}
          >
            {loading ? (
              <div
                style={{
                  padding: "50px 20px",
                  textAlign: "center",
                  color: "#8AAFC5",
                  fontSize: "14px",
                }}
              >
                일기를 불러오는 중...
              </div>
            ) : diaries.length === 0 ? (
              <div
                style={{
                  padding: "50px 20px",
                  textAlign: "center",
                  color: "#8AAFC5",
                  fontSize: "14px",
                }}
              >
                아직 공개된 일기가 없습니다.
              </div>
            ) : (
              <div
                style={{
                  maxHeight: "650px",
                  overflowY: "auto",
                }}
              >
                {diaries.map((diary) => (
                  <button
                    key={diary.id}
                    onClick={() =>
                      setSelectedDiary(diary)
                    }
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom:
                        "1px solid #EAF6FF",
                      background:
                        "transparent",
                      padding:
                        "18px 15px",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "#234A68",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: "10px",
                      }}
                    >
                      {/* 일기 아이콘 */}

                      <span
                        style={{
                          fontSize: "18px",
                          flexShrink: 0,
                        }}
                      >
                        {diary.icon}
                      </span>

                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            fontSize: "15px",
                            whiteSpace:
                              "nowrap",
                            overflow:
                              "hidden",
                            textOverflow:
                              "ellipsis",
                          }}
                        >
                          {diary.title}
                        </div>

                        <div
                          style={{
                            marginTop: "5px",
                            fontSize: "12px",
                            color:
                              "#8AAFC5",
                          }}
                        >
                          {formatDate(
                            diary.date
                          )}
                        </div>
                      </div>

                      <span
                        style={{
                          color: "#B9DFF5",
                          fontSize: "18px",
                        }}
                      >
                        ›
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ==================== 일기 상세 팝업 ==================== */}

      {selectedDiary && (
        <div
          onClick={() =>
            setSelectedDiary(null)
          }
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
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "620px",
              maxHeight: "80vh",
              overflowY: "auto",
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "35px",
              boxShadow:
                "0 15px 40px rgba(40, 120, 181, 0.2)",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                }}
              >
                {selectedDiary.icon}
              </span>

              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "400",
                  }}
                >
                  {selectedDiary.title}
                </h2>

                <p
                  style={{
                    margin:
                      "7px 0 0",
                    fontSize: "12px",
                    color: "#8AAFC5",
                  }}
                >
                  {formatDate(
                    selectedDiary.date
                  )}
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: "25px",
                paddingTop: "25px",
                borderTop:
                  "1px solid #EAF6FF",
                fontSize: "14px",
                lineHeight: "1.9",
                whiteSpace: "pre-wrap",
                color: "#234A68",
              }}
            >
              {selectedDiary.content}
            </div>

            <div
              style={{
                textAlign: "right",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() =>
                  setSelectedDiary(null)
                }
                style={{
                  border: "none",
                  background: "#2878B5",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  padding:
                    "9px 16px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 일기 작성 팝업 ==================== */}

      {isWriteOpen && (
        <div
          onClick={() =>
            setIsWriteOpen(false)
          }
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
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "520px",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "30px",
              boxShadow:
                "0 15px 40px rgba(40, 120, 181, 0.2)",
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
              일기 작성
            </h2>

            {/* 날짜 */}

            <label
              style={{
                display: "block",
                marginTop: "22px",
                marginBottom: "7px",
                fontSize: "13px",
              }}
            >
              날짜
            </label>

            <input
              type="date"
              value={diaryDate}
              onChange={(e) =>
                setDiaryDate(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "10px",
                border:
                  "1px solid #B9DFF5",
                borderRadius: "8px",
                boxSizing:
                  "border-box",
                outline: "none",
              }}
            />

            {/* 제목 */}

            <label
              style={{
                display: "block",
                marginTop: "18px",
                marginBottom: "7px",
                fontSize: "13px",
              }}
            >
              제목
            </label>

            <input
              type="text"
              value={diaryTitle}
              onChange={(e) =>
                setDiaryTitle(
                  e.target.value
                )
              }
              placeholder="오늘의 제목"
              style={{
                width: "100%",
                padding: "10px",
                border:
                  "1px solid #B9DFF5",
                borderRadius: "8px",
                boxSizing:
                  "border-box",
                outline: "none",
              }}
            />

            {/* 아이콘 */}

            <label
              style={{
                display: "block",
                marginTop: "18px",
                marginBottom: "10px",
                fontSize: "13px",
              }}
            >
              아이콘
            </label>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {diaryIcons.map(
                (icon) => (
                  <button
                    key={icon}
                    onClick={() =>
                      setDiaryIcon(icon)
                    }
                    style={{
                      width: "42px",
                      height: "42px",
                      border:
                        diaryIcon === icon
                          ? "2px solid #2878B5"
                          : "1px solid #B9DFF5",
                      borderRadius: "10px",
                      background:
                        diaryIcon === icon
                          ? "#EAF6FF"
                          : "#FFFFFF",
                      fontSize: "19px",
                      cursor: "pointer",
                    }}
                  >
                    {icon}
                  </button>
                )
              )}
            </div>

            {/* 내용 */}

            <label
              style={{
                display: "block",
                marginTop: "18px",
                marginBottom: "7px",
                fontSize: "13px",
              }}
            >
              내용
            </label>

            <textarea
              value={diaryContent}
              onChange={(e) =>
                setDiaryContent(
                  e.target.value
                )
              }
              placeholder="오늘의 이야기를 적어보세요."
              rows={10}
              style={{
                width: "100%",
                padding: "12px",
                border:
                  "1px solid #B9DFF5",
                borderRadius: "8px",
                boxSizing:
                  "border-box",
                outline: "none",
                resize: "vertical",
                fontFamily:
                  "inherit",
                color: "#234A68",
                lineHeight: "1.7",
              }}
            />

            {/* 공개 여부 */}

            <div
              style={{
                marginTop: "18px",
                padding: "15px",
                borderRadius: "10px",
                background: "#F5FBFF",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) =>
                    setIsPublic(
                      e.target.checked
                    )
                  }
                />

                {isPublic
                  ? "공개 일기"
                  : "비공개 일기"}
              </label>

              <p
                style={{
                  margin:
                    "7px 0 0 24px",
                  fontSize: "11px",
                  color: "#8AAFC5",
                }}
              >
                {isPublic
                  ? "방문자가 다이어리 목록에서 볼 수 있어요."
                  : "외부 방문자에게 공개되지 않아요."}
              </p>
            </div>

            {/* 버튼 */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "8px",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() => {
                  setIsWriteOpen(false);
                  setDiaryTitle("");
                  setDiaryContent("");
                  setDiaryDate("");
                  setDiaryIcon("🌱");
                  setIsPublic(true);
                }}
                style={{
                  border: "none",
                  background:
                    "transparent",
                  color: "#8AAFC5",
                  padding:
                    "8px 12px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>

              <button
                onClick={handleDiarySave}
                style={{
                  border: "none",
                  background:
                    "#2878B5",
                  color: "#FFFFFF",
                  borderRadius:
                    "8px",
                  padding:
                    "9px 16px",
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

