// src/components/Home.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home({ username }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔹 Firestore에서 영화 불러오기
  const fetchMovies = async () => {
    const movieCol = collection(db, "movies");
    const movieSnapshot = await getDocs(movieCol);
    const movieList = movieSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMovies(movieList);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  // -----------------------------
  // 🔽 정렬 기능
  // -----------------------------
  const sortByRating = () => {
    const sorted = [...movies].sort(
      (a, b) => (b.ratingAvg || 0) - (a.ratingAvg || 0)
    );
    setMovies(sorted);
  };

  const sortByPrice = () => {
    const sorted = [...movies].sort(
      (a, b) => (a.price || 99999) - (b.price || 99999)
    );
    setMovies(sorted);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 🟢 환영 메시지 */}
      {username && (
        <h2 style={{ marginBottom: "20px", color: "#22c55e" }}>
          {username}님, 넥서스픽에 오신 걸 환영합니다 👋
        </h2>
      )}

      {/* 🔽 정렬 버튼 */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={sortByRating}
          style={{
            padding: "8px 14px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ⭐ 평점 높은 순
        </button>

        <button
          onClick={sortByPrice}
          style={{
            padding: "8px 14px",
            backgroundColor: "#059669",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          💰 가격 낮은 순
        </button>
      </div>

      {/* ===============================
          🎬 3열 카드 UI
      =============================== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{
              cursor: "pointer",
              padding: "16px",
              borderRadius: "12px",
              background: "white",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
            }}
          >
            {/* 제목 */}
            <h3 style={{ marginBottom: "10px" }}>{movie.title}</h3>

            {/* 평점 */}
            <p style={{ margin: "6px 0", color: "#f59e0b", fontWeight: "bold" }}>
              {movie.ratingAvg ? `${movie.ratingAvg} ★` : "평점 없음"}
            </p>

            {/* 가격 */}
            <p style={{ margin: 0, fontWeight: "bold", color: "#4f46e5" }}>
              {movie.price ? `${movie.price.toLocaleString()}P` : "가격 정보 없음"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
