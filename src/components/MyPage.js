import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function MyPage({ username }) {
  const [points, setPoints] = useState(0);
  const [ownedMovies, setOwnedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (!username) return;

      try {
        const userRef = doc(db, "users", username);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setPoints(userData.points || 0);
          setOwnedMovies(userData.ownedMovies || []);
        }
      } catch (error) {
        console.error("사용자 데이터 불러오기 오류:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [username]);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>👤 {username}님</h2>
      <p style={{ marginTop: "10px" }}>
        보유 포인트: <strong>{points.toLocaleString()}P</strong>
      </p>

      <h3 style={{ marginTop: "20px" }}>🎬 소장한 영화</h3>
      {ownedMovies.length === 0 ? (
        <p>아직 소장한 영화가 없습니다 😢</p>
      ) : (
        <ul>
          {ownedMovies.map((movieId) => (
            <li key={movieId}>📽 영화 ID: {movieId}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPage;
