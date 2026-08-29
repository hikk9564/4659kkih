"use client";

import Navigation from "./components/Navigation";
import LoginButton from "./components/LoginButton";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Home() {
  // ==================== 상태 ====================

  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");

  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [guestPassword, setGuestPassword] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

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
          setImageUrl2(data.image2 || "");
        }
      } catch (error) {
        console.error("이미지 불러오기 실패:", error);
      }
    };

    loadImages();
  }, []);

  // ==================== 이미지 1 업로드 ====================

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "homepage_upload");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/nr7d0kyv/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Cloudinary 업로드 실패");
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
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  // ==================== 이미지 2 업로드 ====================

  const handleImageUpload2 = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "homepage_upload");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/nr7d0kyv/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Cloudinary 업로드 실패");
      }

      const data = await response.json();
      const url = data.secure_url;

      setImageUrl2(url);

      await setDoc(
        doc(db, "homepage", "images"),
        {
          image2: url,
        },
        { merge: true }
      );

      alert("이미지 2가 변경되었습니다!");
    } catch (error) {
      console.error("이미지 2 업로드 실패:", error);
      alert("이미지 2 업로드에 실패했습니다.");
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
      await addDoc(collection(db, "guestbook"), {
        name: isAnonymous ? "익명" : guestName,
        message: guestMessage,
        password: guestPassword,
        createdAt: serverTimestamp(),
      });

      setGuestName("");
      setGuestMessage("");
      setGuestPassword("");
      setIsAnonymous(false);

      alert("방명록이 등록되었습니다!");
    } catch (error) {
      console.error("방명록 등록 실패:", error);
      alert("방명록 등록에 실패했습니다.");
    }
  };

  // ==================== 화면 ====================

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

      {/* ==================== IMAGE AREA ==================== */}

      <section
        style={{
          maxWidth: "1100px",
          margin: "45px auto 0",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "25px",
        }}
      >
        {/* ==================== 이미지 1 ==================== */}

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
                alt="홈페이지 이미지 1"
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
                이미지 1
              </span>
            )}
          </div>

          <div
            style={{
              padding: "12px 18px",
              borderTop: "1px solid #EAF6FF",
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
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        {/* ==================== 이미지 2 ==================== */}

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
            {imageUrl2 ? (
              <img
                src={imageUrl2}
                alt="홈페이지 이미지 2"
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
                이미지 2
              </span>
            )}
          </div>

          <div
            style={{
              padding: "12px 18px",
              borderTop: "1px solid #EAF6FF",
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
                onChange={handleImageUpload2}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
      </section>

      {/* ==================== MAIN ==================== */}

      <section
        style={{
          maxWidth: "1100px",
          margin: "35px auto 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
        }}
      >
        {/* ==================== 방명록 ==================== */}

        <section
          style={{
            background: "#FFFFFF",
            padding: "35px",
            borderRadius: "20px",
            border: "1px solid #B9DFF5",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
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

          {/* 최근 방명록 - 임시 화면 */}

          <div
            style={{
              height: "240px",
              overflowY: "auto",
              paddingRight: "8px",
              marginBottom: "25px",
            }}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #EAF6FF",
                  fontSize: "14px",
                }}
              >
                <strong
                  style={{
                    fontWeight: "500",
                    marginRight: "8px",
                  }}
                >
                  {item % 2 === 0 ? "익명" : "힉힉"}
                </strong>

                <span style={{ opacity: 0.8 }}>
                  안녕하세요! 홈페이지 구경하고 갑니다.
                </span>
              </div>
            ))}
          </div>

          {/* ==================== 방명록 입력 ==================== */}

          <div
            style={{
              borderTop: "1px solid #B9DFF5",
              paddingTop: "25px",
            }}
          >
            {/* 닉네임 + 익명 */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
                fontSize: "13px",
              }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) =>
                    setIsAnonymous(e.target.checked)
                  }
                  style={{ marginRight: "5px" }}
                />
                익명
              </label>

              <input
                type="text"
                placeholder="닉네임"
                value={guestName}
                disabled={isAnonymous}
                onChange={(e) =>
                  setGuestName(e.target.value)
                }
                style={{
                  flex: 1,
                  border: "1px solid #B9DFF5",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  outline: "none",
                  background: isAnonymous
                    ? "#F5F5F5"
                    : "#FFFFFF",
                }}
              />
            </div>

            {/* 방명록 내용 */}

            <textarea
              placeholder="방명록을 입력하세요"
              value={guestMessage}
              onChange={(e) =>
                setGuestMessage(e.target.value)
              }
              style={{
                width: "100%",
                height: "75px",
                boxSizing: "border-box",
                resize: "none",
                border: "1px solid #B9DFF5",
                borderRadius: "10px",
                padding: "10px",
                fontFamily: "inherit",
                fontSize: "13px",
                outline: "none",
              }}
            />

            {/* 비밀번호 + 등록 */}

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
                value={guestPassword}
                onChange={(e) =>
                  setGuestPassword(e.target.value)
                }
                style={{
                  flex: 1,
                  border: "1px solid #B9DFF5",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  outline: "none",
                }}
              />

              <button
                onClick={handleGuestbookSubmit}
                style={{
                  border: "none",
                  background: "#2878B5",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  cursor: "pointer",
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
              color: "#2878B5",
              textDecoration: "none",
              fontSize: "13px",
              textAlign: "right",
            }}
          >
            전체 방명록 보기 →
          </a>
        </section>

        {/* ==================== DIARY ==================== */}

        <section
          style={{
            background: "#FFFFFF",
            padding: "35px",
            borderRadius: "20px",
            border: "1px solid #B9DFF5",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
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
            {[1, 2].map((item) => (
              <a
                key={item}
                href={"/diary/" + item}
                style={{
                  display: "block",
                  padding: "15px 5px",
                  borderBottom: "1px solid #EAF6FF",
                  color: "#234A68",
                  textDecoration: "none",
                  fontSize: "15px",
                }}
              >
                <span
                  style={{
                    color: "#5BB9E8",
                    marginRight: "8px",
                    fontSize: "11px",
                  }}
                >
                  ●
                </span>

                {item === 1
                  ? "오늘의 그림"
                  : "비 오는 날"}
              </a>
            ))}
          </div>

          <a
            href="/diary"
            style={{
              display: "block",
              marginTop: "25px",
              color: "#2878B5",
              textDecoration: "none",
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
```


