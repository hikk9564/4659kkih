"use client";

import Navigation from "./components/Navigation";
import LoginButton from "./components/LoginButton";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "../lib/firebase";

export default function Home() {
  // ==================== 기본 상태 ====================

  const [imageUrl, setImageUrl] = useState("");
  const [imageText, setImageText] = useState("이미지 변경");

  // ==================== 자기소개 / SNS ====================

const [introText, setIntroText] = useState(
  "여기에 자기소개를 작성하세요."
);

const [twitterUrl, setTwitterUrl] = useState("#");
const [youtubeUrl, setYoutubeUrl] = useState("#");
const [crepeUrl, setCrepeUrl] = useState("#");

const [editingIntro, setEditingIntro] = useState(false);
const [editingSNS, setEditingSNS] = useState(false);

const [newIntroText, setNewIntroText] = useState("");

const [newTwitterUrl, setNewTwitterUrl] = useState("");
const [newYoutubeUrl, setNewYoutubeUrl] = useState("");
const [newCrepeUrl, setNewCrepeUrl] = useState("");

  const [user, setUser] = useState<User | null>(null);

  const ADMIN_EMAIL = "hyoeunzz09@gmail.com";

  // ==================== 이미지 문구 상태 ====================

  const [editingImageText, setEditingImageText] = useState(false);
  const [newImageText, setNewImageText] = useState("");

  // ==================== 방명록 상태 ====================

  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [guestPassword, setGuestPassword] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [guestbookList, setGuestbookList] = useState<any[]>([]);

  // ==================== 로그인 상태 확인 ====================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  // ==================== 저장된 이미지 불러오기 ====================

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageDoc = await getDoc(
          doc(db, "homepage", "images")
        );

        if (imageDoc.exists()) {
          const data = imageDoc.data();

          setImageUrl(data.image1 || "");
          setImageText(
            data.imageText || "이미지 변경"
          );
        }
      } catch (error) {
        console.error(
          "이미지 불러오기 실패:",
          error
        );
      }
    };

    loadImages();
  }, []);
    // ==================== 자기소개 / SNS 불러오기 ====================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileDoc = await getDoc(
          doc(db, "homepage", "profile")
        );

        if (profileDoc.exists()) {
          const data = profileDoc.data();

          setIntroText(
            data.introText ||
              "여기에 자기소개를 작성하세요."
          );

          setTwitterUrl(
            data.twitterUrl || "#"
          );

          setYoutubeUrl(
            data.youtubeUrl || "#"
          );

          setCrepeUrl(
            data.crepeUrl || "#"
          );
        }
      } catch (error) {
        console.error(
          "자기소개/SNS 불러오기 실패:",
          error
        );
      }
    };

    loadProfile();
  }, []);

  // ==================== 방명록 불러오기 ====================

  useEffect(() => {
    const loadGuestbook = async () => {
      try {
        const q = query(
          collection(db, "guestbook"),
          orderBy("createdAt", "desc"),
          limit(3)
        );

        const snapshot = await getDocs(q);

        const list = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setGuestbookList(list);
      } catch (error) {
        console.error(
          "방명록 불러오기 실패:",
          error
        );
      }
    };

    loadGuestbook();
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
        doc(db, "homepage", "images"),
        {
          image1: url,
        },
        { merge: true }
      );

      alert("이미지가 변경되었습니다!");
    } catch (error) {
      console.error(
        "이미지 업로드 실패:",
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
        doc(db, "homepage", "images"),
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

  // ==================== 자기소개 저장 ====================

const handleIntroSave = async () => {
  const text = newIntroText.trim();

  if (!text) {
    alert("자기소개 내용을 입력해주세요.");
    return;
  }

  try {
    await setDoc(
      doc(db, "homepage", "profile"),
      {
        introText: text,
      },
      { merge: true }
    );

    setIntroText(text);
    setEditingIntro(false);

    alert("자기소개가 변경되었습니다!");
  } catch (error) {
    console.error(
      "자기소개 변경 실패:",
      error
    );

    alert("자기소개 변경에 실패했습니다.");
  }
};


// ==================== SNS 저장 ====================

const handleSNSSave = async () => {
  try {
    await setDoc(
      doc(db, "homepage", "profile"),
      {
        twitterUrl: newTwitterUrl.trim() || "#",
        youtubeUrl: newYoutubeUrl.trim() || "#",
        crepeUrl: newCrepeUrl.trim() || "#",
      },
      { merge: true }
    );

    setTwitterUrl(
      newTwitterUrl.trim() || "#"
    );

    setYoutubeUrl(
      newYoutubeUrl.trim() || "#"
    );

    setCrepeUrl(
      newCrepeUrl.trim() || "#"
    );

    setEditingSNS(false);

    alert("SNS 링크가 변경되었습니다!");
  } catch (error) {
    console.error(
      "SNS 링크 변경 실패:",
      error
    );

    alert("SNS 링크 변경에 실패했습니다.");
  }
};

  // ==================== 방명록 등록 ====================

  const handleGuestbookSubmit = async () => {
    if (!guestMessage.trim()) {
      alert("방명록 내용을 입력해주세요.");
      return;
    }

    if (!isAnonymous && !guestName.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (!guestPassword.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const name = isAnonymous
        ? "익명"
        : guestName.trim();

      const newDoc = await addDoc(
        collection(db, "guestbook"),
        {
          name,
          message: guestMessage.trim(),
          password: guestPassword,
          createdAt: serverTimestamp(),
        }
      );

      setGuestbookList((prev) =>
        [
          {
            id: newDoc.id,
            name,
            message: guestMessage.trim(),
            createdAt: new Date(),
          },
          ...prev,
        ].slice(0, 3)
      );

      setGuestName("");
      setGuestMessage("");
      setGuestPassword("");
      setIsAnonymous(false);

      alert("방명록이 등록되었습니다!");
    } catch (error) {
      console.error(
        "방명록 등록 실패:",
        error
      );

      alert(
        "방명록 등록에 실패했습니다."
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

      {/* ==================== 메인 이미지 ==================== */}

      <section
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "45px auto 0",
          boxSizing: "border-box",
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
          {/* 이미지 */}

          <div
            style={{
              aspectRatio: "16 / 9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F5FBFF",
              overflow: "hidden",
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="홈페이지 이미지"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <span
                style={{
                  color: "#8AAFC5",
                  fontSize: "13px",
                }}
              >
                이미지
              </span>
            )}
          </div>

          {/* 이미지 아래 영역 */}

          <div
            style={{
              padding: "12px 18px",
              borderTop:
                "1px solid #EAF6FF",
              textAlign: "right",
            }}
          >
            {/* 현재 문구 */}

            <span
              style={{
                color: "#2878B5",
                fontSize: "12px",
              }}
            >
              {imageText}
            </span>

            {/* ==================== 관리자 전용 ==================== */}

          {user?.email === ADMIN_EMAIL && (
  <span
    style={{
      marginLeft: "12px",
    }}
  >
    {editingImageText ? (
      <>
        <input
          type="text"
          value={newImageText}
          onChange={(e) =>
            setNewImageText(e.target.value)
          }
          style={{
            border: "1px solid #B9DFF5",
            borderRadius: "8px",
            padding: "6px 10px",
            fontSize: "12px",
            outline: "none",
            width: "200px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleImageTextSave}
          style={{
            marginLeft: "8px",
            border: "none",
            background: "#2878B5",
            color: "#FFFFFF",
            borderRadius: "8px",
            padding: "6px 10px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          저장
        </button>

        <button
          onClick={() => {
            setEditingImageText(false);
          }}
          style={{
            marginLeft: "6px",
            border: "none",
            background: "transparent",
            color: "#8AAFC5",
            fontSize: "12px",
            cursor: "pointer",
            padding: 0,
          }}
        >
          취소
        </button>
      </>
    ) : (
      <button
        onClick={() => {
          setNewImageText(imageText);
          setEditingImageText(true);
        }}
        style={{
          marginLeft: "10px",
          border: "none",
          background: "transparent",
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
        onChange={handleImageUpload}
        style={{
          display: "none",
        }}
      />
    </label>
  </span>
)}

          </div>
        </div>
      </section>

      {/* ==================== MAIN ==================== */}

      <section
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "35px auto 0",
          display: "grid",
          gridTemplateColumns:
            "1fr",
          gap: "25px",
          boxSizing: "border-box",
        }}
      >
        {/* ==================== 소개 / SNS ==================== */}

<section
  style={{
    width: "100%",
    maxWidth: "1100px",
    margin: "25px auto 0",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
  }}
>
  {/* 자기소개 */}

  <section
    style={{
      background: "#FFFFFF",
      padding: "25px",
      borderRadius: "20px",
      border: "1px solid #B9DFF5",
      boxShadow:
        "0 10px 30px rgba(40, 120, 181, 0.08)",
    }}
  >
    <h2
      style={{
        margin: 0,
        fontSize: "20px",
        fontWeight: "400",
      }}
    >
      자기소개
    </h2>

    <p
      style={{
        marginTop: "15px",
        fontSize: "14px",
        lineHeight: "1.8",
      }}
    >
      여기에 자기소개를 작성하세요.
    </p>
  </section>

  {/* SNS */}

  <section
    style={{
      background: "#FFFFFF",
      padding: "25px",
      borderRadius: "20px",
      border: "1px solid #B9DFF5",
      boxShadow:
        "0 10px 30px rgba(40, 120, 181, 0.08)",
    }}
  >
    <h2
      style={{
        margin: 0,
        fontSize: "20px",
        fontWeight: "400",
      }}
    >
      SNS
    </h2>

    <div
      style={{
        marginTop: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <a href="#" style={{ color: "#2878B5" }}>
        𝕏 Twitter
      </a>

      <a href="#" style={{ color: "#2878B5" }}>
        ▶ YouTube
      </a>

      <a href="#" style={{ color: "#2878B5" }}>
        C 크레페
      </a>
    </div>
  </section>
</section>
        {/* ==================== 방명록 ==================== */}

        <section
          style={{
            background: "#FFFFFF",
            padding: "35px",
            borderRadius: "20px",
            border:
              "1px solid #B9DFF5",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
            boxSizing: "border-box",
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
              minHeight: "120px",
              overflowY: "auto",
              paddingRight: "8px",
              marginBottom: "25px",
            }}
          >
            {guestbookList.length ===
            0 ? (
              <p
                style={{
                  fontSize: "13px",
                  opacity: 0.5,
                  margin: 0,
                }}
              >
                아직 방명록이 없습니다.
              </p>
            ) : (
              guestbookList.map(
                (item) => (
                  <div
                    key={item.id}
                    style={{
                      padding:
                        "12px 0",
                      borderBottom:
                        "1px solid #EAF6FF",
                      fontSize:
                        "14px",
                    }}
                  >
                    <strong
                      style={{
                        fontWeight:
                          "500",
                        marginRight:
                          "8px",
                      }}
                    >
                      {item.name}
                    </strong>

                    <span
                      style={{
                        opacity:
                          0.8,
                      }}
                    >
                      {item.message}
                    </span>
                  </div>
                )
              )
            )}
          </div>

          {/* 방명록 입력 */}

          <div
            style={{
              borderTop:
                "1px solid #B9DFF5",
              paddingTop: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: "10px",
                marginBottom:
                  "12px",
                fontSize: "13px",
              }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={
                    isAnonymous
                  }
                  onChange={(e) =>
                    setIsAnonymous(
                      e.target.checked
                    )
                  }
                  style={{
                    marginRight:
                      "5px",
                  }}
                />
                익명
              </label>

              <input
                type="text"
                placeholder="닉네임"
                value={guestName}
                disabled={
                  isAnonymous
                }
                onChange={(e) =>
                  setGuestName(
                    e.target.value
                  )
                }
                style={{
                  flex: 1,
                  minWidth: 0,
                  border:
                    "1px solid #B9DFF5",
                  borderRadius:
                    "8px",
                  padding:
                    "8px 10px",
                  outline: "none",
                  background:
                    isAnonymous
                      ? "#F5F5F5"
                      : "#FFFFFF",
                  boxSizing:
                    "border-box",
                }}
              />
            </div>

            <textarea
              placeholder="방명록을 입력하세요"
              value={guestMessage}
              onChange={(e) =>
                setGuestMessage(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                height: "75px",
                boxSizing:
                  "border-box",
                resize: "none",
                border:
                  "1px solid #B9DFF5",
                borderRadius:
                  "10px",
                padding: "10px",
                fontFamily:
                  "inherit",
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
                value={
                  guestPassword
                }
                onChange={(e) =>
                  setGuestPassword(
                    e.target.value
                  )
                }
                style={{
                  flex: 1,
                  minWidth: 0,
                  border:
                    "1px solid #B9DFF5",
                  borderRadius:
                    "8px",
                  padding:
                    "8px 10px",
                  outline: "none",
                  boxSizing:
                    "border-box",
                }}
              />

              <button
                onClick={
                  handleGuestbookSubmit
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
                    "8px 18px",
                  cursor:
                    "pointer",
                  flexShrink: 0,
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
              color:
                "#2878B5",
              textDecoration:
                "none",
              fontSize: "13px",
              textAlign: "right",
            }}
          >
            전체 방명록 →
          </a>
        </section>

        {/* ==================== DIARY ==================== */}

        <section
          style={{
            background: "#FFFFFF",
            padding: "35px",
            borderRadius: "20px",
            border:
              "1px solid #B9DFF5",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
            boxSizing: "border-box",
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
            {[1, 2].map(
              (item) => (
                <a
                  key={item}
                  href={
                    "/diary/" +
                    item
                  }
                  style={{
                    display:
                      "block",
                    padding:
                      "15px 5px",
                    borderBottom:
                      "1px solid #EAF6FF",
                    color:
                      "#234A68",
                    textDecoration:
                      "none",
                    fontSize:
                      "15px",
                  }}
                >
                  <span
                    style={{
                      color:
                        "#5BB9E8",
                      marginRight:
                        "8px",
                      fontSize:
                        "11px",
                    }}
                  >
                    ●
                  </span>

                  {item === 1
                    ? "오늘의 그림"
                    : "비 오는 날"}
                </a>
              )
            )}
          </div>

          <a
            href="/diary"
            style={{
              display: "block",
              marginTop: "25px",
              color:
                "#2878B5",
              textDecoration:
                "none",
              fontSize: "13px",
              textAlign: "right",
            }}
          >
            다이어리 전체보기 →
          </a>
        </section>
      </section>
    </main>
  );
}
