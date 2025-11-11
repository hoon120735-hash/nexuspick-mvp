// src/components/MyPage.js
import React, { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

function MyPage({ username }) {
  const [userData, setUserData] = useState(null);

  const fetchUserData = useCallback(async () => {
    if (!username) return;
    const userRef = doc(db, "users", username);
    const snap = await getDoc(userRef);
    if (snap.exists()) setUserData(snap.data());
  }, [username]);

useEffect(() => {
  fetchUserData();
}, [fetchUserData]); // ✅ ESLint가 요구하는 의존성 추가


  const handleChargePoints = async () => {
    if (!username) return;
    const userRef = doc(db, "users", username);
    await updateDoc(userRef, { points: increment(1000) });
    alert("💰 1000P가 충전되었습니다!");
    fetchUserData();
  };

  if (!userData) return <p>유저 정보를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>👤 내 정보</h2>
      <p>
        <strong>아이디:</strong> {username}
      </p>
      <p>
        <strong>보유 포인트:</strong> {userData.points.toLocaleString()}P
      </p>
      <p>
        <strong>소장한 영화:</strong> {userData.ownedMovies?.length || 0}편
      </p>

      <button
        onClick={handleChargePoints}
        style={{
          marginTop: "20px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        💳 포인트 충전 (+1000P)
      </button>
    </div>
  );
}

export default MyPage;
