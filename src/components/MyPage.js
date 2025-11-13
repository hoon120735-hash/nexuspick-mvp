import React, { useState, useEffect, useCallback } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function MyPage({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [charging, setCharging] = useState(false);

  // ✅ Firestore에서 유저 데이터 불러오기
  const fetchUserData = useCallback(async () => {
    if (!userId) return;
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        console.error("유저 데이터를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("유저 데이터 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // ✅ useEffect 의존성 문제 해결
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // ✅ 포인트 충전 (+1000P)
  const handleChargePoints = async () => {
    if (!userId || !userData) return;
    setCharging(true);
    try {
      const userRef = doc(db, "users", userId);
      const newPoints = (userData.points || 0) + 1000;

      await updateDoc(userRef, { points: newPoints });
      setUserData((prev) => ({ ...prev, points: newPoints }));
      alert("💳 1000P가 충전되었습니다!");
    } catch (error) {
      console.error("포인트 충전 실패:", error);
    } finally {
      setCharging(false);
    }
  };

  if (loading) return <p>🔄 유저 정보를 불러오는 중...</p>;
  if (!userData) return <p>⚠️ 유저 정보를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ color: "#4f46e5" }}>👤 내 정보</h2>

      {/* 유저 기본 정보 */}
      <div style={{ marginTop: "16px", lineHeight: "1.8" }}>
        <p>
          <strong>아이디:</strong> {userId}
        </p>
        <p>
          <strong>보유 포인트:</strong>{" "}
          <span style={{ color: "#4f46e5", fontWeight: "bold" }}>
            {userData.points?.toLocaleString() || 0}P
          </span>
        </p>
      </div>

      {/* 포인트 충전 버튼 */}
      <button
        onClick={handleChargePoints}
        disabled={charging}
        style={{
          marginTop: "16px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {charging ? "충전 중..." : "💳 포인트 +1000P 충전"}
      </button>

      {/* 소장 영화 목록 */}
      <div style={{ marginTop: "32px" }}>
        <h3 style={{ marginBottom: "8px" }}>🎬 소장한 영화</h3>
        {userData.ownedMovies && userData.ownedMovies.length > 0 ? (
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {userData.ownedMovies.map((movieId, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  marginBottom: "6px",
                }}
              >
                🎞 {movieId}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#666" }}>아직 소장한 영화가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default MyPage;
