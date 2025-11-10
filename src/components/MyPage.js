import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function MyPage({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUserData(userSnap.data());
      setLoading(false);
    };
    fetchUserData();
  }, [userId]);

  if (loading) return <p>불러오는 중...</p>;
  if (!userData) return <p>유저 정보를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>👤 내 정보</h2>
      <p><strong>아이디:</strong> {userId}</p>
      <p><strong>보유 포인트:</strong> {userData.points}P</p>

      <h3 style={{ marginTop: "20px", color: "#333" }}>🎬 소장한 영화</h3>
      {userData.ownedMovies && userData.ownedMovies.length > 0 ? (
        <ul>
          {userData.ownedMovies.map((movieId) => (
            <li key={movieId}>🎞️ {movieId}</li>
          ))}
        </ul>
      ) : (
        <p>소장한 영화가 없습니다.</p>
      )}
    </div>
  );
}

export default MyPage;
