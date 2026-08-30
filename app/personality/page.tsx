"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth, db, storage } from "../../lib/firebase";
import Navigation from "../components/Navigation";

type TextPair = {
  id: string;
  bold: string;
  normal: string;
};

// ==================================================
// 관리자 계정
// ==================================================

// 여기에 네 관리자 Google 계정 이메일을 입력
const ADMIN_EMAIL = "여기에_관리자_이메일@example.com";

export default function PersonalityPage() {
  // ==================================================
  // 로그인
  // ==================================================

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ==================================================
  // 성향표 이미지
  // ==================================================

  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] =
    useState(false);

  // ==================================================
  // 2차 텍스트
  // ==================================================

  const [textPairs, setTextPairs] =
    useState<TextPair[]>([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editBold, setEditBold] =
    useState("");

  const [editNormal, setEditNormal] =
    useState("");

  const [isAdding, setIsAdding] =
    useState(false);

  const [newBold, setNewBold] =
    useState("");

  const [newNormal, setNewNormal] =
    useState("");

  const [loadingData, setLoadingData] =
    useState(true);

  // ==================================================
  // 관리자 여부
  // ==================================================

  const isAdmin =
    user?.email === ADMIN_EMAIL;

  // ==================================================
  // 로그인 상태 확인
  // ==================================================

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoadingUser(false);
      });

    return () => unsubscribe();
  }, []);

  // ==================================================
  // 성향표 데이터 불러오기
  // ==================================================

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

          if (data.imageUrl) {
            setImageUrl(data.imageUrl);
          }

          if (Array.isArray(data.textPairs)) {
            setTextPairs(
              data.textPairs as TextPair[]
            );
          }
        }
      } catch (error) {
        console.error(
          "성향표 불러오기 실패:",
          error
        );
      } finally {
        setLoadingData(false);
      }
    };

    loadPersonality();
  }, []);

  // ==================================================
  // 이미지 업로드
  // ==================================================

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!isAdmin) {
      alert(
        "관리자만 이미지를 변경할 수 있습니다."
      );
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드해주세요.");
      return;
    }

    try {
      setUploadingImage(true);

      const imageRef = ref(
        storage,
        `personality/personality-image-${Date.now()}`
      );

      await uploadBytes(
        imageRef,
        file
      );

      const url =
        await getDownloadURL(imageRef);

      await setDoc(
        doc(
          db,
          "siteContent",
          "personality"
        ),
        {
          imageUrl: url,
        },
        {
          merge: true,
        }
      );

      setImageUrl(url);

      alert(
        "성향표 이미지가 변경되었습니다!"
      );
    } catch (error) {
      console.error(
        "이미지 업로드 실패:",
        error
      );

      alert(
        "이미지 업로드에 실패했습니다."
      );
    } finally {
      setUploadingImage(false);

      event.target.value = "";
    }
  };

  // ==================================================
  // 2차 텍스트 전체 저장
  // ==================================================

  const saveTextPairs = async (
    updatedPairs: TextPair[]
  ) => {
    try {
      await setDoc(
        doc(
          db,
          "siteContent",
          "personality"
        ),
        {
          textPairs: updatedPairs,
        },
        {
          merge: true,
        }
      );

      setTextPairs(updatedPairs);
    } catch (error) {
      console.error(
        "텍스트 저장 실패:",
        error
      );

      alert(
        "내용 저장에 실패했습니다."
      );
    }
  };

  // ==================================================
  // 텍스트 추가
  // ==================================================

  const handleAddText = async () => {
    if (!newBold.trim()) {
      alert(
        "볼드체 내용을 입력해주세요."
      );
      return;
    }

    if (!newNormal.trim()) {
      alert(
        "일반 폰트 내용을 입력해주세요."
      );
      return;
    }

    const newPair: TextPair = {
      id: Date.now().toString(),
      bold: newBold.trim(),
      normal: newNormal.trim(),
    };

    const updatedPairs = [
      ...textPairs,
      newPair,
    ];

    await saveTextPairs(updatedPairs);

    setNewBold("");
    setNewNormal("");
    setIsAdding(false);
  };

  // ==================================================
  // 텍스트 수정 시작
  // ==================================================

  const startEditing = (
    pair: TextPair
  ) => {
    setEditingId(pair.id);
    setEditBold(pair.bold);
    setEditNormal(pair.normal);
  };

  // ==================================================
  // 텍스트 수정 저장
  // ==================================================

  const handleEditSave = async () => {
    if (!editingId) return;

    if (!editBold.trim()) {
      alert(
        "볼드체 내용을 입력해주세요."
      );
      return;
    }

    if (!editNormal.trim()) {
      alert(
        "일반 폰트 내용을 입력해주세요."
      );
      return;
    }

    const updatedPairs =
      textPairs.map((pair) =>
        pair.id === editingId
          ? {
              ...pair,
              bold: editBold.trim(),
              normal: editNormal.trim(),
            }
          : pair
      );

    await saveTextPairs(updatedPairs);

    setEditingId(null);
    setEditBold("");
    setEditNormal("");
  };

  // ==================================================
  // 텍스트 삭제
  // ==================================================

  const handleDelete = async (
    id: string
  ) => {
    if (
      !confirm(
        "이 내용을 삭제할까요?"
      )
    ) {
      return;
    }

    const updatedPairs =
      textPairs.filter(
        (pair) => pair.id !== id
      );

    await saveTextPairs(updatedPairs);
  };

  // ==================================================
  // 화면
  // ==================================================

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
      {/* ==================================================
          HEADER
      ================================================== */}

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
            fontWeight: "400",
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

      {/* ==================================================
          CONTENT
      ================================================== */}

      <section
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "45px auto 0",
        }}
      >
        {/* ==================================================
            성향표 이미지
        ================================================== */}

        <section
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
          {loadingData ? (
            <p
              style={{
                textAlign: "center",
                color: "#8AAFC5",
              }}
            >
              불러오는 중...
            </p>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="성향표"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "10px",
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
                background: "#F5FBFF",
                borderRadius: "10px",
                color: "#8AAFC5",
                fontSize: "14px",
              }}
            >
              아직 등록된 성향표 이미지가 없습니다.
            </div>
          )}

          {/* 관리자 이미지 변경 */}

          {isAdmin && (
            <div
              style={{
                marginTop: "20px",
                textAlign: "right",
              }}
            >
              <label
                style={{
                  display: "inline-block",
                  background: "#2878B5",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  padding: "9px 16px",
                  fontSize: "13px",
                  cursor: uploadingImage
                    ? "default"
                    : "pointer",
                  opacity: uploadingImage
                    ? 0.6
                    : 1,
                }}
              >
                {uploadingImage
                  ? "업로드 중..."
                  : "이미지 변경"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageUpload
                  }
                  disabled={
                    uploadingImage
                  }
                  style={{
                    display: "none",
                  }}
                />
              </label>
            </div>
          )}
        </section>

        {/* ==================================================
            2차 텍스트
        ================================================== */}

        <section
          style={{
            marginTop: "25px",
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
          {/* 제목 */}

          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            2차
          </h2>

          {/* 내용 */}

          <div
            style={{
              marginTop: "25px",
            }}
          >
            {textPairs.length === 0 ? (
              <p
                style={{
                  margin: 0,
                  color: "#8AAFC5",
                  fontSize: "14px",
                }}
              >
                아직 등록된 내용이 없습니다.
              </p>
            ) : (
              textPairs.map((pair) => (
                <div
                  key={pair.id}
                  style={{
                    padding:
                      "18px 0",
                    borderBottom:
                      "1px solid #EAF6FF",
                  }}
                >
                  {editingId ===
                  pair.id ? (
                    /* ==============================
                       수정 화면
                    ============================== */

                    <div>
                      <input
                        type="text"
                        value={editBold}
                        onChange={(e) =>
                          setEditBold(
                            e.target.value
                          )
                        }
                        placeholder="볼드체 내용"
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
                          fontWeight:
                            "700",
                          color:
                            "#234A68",
                          outline:
                            "none",
                        }}
                      />

                      <input
                        type="text"
                        value={
                          editNormal
                        }
                        onChange={(e) =>
                          setEditNormal(
                            e.target.value
                          )
                        }
                        placeholder="일반 폰트 내용"
                        style={{
                          width: "100%",
                          marginTop:
                            "8px",
                          padding:
                            "10px",
                          border:
                            "1px solid #B9DFF5",
                          borderRadius:
                            "8px",
                          boxSizing:
                            "border-box",
                          fontWeight:
                            "400",
                          color:
                            "#234A68",
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
                    /* ==============================
                       일반 표시
                    ============================== */

                    <div>
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
                        {pair.bold}
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
                        }}
                      >
                        {pair.normal}
                      </div>

                      {/* 관리자 버튼 */}

                      {isAdmin && (
                        <div
                          style={{
                            display:
                              "flex",
                            gap: "8px",
                            marginTop:
                              "10px",
                          }}
                        >
                          <button
                            onClick={() =>
                              startEditing(
                                pair
                              )
                            }
                            style={{
                              border:
                                "1px solid #B9DFF5",
                              background:
                                "#FFFFFF",
                              color:
                                "#2878B5",
                              borderRadius:
                                "7px",
                              padding:
                                "5px 10px",
                              fontSize:
                                "12px",
                              cursor:
                                "pointer",
                            }}
                          >
                            수정
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                pair.id
                              )
                            }
                            style={{
                              border:
                                "1px solid #B9DFF5",
                              background:
                                "#FFFFFF",
                              color:
                                "#8AAFC5",
                              borderRadius:
                                "7px",
                              padding:
                                "5px 10px",
                              fontSize:
                                "12px",
                              cursor:
                                "pointer",
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* ==================================================
              관리자 새 내용 추가
          ================================================== */}

          {isAdmin && (
            <div
              style={{
                marginTop: "25px",
                paddingTop: "20px",
                borderTop:
                  "1px solid #EAF6FF",
              }}
            >
              {!isAdding ? (
                <button
                  onClick={() =>
                    setIsAdding(true)
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
                  + 내용 추가
                </button>
              ) : (
                <div>
                  <input
                    type="text"
                    value={newBold}
                    onChange={(e) =>
                      setNewBold(
                        e.target.value
                      )
                    }
                    placeholder="볼드체 내용"
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
                      fontWeight:
                        "700",
                      outline:
                        "none",
                    }}
                  />

                  <input
                    type="text"
                    value={
                      newNormal
                    }
                    onChange={(e) =>
                      setNewNormal(
                        e.target.value
                      )
                    }
                    placeholder="일반 폰트 내용"
                    style={{
                      width: "100%",
                      marginTop:
                        "8px",
                      padding:
                        "10px",
                      border:
                        "1px solid #B9DFF5",
                      borderRadius:
                        "8px",
                      boxSizing:
                        "border-box",
                      fontWeight:
                        "400",
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
                        setNewBold("");
                        setNewNormal("");
                      }}
                      style={{
                        border:
                          "none",
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
                        handleAddText
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
      </section>
    </main>
  );
}
