import React, { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home({ userId }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // 🔹 전체 영화 불러오기
  const fetchMovies = useCallback(async () => {
    const snapshot = await getDocs(collection(db, "movies"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMovies(list);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div style={{ padding: "20px" }}>
      {userId && (
        <h2 style={{ marginBottom: "20px", color: "#4f46e5" }}>
          환영합니다!
        </h2>
      )}

      <h3>🎞 인기 영화</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              width={130}
              height={180}
              style={{ borderRadius: "8px" }}
            />
            <p style={{ marginTop: "8px", fontWeight: "bold" }}>
              {movie.title}
            </p>
            <p style={{ color: "#f59e0b" }}>
              {movie.ratingAvg} ★
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
