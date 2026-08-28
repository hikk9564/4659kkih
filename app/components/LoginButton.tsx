"use client";

import { useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth, googleProvider } from "../../lib/firebase";

export default function LoginButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google 로그인 실패:", error);
      alert("Google 로그인에 실패했어요.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  if (user) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "13px",
        }}
      >
        <span>
          {user.displayName || "로그인 사용자"}님
        </span>

        <button
          onClick={handleLogout}
          style={{
            border: "1px solid #B9DFF5",
            background: "#FFFFFF",
            color: "#2878B5",
            borderRadius: "8px",
            padding: "7px 12px",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      style={{
        border: "1px solid #B9DFF5",
        background: "#FFFFFF",
        color: "#2878B5",
        borderRadius: "8px",
        padding: "7px 14px",
        cursor: "pointer",
      }}
    >
      Google로 로그인
    </button>
  );
}
