// src/components/Home.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home({ username }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Firestore 영화 리스트 불러오기
  useEffect(() => {
    const loadMovies = async () => {
      const colRef = collection(db, "movies");
      const snap = await getDocs(colRef);
      setMovies(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };

    loadMovies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {username && (
        <h2>
          🎬 환영합니다, {username} 님!
        </h2>
      )}

      <h3 style={{ marginTop: "20px" }}>🔥 인기 영화</h3>

      <ul>
        {movies.map((m) => (
          <li
            key={m.id}
            style={{ cursor: "pointer", marginBottom: "8px" }}
            onClick={() => navigate(`/movie/${m.id}`)}
          >
            {m.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
