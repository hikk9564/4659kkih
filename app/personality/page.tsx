"use client";

import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { auth, db, storage } from "../../lib/firebase";

import Navigation from "../components/Navigation";

const ADMIN_EMAIL = "hyoeunzz09@gmail.com";

type PersonalityItem = {
  id: string;
  bold: string;
  normal: string;
};

export default function PersonalityPage() {
  const [user, setUser] = useState<User | null>(null);

  const [imageUrl, setImageUrl] = useState("");
  const [items, setItems] = useState<PersonalityItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(false);

  const [editItems, setEditItems] =
    useState<PersonalityItem[]>([]);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  // =========================
  // 관리자 여부
  // =========================

  const isAdmin =
    user?.email === ADMIN_EMAIL;

  // =========================
  // 로그인 상태 확인
  // =========================

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

    return () => unsubscribe();
  }, []);

  // =========================
  // 성향표 불러오기
  // =========================

  useEffect(() => {
    const loadPersonality = async () => {
      try {
        const personalityRef = doc(
          db,
          "siteContent",
          "personality"
        );

        const snapshot =
          await getDoc(personalityRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          setImageUrl(
            data.imageUrl || ""
          );

          setItems(
            data.items || []
          );
        }
      } catch (error) {
        console.error(
          "성향표 불러오기 실패:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadPersonality();
  }, []);

  // =========================
  // 이미지 선택
  // =========================

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있어요.");
      return;
    }

    setSelectedImage(file);
  };

  // =========================
  // 수정 시작
  // =========================

  const startEditing = () => {
    if (!isAdmin) return;

    setEditItems(
      items.length > 0
        ? [...items]
        : [
            {
              id: crypto.randomUUID(),
              bold: "",
              normal: "",
            },
          ]
    );

    setEditing(true);
  };

  // =========================
  // 항목 수정
  // =========================

  const updateItem = (
    id: string,
    field: "bold" | "normal",
    value: string
  ) => {
    setEditItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  // =========================
  // 항목 추가
  // =========================

  const addItem = () => {
    setEditItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        bold: "",
        normal: "",
      },
    ]);
  };

  // =========================
  // 항목 삭제
  // =========================

  const removeItem = (id: string) => {
    setEditItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  // =========================
  // 저장
  // =========================

  const savePersonality = async () => {
    if (!isAdmin) {
      alert("관리자만 수정할 수 있습니다.");
      return;
    }

    try {
      setSaving(true);

      let newImageUrl = imageUrl;

      // -------------------------
      // 이미지 업로드
      // -------------------------

      if (selectedImage) {
        const imageRef = ref(
          storage,
          `personality/personality-image-${Date.now()}`
        );

        await uploadBytes(
          imageRef,
          selectedImage
        );

        newImageUrl =
          await getDownloadURL(imageRef);
      }

      // -------------------------
      // 빈 항목 제거
      // -------------------------

      const cleanedItems =
        editItems.filter(
          (item) =>
            item.bold.trim() ||
            item.normal.trim()
        );

      // -------------------------
      // Firestore 저장
      // -------------------------

      await setDoc(
        doc(
          db,
          "siteContent",
          "personality"
        ),
        {
          imageUrl: newImageUrl,
          items: cleanedItems,
          updatedAt:
            new Date().toISOString(),
        }
      );

      setImageUrl(newImageUrl);
      setItems(cleanedItems);

      setSelectedImage(null);
      setEditing(false);

      alert("성향표가 저장되었습니다.");
    } catch (error) {
      console.error(
        "성향표 저장 실패:",
        error
      );

      alert(
        "저장에 실패했습니다. Firebase 설정과 권한을 확인해주세요."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // 로딩
  // =========================

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#EAF6FF",
          color: "#234A68",
          padding: "60px 5%",
          boxSizing: "border-box",
        }}
      >
        불러오는 중...
      </main>
    );
  }

  // =========================
  // 화면
  // =========================

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
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* =========================
            제목
        ========================= */}
<h1
  style={{
    fontSize: "42px",
    fontWeight: "400",
    margin: 0,
  }}
>
  PERSONALITY
</h1>

