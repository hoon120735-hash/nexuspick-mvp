import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function MyPage({ username }) {
  const [points, setPoints] = useState(0);
  const [ownedMovies, setOwnedMovies] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      if (!username) return;
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setPoints(data.points || 0);
        setOwnedMovies(data.ownedMovies || []);
      }
    }
    fetchUserData();
  }, [username]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 {username}님 정보</h2>
      <p>보유 포인트: <strong>{points.toLocaleString()}P</strong></p>

      <h3 style={{ marginTop: "20px" }}>🎬 소장한 영화</h3>
      {ownedMovies.length === 0 ? (
        <p>아직 소장한 영화가 없습니다.</p>
      ) : (
        <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 150px)", gap: "16px" }}>
          {ownedMovies.map((movie) => (
            <li key={movie.id} style={{ listStyle: "none", textAlign: "center" }}>
              <img
                src={movie.posterUrl || "https://via.placeholder.com/150"}
                alt={movie.title}
                width={120}
                height={180}
                style={{ borderRadius: "8px" }}
              />
              <p style={{ marginTop: "8px" }}>{movie.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPage;
