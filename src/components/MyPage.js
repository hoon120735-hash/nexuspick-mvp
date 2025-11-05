import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function MyPage() {
  const [ownedMovies, setOwnedMovies] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const [points, setPoints] = useState(1200); // 💰 기본 포인트 예시값

  useEffect(() => {
    // 🔹 Firestore에서 샘플 데이터 불러오기 (원하면 사용자별로 변경 가능)
    async function fetchData() {
      const ownedCol = collection(db, "ownedMovies");
      const historyCol = collection(db, "watchHistory");

      const [ownedSnap, historySnap] = await Promise.all([
        getDocs(ownedCol),
        getDocs(historyCol),
      ]);

      setOwnedMovies(ownedSnap.docs.map((d) => d.data()));
      setWatchHistory(historySnap.docs.map((d) => d.data()));
    }

    fetchData();
  }, []);

  const handleChargePoints = () => {
    const added = 5000; // 💳 예시 충전 금액
    setPoints(points + added);
    alert(`포인트 ${added}점이 충전되었습니다!`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>👤 내 정보</h2>

      <div
        style={{
          background: "#f9fafb",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "20px",
        }}
      >
        <h3>💰 보유 포인트: {points.toLocaleString()} P</h3>
        <button
          onClick={handleChargePoints}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🔋 포인트 충전
        </button>
      </div>

      <div>
        <h3>🎞 소장한 영화</h3>
        {ownedMovies.length === 0 ? (
          <p>소장한 영화가 없습니다.</p>
        ) : (
          <ul>
            {ownedMovies.map((m, i) => (
              <li key={i}>{m.title}</li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>📺 시청 기록</h3>
        {watchHistory.length === 0 ? (
          <p>시청 기록이 없습니다.</p>
        ) : (
          <ul>
            {watchHistory.map((m, i) => (
              <li key={i}>
                {m.title} ({m.dateWatched})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyPage;
