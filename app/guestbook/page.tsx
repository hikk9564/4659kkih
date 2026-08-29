
"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

type GuestbookItem = {
  id: string;
  name: string;
  message: string;
  password: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
};

export default function GuestbookPage() {
  const [guestbookList, setGuestbookList] = useState<GuestbookItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 방명록 불러오기
  const loadGuestbook = async () => {
    try {
      const q = query(
        collection(db, "guestbook"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      })) as GuestbookItem[];

      setGuestbookList(list);
    } catch (error) {
      console.error("방명록 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuestbook();
  }, []);

  // 방명록 삭제
  const handleDelete = async (item: GuestbookItem) => {
    const password = prompt("방명록을 작성할 때 입력한 비밀번호를 입력해주세요.");

    if (password === null) return;

    if (password !== item.password) {
      alert("비밀번호가 맞지 않습니다.");
      return;
    }

    const confirmed = confirm("이 방명록을 삭제할까요?");

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "guestbook", item.id));

      setGuestbookList((prev) =>
        prev.filter((guestbook) => guestbook.id !== item.id)
      );

      alert("방명록이 삭제되었습니다.");
    } catch (error) {
      console.error("방명록 삭제 실패:", error);
      alert("방명록 삭제에 실패했습니다.");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#EAF6FF",
        color: "#234A68",
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <a
          href="/"
          style={{
            color: "#2878B5",
            textDecoration: "none",
            fontSize: "13px",
          }}
        >
          ← 메인으로
        </a>

        <h1
          style={{
            fontSize: "36px",
            fontWeight: "400",
            marginTop: "25px",
            marginBottom: "35px",
          }}
        >
          방명록
        </h1>

        <section
          style={{
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 10px 30px rgba(40, 120, 181, 0.08)",
          }}
        >
          {loading ? (
            <p
              style={{
                color: "#8AAFC5",
                textAlign: "center",
              }}
            >
              방명록을 불러오는 중...
            </p>
          ) : guestbookList.length === 0 ? (
            <p
              style={{
                color: "#8AAFC5",
                textAlign: "center",
              }}
            >
              아직 방명록이 없습니다.
            </p>
          ) : (
            guestbookList.map((item) => (
              <article
                key={item.id}
                style={{
                  padding: "20px 5px",
                  borderBottom: "1px solid #EAF6FF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <strong
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </strong>

                  <button
                    onClick={() => handleDelete(item)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#8AAFC5",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    삭제
                  </button>
                </div>

                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: "14px",
                    lineHeight: "1.7",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {item.message}
                </p>
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
}


