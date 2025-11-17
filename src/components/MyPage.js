import React, { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function MyPage({ userId }) {
  const [userData, setUserData] = useState(null);

  // 🔹 Firestore에서 유저 정보 가져오기
  const fetchUserData = useCallback(async () => {
    if (!userId) return;

    try {
      const ref = doc(db, "users", userId);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        setUserData(snapshot.data());
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("유저 데이터 불러오기 오류:", error);
      setUserData(null);
    }
  }, [userId]);

  // 🔹 최초 실행
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // 🔹 포인트 충전(+1000)
  const handleCharge = async () => {
    if (!userId) return;

    try {
      const ref = doc(db, "users", userId);
      await updateDoc(ref, {
        points: (userData.points || 0) + 1000,
      });

      fetchUserData(); // 최신 데이터 반영
    } catch (err) {
      console.error("포인트 충전 오류:", err);
    }
  };

  if (!userData) return <p style={{ padding: "20px" }}>사용자 정보를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>👤 내 정보</h2>

      <p><strong>UID:</strong> {userId}</p>
      <p><strong>포인트:</strong> {userData.points}P</p>

      <h3 style={{ marginTop: "20px" }}>🎞 소장한 영화</h3>
      {userData.ownedMovies?.length > 0 ? (
        <ul>
          {userData.ownedMovies.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      ) : (
        <p>소장한 영화가 없습니다.</p>
      )}

      <button
        onClick={handleCharge}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        💳 포인트 +1000 충전
      </button>
    </div>
  );
}

export default MyPage;
