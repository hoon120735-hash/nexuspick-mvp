import React, { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function MyPage({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ fetchUserData를 useCallback으로 메모이제이션
  const fetchUserData = useCallback(async () => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        console.error("사용자 데이터 없음");
      }
    } catch (err) {
      console.error("사용자 정보 불러오기 오류:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // ✅ ESLint 오류 해결 → fetchUserData를 의존성 배열에 포함
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // 🔹 포인트 충전 기능
  const chargePoints = async () => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { points: increment(1000) });

      alert("포인트 1,000P 충전 완료!");
      fetchUserData(); // 🔄 최신 정보 다시 불러오기
    } catch (error) {
      console.error("포인트 충전 실패:", error);
    }
  };

  if (loading) return <p>불러오는 중...</p>;
  if (!userData) return <p>유저 정보를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>⭐ 내 정보</h2>
      <p><strong>아이디:</strong> {userId}</p>
      <p><strong>보유 포인트:</strong> {userData.points} P</p>

      {/* 🔹 포인트 충전 버튼 */}
      <button
        onClick={chargePoints}
        style={{
          marginTop: "10px",
          backgroundColor: "#4f46e5",
          color: "white",
          padding: "10px 14px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        💰 포인트 1,000 충전
      </button>

      <hr style={{ margin: "20px 0" }} />

      <h3>🎬 소장한 영화</h3>

      {userData.ownedMovies && userData.ownedMovies.length > 0 ? (
        <ul>
          {userData.ownedMovies.map((movieId) => (
            <li
              key={movieId}
              style={{ cursor: "pointer", color: "#4f46e5" }}
              onClick={() => navigate(`/movie/${movieId}`)}
            >
              영화 ID: {movieId}
            </li>
          ))}
        </ul>
      ) : (
        <p>아직 소장한 영화가 없습니다.</p>
      )}
    </div>
  );
}

export default MyPage;
