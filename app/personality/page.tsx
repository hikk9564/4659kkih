"use client";

import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { auth, db, storage } from "../../lib/firebase";

type PersonalityItem = {
  id: string;
  boldText: string;
  normalText: string;
  order: number;
};

const ADMIN_EMAIL = "hyoeunzz09@gmail.com";

export default function PersonalityPage() {
  const [user, setUser] = useState<User | null>(null);

  const [imageUrl, setImageUrl] = useState("");

  const [items, setItems] = useState<PersonalityItem[]>([]);

  const [isAdding, setIsAdding] = useState(false);

  const [newBoldText, setNewBoldText] = useState("");
  const [newNormalText, setNewNormalText] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingBoldText, setEditingBoldText] = useState("");
  const [editingNormalText, setEditingNormalText] =
    useState("");

  const [isLoading, setIsLoading] = useState(true);

  const isAdmin =
    user?.email?.toLowerCase() ===
    ADMIN_EMAIL.toLowerCase();

  // ==================== 로그인 상태 ====================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  // ==================== 성향표 이미지 불러오기 ====================

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageDoc = await getDoc(
          doc(db, "personality", "image")
        );

        if (imageDoc.exists()) {
          const data = imageDoc.data();

          setImageUrl(data.imageUrl || "");
        }
      } catch (error) {
        console.error(
          "성향표 이미지 불러오기 실패:",
          error
        );
      }
    };

    loadImage();
  }, []);

  // ==================== 성향표 항목 불러오기 ====================

  useEffect(() => {
    const loadItems = async () => {
      try {
        const q = query(
          collection(db, "personalityItems"),
          orderBy("order", "asc")
        );

        const snapshot = await getDocs(q);

        const list = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        })) as PersonalityItem[];

        setItems(list);
      } catch (error) {
        console.error(
          "성향표 항목 불러오기 실패:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  // ==================== 이미지 업로드 ====================

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!isAdmin) {
      alert("관리자만 이미지를 변경할 수 있습니다.");
      return;
    }

    try {
      const imageRef = ref(
        storage,
        `personality/personality-${Date.now()}-${file.name}`
      );

      await uploadBytes(imageRef, file);

      const url = await getDownloadURL(imageRef);

      await setDoc(
        doc(db, "personality", "image"),
        {
          imageUrl: url,
        },
        {
          merge: true,
        }
      );

      setImageUrl(url);

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

    event.target.value = "";
  };

  // ==================== 항목 추가 ====================

  const handleAddItem = async () => {
    if (!newBoldText.trim()) {
      alert("볼드체 내용을 입력해주세요.");
      return;
    }

    if (!newNormalText.trim()) {
      alert("일반 폰트 내용을 입력해주세요.");
      return;
    }

    if (!isAdmin) {
      alert("관리자만 수정할 수 있습니다.");
      return;
    }

    try {
      const nextOrder =
        items.length > 0
          ? Math.max(
              ...items.map((item) => item.order)
            ) + 1
          : 0;

      const docRef = await addDoc(
        collection(db, "personalityItems"),
        {
          boldText: newBoldText.trim(),
          normalText: newNormalText.trim(),
          order: nextOrder,
        }
      );

      const newItem: PersonalityItem = {
        id: docRef.id,
        boldText: newBoldText.trim(),
        normalText: newNormalText.trim(),
        order: nextOrder,
      };

      setItems((prev) => [
        ...prev,
        newItem,
      ]);

      setNewBoldText("");
      setNewNormalText("");
      setIsAdding(false);

      alert("항목이 추가되었습니다!");
    } catch (error) {
      console.error(
        "성향표 항목 추가 실패:",
        error
      );

      alert(
        "항목 추가에 실패했습니다."
      );
    }
  };

  // ==================== 항목 수정 시작 ====================

  const startEditing = (
    item: PersonalityItem
  ) => {
    if (!isAdmin) return;

    setEditingId(item.id);
    setEditingBoldText(item.boldText);
    setEditingNormalText(item.normalText);
  };

  // ==================== 항목 수정 저장 ====================

  const handleEditSave = async () => {
    if (!editingId) return;

    if (!editingBoldText.trim()) {
      alert("볼드체 내용을 입력해주세요.");
      return;
    }

    if (!editingNormalText.trim()) {
      alert("일반 폰트 내용을 입력해주세요.");
      return;
    }

    if (!isAdmin) {
      alert("관리자만 수정할 수 있습니다.");
      return;
    }

    try {
      await updateDoc(
        doc(
          db,
          "personalityItems",
          editingId
        ),
        {
          boldText:
            editingBoldText.trim(),
          normalText:
            editingNormalText.trim(),
        }
      );

      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                boldText:
                  editingBoldText.trim(),
                normalText:
                  editingNormalText.trim(),
              }
            : item
        )
      );

      setEditingId(null);
      setEditingBoldText("");
      setEditingNormalText("");

      alert("수정되었습니다!");
    } catch (error) {
      console.error(
        "성향표 항목 수정 실패:",
        error
      );

      alert(
        "항목 수정에 실패했습니다."
      );
    }
  };

  // ==================== 항목 삭제 ====================

  const handleDelete = async (
    id: string
  ) => {
    if (!isAdmin) {
      alert("관리자만 삭제할 수 있습니다.");
      return;
    }

    const confirmed = window.confirm(
      "이 항목을 삭제할까요?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(
        doc(db, "personalityItems", id)
      );

      setItems((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.error(
        "성향표 항목 삭제 실패:",
        error
      );

      alert(
        "항목 삭제에 실패했습니다."
      );
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
          PERSONALITY
        </h1>

        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          성향표
        </p>

        <Navigation />
      </header>

      {/* ==================== 성향표 이미지 ==================== */}

      <section
        style={{
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
            overflow: "hidden",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent:
                "center",
              alignItems: "flex-start",
              background: "#F5FBFF",
              padding: "0 0",
              boxSizing: "border-box",
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
                  width: "100%",
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  color: "#8AAFC5",
                  fontSize: "14px",
                }}
              >
                아직 성향표 이미지가 없습니다.
              </div>
            )}
          </div>

          {/* 관리자 이미지 변경 */}

          {isAdmin && (
            <div
              style={{
                padding: "13px 18px",
                borderTop:
                  "1px solid #EAF6FF",
                textAlign: "right",
              }}
            >
              <label
                style={{
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
            </div>
          )}
        </div>
      </section>

      {/* ==================== 2차 ==================== */}

      <section
        style={{
          maxWidth: "1100px",
          margin: "30px auto 0",
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
        <h2
          style={{
            margin: 0,
            fontSize: "27px",
            fontWeight: "700",
          }}
        >
          2차
        </h2>

        {/* ==================== 항목 목록 ==================== */}

        <div
          style={{
            marginTop: "25px",
          }}
        >
          {isLoading ? (
            <p
              style={{
                color: "#8AAFC5",
                fontSize: "14px",
              }}
            >
              불러오는 중...
            </p>
          ) : items.length === 0 ? (
            <p
              style={{
                color: "#8AAFC5",
                fontSize: "14px",
              }}
            >
              아직 등록된 내용이 없습니다.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  padding:
                    "15px 0",
                  borderBottom:
                    "1px solid #EAF6FF",
                }}
              >
                {editingId === item.id ? (
                  /* ==================== 수정 중 ==================== */

                  <div>
                    <input
                      type="text"
                      value={
                        editingBoldText
                      }
                      onChange={(e) =>
                        setEditingBoldText(
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        boxSizing:
                          "border-box",
                        padding:
                          "10px",
                        border:
                          "1px solid #B9DFF5",
                        borderRadius:
                          "8px",
                        outline:
                          "none",
                        fontWeight:
                          "700",
                        color:
                          "#234A68",
                      }}
                    />

                    <input
                      type="text"
                      value={
                        editingNormalText
                      }
                      onChange={(e) =>
                        setEditingNormalText(
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        boxSizing:
                          "border-box",
                        padding:
                          "10px",
                        marginTop:
                          "8px",
                        border:
                          "1px solid #B9DFF5",
                        borderRadius:
                          "8px",
                        outline:
                          "none",
                        fontWeight:
                          "400",
                        color:
                          "#234A68",
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
                          "10px",
                      }}
                    >
                      <button
                        onClick={() => {
                          setEditingId(
                            null
                          );
                        }}
                        style={{
                          border:
                            "none",
                          background:
                            "transparent",
                          color:
                            "#8AAFC5",
                          cursor:
                            "pointer",
                        }}
                      >
                        취소
                      </button>

                      <button
                        onClick={
                          handleEditSave
                        }
                        style={{
                          border:
                            "none",
                          background:
                            "#2878B5",
                          color:
                            "#FFFFFF",
                          borderRadius:
                            "8px",
                          padding:
                            "8px 14px",
                          cursor:
                            "pointer",
                        }}
                      >
                        저장
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ==================== 일반 표시 ==================== */

                  <>
                    <div
                      style={{
                        fontWeight:
                          "700",
                        fontSize:
                          "15px",
                        lineHeight:
                          "1.7",
                      }}
                    >
                      {item.boldText}
                    </div>

                    <div
                      style={{
                        marginTop:
                          "3px",
                        fontWeight:
                          "400",
                        fontSize:
                          "14px",
                        lineHeight:
                          "1.7",
                        opacity: 0.85,
                      }}
                    >
                      {item.normalText}
                    </div>

                    {isAdmin && (
                      <div
                        style={{
                          marginTop:
                            "8px",
                          display:
                            "flex",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={() =>
                            startEditing(
                              item
                            )
                          }
                          style={{
                            border:
                              "none",
                            background:
                              "transparent",
                            color:
                              "#2878B5",
                            fontSize:
                              "12px",
                            cursor:
                              "pointer",
                            padding: 0,
                          }}
                        >
                          수정
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                          style={{
                            border:
                              "none",
                            background:
                              "transparent",
                            color:
                              "#8AAFC5",
                            fontSize:
                              "12px",
                            cursor:
                              "pointer",
                            padding: 0,
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* ==================== 관리자 추가 ==================== */}

        {isAdmin && (
          <div
            style={{
              marginTop: "25px",
            }}
          >
            {!isAdding ? (
              <button
                onClick={() =>
                  setIsAdding(true)
                }
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
                  fontSize:
                    "13px",
                  cursor:
                    "pointer",
                }}
              >
                + 항목 추가
              </button>
            ) : (
              <div
                style={{
                  padding:
                    "20px",
                  background:
                    "#F5FBFF",
                  borderRadius:
                    "12px",
                }}
              >
                <input
                  type="text"
                  value={
                    newBoldText
                  }
                  onChange={(e) =>
                    setNewBoldText(
                      e.target.value
                    )
                  }
                  placeholder="볼드체 내용"
                  style={{
                    width:
                      "100%",
                    boxSizing:
                      "border-box",
                    padding:
                      "10px",
                    border:
                      "1px solid #B9DFF5",
                    borderRadius:
                      "8px",
                    outline:
                      "none",
                    fontWeight:
                      "700",
                  }}
                />

                <input
                  type="text"
                  value={
                    newNormalText
                  }
                  onChange={(e) =>
                    setNewNormalText(
                      e.target.value
                    )
                  }
                  placeholder="일반 폰트 내용"
                  style={{
                    width:
                      "100%",
                    boxSizing:
                      "border-box",
                    padding:
                      "10px",
                    marginTop:
                      "8px",
                    border:
                      "1px solid #B9DFF5",
                    borderRadius:
                      "8px",
                    outline:
                      "none",
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
                      "12px",
                  }}
                >
                  <button
                    onClick={() => {
                      setIsAdding(
                        false
                      );
                      setNewBoldText(
                        ""
                      );
                      setNewNormalText(
                        ""
                      );
                    }}
                    style={{
                      border:
                        "none",
                      background:
                        "transparent",
                      color:
                        "#8AAFC5",
                      cursor:
                        "pointer",
                    }}
                  >
                    취소
                  </button>

                  <button
                    onClick={
                      handleAddItem
                    }
                    style={{
                      border:
                        "none",
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
            )}
          </div>
        )}
      </section>
    </main>
  );
}
