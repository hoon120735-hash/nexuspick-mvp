// src/components/Home.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home({ username }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 전체 영화 불러오기
  const fetchAllMovies = async () => {
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
    fetchAllMovies();
  }, []);

  // 🔽 평점 높은 순 정렬
  const sortByRating = () => {
    const sorted = [...movies].sort((a, b) => (b.ratingAvg || 0) - (a.ratingAvg || 0));
    setMovies(sorted);
  };

  // 🔽 가격 낮은 순 정렬
  const sortByPrice = () => {
    const sorted = [...movies].sort((a, b) => (a.price || 0) - (b.price || 0));
    setMovies(sorted);
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* 🟢 연한 초록색 인사말 */}
      {username && (
        <h2
          style={{
            marginBottom: "20px",
            color: "#22c55e", // 연한 초록색
            fontWeight: "bold",
          }}
        >
          {username}님, 넥서스픽에 오신 걸 환영합니다 👋
        </h2>
      )}

      {/* 🔽 정렬 버튼 */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={sortByRating}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ⭐ 평점순
        </button>

        <button
          onClick={sortByPrice}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          💰 가격순
        </button>
      </div>

      {/* 🎞 영화 리스트 */}
      <h2 style={{ marginBottom: "16px" }}>🎞 인기 영화 리스트</h2>

      {movies.length === 0 ? (
        <p>등록된 영화가 없습니다 😢</p>
      ) : (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          {movies.map((movie) => (
            <li
              key={movie.id}
              style={{ listStyle: "none", textAlign: "center" }}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={movie.posterUrl || "https://via.placeholder.com/150"}
                alt={movie.title}
                width={120}
                height={180}
                style={{ borderRadius: "8px", cursor: "pointer" }}
              />
              <p style={{ marginTop: "8px", fontWeight: "bold" }}>
                {movie.title}
              </p>
              <p style={{ color: "#f59e0b" }}>
                ⭐ {movie.ratingAvg || "평점 없음"}
              </p>
              <p style={{ color: "#10b981", fontWeight: "bold" }}>
                💰 {movie.price ? movie.price.toLocaleString() + "P" : "무료"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
