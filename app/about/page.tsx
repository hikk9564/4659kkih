"use client";

import Navigation from "../components/Navigation";
import LoginButton from "../components/LoginButton";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db, auth } from "../../lib/firebase";

type TextItem = {
  bold: string;
  normal: string;
};

export default function AboutPage() {
  const ADMIN_EMAIL = "hyoeunzz09@gmail.com";

  const [user, setUser] = useState<User | null>(null);

  const [imageUrl, setImageUrl] = useState("");
  const [imageText, setImageText] = useState("성향표");

  const [editingImageText, setEditingImageText] =
    useState(false);

  const [newImageText, setNewImageText] =
    useState("");

  const [textItems, setTextItems] = useState<TextItem[]>(
    []
  );

  const [editingTexts, setEditingTexts] =
    useState(false);

  const [editItems, setEditItems] = useState<TextItem[]>(
    []
  );

  // ==================== 로그인 ====================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  // ==================== 성향표 불러오기 ====================

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const aboutDoc = await getDoc(
          doc(db, "homepage", "about")
        );

        if (aboutDoc.exists()) {
          const data = aboutDoc.data();

          setImageUrl(data.imageUrl || "");
          setImageText(data.imageText || "성향표");

          if (Array.isArray(data.textItems)) {
            setTextItems(data.textItems);
          }
        } else {
          setTextItems([
            {
              bold: "좋아하는 것",
              normal: "그림 그리기",
            },
          ]);
        }
      } catch (error) {
        console.error(
          "성향표 불러오기 실패:",
          error
        );
      }
    };

    loadAbout();
  }, []);

  // ==================== 이미지 업로드 ====================

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "upload_preset",
        "homepage_upload"
      );

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/nr7d0kyv/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Cloudinary 업로드 실패"
        );
      }

      const data = await response.json();
      const url = data.secure_url;

      setImageUrl(url);

      await setDoc(
        doc(db, "homepage", "about"),
        {
          imageUrl: url,
        },
        { merge: true }
      );

      alert("성향표 이미지가 변경되었습니다!");
    } catch (error) {
      console.error(
        "성향표 이미지 업로드 실패:",
        error
      );

      alert(
        "이미지 업로드에 실패했습니다."
      );
    }
  };

  // ==================== 이미지 문구 저장 ====================

  const handleImageTextSave = async () => {
    const text = newImageText.trim();

    if (!text) {
      alert("문구를 입력해주세요.");
      return;
    }

    try {
      await setDoc(
        doc(db, "homepage", "about"),
        {
          imageText: text,
        },
        { merge: true }
      );

      setImageText(text);
      setEditingImageText(false);

      alert("문구가 변경되었습니다!");
    } catch (error) {
      console.error(
        "문구 변경 실패:",
        error
      );

      alert(
        "문구 변경에 실패했습니다."
      );
    }
  };

  // ==================== 텍스트 편집 시작 ====================

  const startEditingTexts = () => {
    setEditItems(
      textItems.length > 0
        ? textItems.map((item) => ({
            bold: item.bold,
            normal: item.normal,
          }))
        : [
            {
              bold: "",
              normal: "",
            },
          ]
    );

    setEditingTexts(true);
  };

  // ==================== 텍스트 저장 ====================

  const saveTexts = async () => {
    try {
      await setDoc(
        doc(db, "homepage", "about"),
        {
          textItems: editItems,
        },
        { merge: true }
      );

      setTextItems(editItems);
      setEditingTexts(false);

      alert("텍스트가 저장되었습니다!");
    } catch (error) {
      console.error(
        "텍스트 저장 실패:",
        error
      );

      alert(
        "텍스트 저장에 실패했습니다."
      );
    }
  };

  // ==================== 텍스트 추가 ====================

  const addTextItem = () => {
    setEditItems((prev) => [
      ...prev,
      {
        bold: "",
        normal: "",
      },
    ]);
  };

  // ==================== 텍스트 삭제 ====================

  const deleteTextItem = (index: number) => {
    setEditItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ==================== 화면 ====================

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
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "/";
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

        <Navigation />
        <LoginButton />
      </header>

      {/* ==================== 성향표 ==================== */}

      <section
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "45px auto 0",
          boxSizing: "border-box",
        }}
      >
        {/* 이미지 */}

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="성향표"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F5FBFF",
                color: "#8AAFC5",
                fontSize: "13px",
              }}
            >
              성향표 이미지를 등록해주세요
            </div>
          )}

          {/* 이미지 바로 아래 관리자 버튼 */}

          <div
            style={{
              padding: "10px 15px",
              textAlign: "right",
              background: "#FFFFFF",
            }}
          >
            <span
              style={{
                color: "#2878B5",
                fontSize: "12px",
              }}
            >
              {imageText}
            </span>

            {user?.email === ADMIN_EMAIL && (
              <>
                {editingImageText ? (
                  <>
                    <input
                      type="text"
                      value={newImageText}
                      onChange={(e) =>
                        setNewImageText(
                          e.target.value
                        )
                      }
                      style={{
                        marginLeft: "10px",
                        border:
                          "1px solid #B9DFF5",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        fontSize: "12px",
                        outline: "none",
                        width: "180px",
                        boxSizing:
                          "border-box",
                      }}
                    />

                    <button
                      onClick={
                        handleImageTextSave
                      }
                      style={{
                        marginLeft: "6px",
                        border: "none",
                        background:
                          "#2878B5",
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        padding:
                          "6px 10px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      저장
                    </button>

                    <button
                      onClick={() =>
                        setEditingImageText(
                          false
                        )
                      }
                      style={{
                        marginLeft: "5px",
                        border: "none",
                        background:
                          "transparent",
                        color: "#8AAFC5",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setNewImageText(
                        imageText
                      );
                      setEditingImageText(
                        true
                      );
                    }}
                    style={{
                      marginLeft: "10px",
                      border: "none",
                      background:
                        "transparent",
                      color: "#2878B5",
                      fontSize: "12px",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    문구 변경
                  </button>
                )}

                <label
                  style={{
                    marginLeft: "12px",
                    color: "#2878B5",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  이미지 변경

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageUpload
                    }
                    style={{
                      display: "none",
                    }}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {/* ==================== 텍스트 ==================== */}

        <div
          style={{
            marginTop: "25px",
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            padding: "30px 35px",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
            boxSizing: "border-box",
          }}
        >
          {!editingTexts ? (
            <>
              {textItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom:
                      index ===
                      textItems.length - 1
                        ? 0
                        : "28px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.bold}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: 1.7,
                      opacity: 0.75,
                    }}
                  >
                    {item.normal}
                  </div>
                </div>
              ))}

              {user?.email ===
                ADMIN_EMAIL && (
                <button
                  onClick={
                    startEditingTexts
                  }
                  style={{
                    marginTop:
                      textItems.length > 0
                        ? "25px"
                        : 0,
                    border: "none",
                    background:
                      "transparent",
                    color: "#2878B5",
                    fontSize: "12px",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  텍스트 수정
                </button>
              )}
            </>
          ) : (
            <>
              {editItems.map(
                (item, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "25px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="굵은 글씨"
                      value={item.bold}
                      onChange={(e) => {
                        const next = [
                          ...editItems,
                        ];

                        next[index] = {
                          ...next[index],
                          bold: e.target.value,
                        };

                        setEditItems(next);
                      }}
                      style={{
                        width: "100%",
                        boxSizing:
                          "border-box",
                        border:
                          "1px solid #B9DFF5",
                        borderRadius: "8px",
                        padding: "9px 10px",
                        fontWeight: "700",
                        outline: "none",
                        marginBottom: "8px",
                      }}
                    />

                    <input
                      type="text"
                      placeholder="일반 글씨"
                      value={item.normal}
                      onChange={(e) => {
                        const next = [
                          ...editItems,
                        ];

                        next[index] = {
                          ...next[index],
                          normal:
                            e.target.value,
                        };

                        setEditItems(next);
                      }}
                      style={{
                        width: "100%",
                        boxSizing:
                          "border-box",
                        border:
                          "1px solid #B9DFF5",
                        borderRadius: "8px",
                        padding: "9px 10px",
                        outline: "none",
                      }}
                    />

                    <button
                      onClick={() =>
                        deleteTextItem(
                          index
                        )
                      }
                      style={{
                        marginTop: "7px",
                        border: "none",
                        background:
                          "transparent",
                        color: "#8AAFC5",
                        fontSize: "12px",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      삭제
                    </button>
                  </div>
                )
              )}

              {/* 추가 */}

              <button
                onClick={addTextItem}
                style={{
                  border:
                    "1px solid #B9DFF5",
                  background: "#F5FBFF",
                  color: "#2878B5",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                + 추가
              </button>

              {/* 저장 */}

              <button
                onClick={saveTexts}
                style={{
                  marginLeft: "8px",
                  border: "none",
                  background:
                    "#2878B5",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                저장
              </button>

              {/* 취소 */}

              <button
                onClick={() =>
                  setEditingTexts(false)
                }
                style={{
                  marginLeft: "8px",
                  border: "none",
                  background:
                    "transparent",
                  color: "#8AAFC5",
                  borderRadius: "8px",
                  padding: "8px 5px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
