// src/components/MyPage.js
import React, { useEffect, useState, useCallback } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function MyPage({ userId }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Firestore에서 유저 정보 불러오기
  const fetchUserData = useCallback(async () => {
    if (!userId) return;

    try {
      const userRef = doc(db, "users", userId);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setUserData(snap.data());
      }
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // 포인트 충전
  const handleChargePoint = async () => {
    if (!userId || !userData) return;

    const userRef = doc(db, "users", userId);
    const newPoint = (userData.point || 0) + 1000;

    await updateDoc(userRef, { point: newPoint });

    // UI 즉시 업데이트
    setUserData((prev) => ({ ...prev, point: newPoint }));
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // App.js에서 상태 초기화됨
  };

  if (!userData) return <p>유저 정보를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{userData.nickname} 님의 마이페이지</h2>

      <p><b>보유 포인트:</b> {userData.point} P</p>
      <button onClick={handleChargePoint}>+1000 충전</button>

      <hr />

      <h3>🎬 소장 영화 목록</h3>
      {userData.ownedMovies?.length > 0 ? (
        <ul>
          {userData.ownedMovies.map((m) => (
            <li key={m.id}>{m.title}</li>
          ))}
        </ul>
      ) : (
        <p>소장한 영화가 없습니다.</p>
      )}

      <hr />

      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default MyPage;