<Navigation />

        <Navigation />

        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            opacity: 0.65,
          }}
        >
          성향표
        </p>

        {/* =========================
            이미지 박스
        ========================= */}

        <section
          style={{
            marginTop: "35px",
            background: "#FFFFFF",
            border:
              "1px solid #B9DFF5",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
            boxSizing: "border-box",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="성향표"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                borderRadius: "12px",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border:
                  "1px dashed #B9DFF5",
                borderRadius: "12px",
                color: "#8AAFC5",
                fontSize: "14px",
              }}
            >
              등록된 성향표 이미지가 없습니다.
            </div>
          )}

          {/* =========================
              관리자 이미지 변경
          ========================= */}

          {editing && isAdmin && (
            <div
              style={{
                marginTop: "20px",
                paddingTop: "20px",
                borderTop:
                  "1px solid #EAF6FF",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: "13px",
                  color: "#8AAFC5",
                }}
              >
                성향표 이미지 변경
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
              />

              {selectedImage && (
                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#8AAFC5",
                  }}
                >
                  선택된 파일:{" "}
                  {selectedImage.name}
                </p>
              )}
            </div>
          )}
        </section>

        {/* =========================
            2차 박스
        ========================= */}

        <section
          style={{
            marginTop: "25px",
            background: "#FFFFFF",
            border:
              "1px solid #B9DFF5",
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
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            2차
          </h2>

          {/* =========================
              관리자 수정 화면
          ========================= */}

          {editing && isAdmin ? (
            <div
              style={{
                marginTop: "25px",
              }}
            >
              {editItems.map(
                (item, index) => (
                  <div
                    key={item.id}
                    style={{
                      marginBottom: "20px",
                      paddingBottom: "20px",
                      borderBottom:
                        "1px solid #EAF6FF",
                    }}
                  >
                    <input
                      type="text"
                      value={item.bold}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "bold",
                          e.target.value
                        )
                      }
                      placeholder="볼드체 내용"
                      style={{
                        width: "100%",
                        boxSizing:
                          "border-box",
                        padding: "10px",
                        border:
                          "1px solid #B9DFF5",
                        borderRadius:
                          "8px",
                        outline: "none",
                        fontWeight: "700",
                        color:
                          "#234A68",
                      }}
                    />

                    <input
                      type="text"
                      value={item.normal}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "normal",
                          e.target.value
                        )
                      }
                      placeholder="일반 폰트 내용"
                      style={{
                        width: "100%",
                        boxSizing:
                          "border-box",
                        padding: "10px",
                        marginTop:
                          "8px",
                        border:
                          "1px solid #B9DFF5",
                        borderRadius:
                          "8px",
                        outline: "none",
                        color:
                          "#234A68",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(
                          item.id
                        )
                      }
                      style={{
                        marginTop: "8px",
                        border: "none",
                        background:
                          "transparent",
                        color:
                          "#8AAFC5",
                        cursor:
                          "pointer",
                        fontSize:
                          "12px",
                      }}
                    >
                      이 항목 삭제
                    </button>
                  </div>
                )
              )}

              {/* 항목 추가 */}

              <button
                type="button"
                onClick={addItem}
                style={{
                  border:
                    "1px solid #B9DFF5",
                  background:
                    "#F5FBFF",
                  color:
                    "#2878B5",
                  borderRadius:
                    "8px",
                  padding:
                    "9px 15px",
                  cursor:
                    "pointer",
                  fontSize:
                    "13px",
                }}
              >
                + 항목 추가
              </button>

              {/* 저장 / 취소 */}

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
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setSelectedImage(
                      null
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
                  type="button"
                  onClick={
                    savePersonality
                  }
                  disabled={saving}
                  style={{
                    border: "none",
                    background:
                      "#2878B5",
                    color:
                      "#FFFFFF",
                    borderRadius:
                      "8px",
                    padding:
                      "8px 16px",
                    cursor:
                      saving
                        ? "default"
                        : "pointer",
                  }}
                >
                  {saving
                    ? "저장 중..."
                    : "저장"}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* =========================
                  실제 내용
              ========================= */}

              {items.length > 0 ? (
                <div
                  style={{
                    marginTop: "25px",
                  }}
                >
                  {items.map(
                    (item) => (
                      <div
                        key={item.id}
                        style={{
                          marginBottom:
                            "18px",
                        }}
                      >
                        <div
                          style={{
                            fontSize:
                              "15px",
                            fontWeight:
                              "700",
                            lineHeight:
                              "1.6",
                          }}
                        >
                          {item.bold}
                        </div>

                        <div
                          style={{
                            fontSize:
                              "14px",
                            fontWeight:
                              "400",
                            lineHeight:
                              "1.7",
                          }}
                        >
                          {item.normal}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p
                  style={{
                    marginTop:
                      "25px",
                    marginBottom: 0,
                    color:
                      "#8AAFC5",
                    fontSize:
                      "14px",
                  }}
                >
                  아직 등록된 내용이 없습니다.
                </p>
              )}
            </>
          )}

          {/* =========================
              수정 버튼
          ========================= */}

          {!editing && isAdmin && (
            <div
              style={{
                marginTop: "25px",
                paddingTop: "20px",
                borderTop:
                  "1px solid #EAF6FF",
                textAlign: "right",
              }}
            >
              <button
                type="button"
                onClick={
                  startEditing
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
                  cursor:
                    "pointer",
                  fontSize:
                    "13px",
                }}
              >
                성향표 수정
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

