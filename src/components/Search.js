// src/components/Search.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // URL에서 검색어 가져오기
  const query = new URLSearchParams(location.search).get("query") || "";

  // Firestore 영화 데이터 불러오기
  useEffect(() => {
    const fetchMovies = async () => {
      const movieCol = collection(db, "movies");
      const snapshot = await getDocs(movieCol);
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMovies(list);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (loading) return <p>검색 중...</p>;

  // 제목 또는 감독 기준으로 필터
  const filtered = movies.filter(
    (m) =>
      m.title?.toLowerCase().includes(query.toLowerCase()) ||
      m.director?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#4f46e5" }}>
        🔍 “{query}” 검색결과
      </h2>

      {filtered.length === 0 ? (
        <p style={{ fontSize: "18px" }}>검색 결과가 없습니다 😢</p>
      ) : (
        <ul style={{ padding: 0, margin: 0 }}>
          {filtered.map((movie) => (
            <li
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{
                listStyle: "none",
                padding: "15px",
                marginBottom: "12px",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            >
              <h3 style={{ margin: 0 }}>{movie.title}</h3>
              <p style={{ margin: "6px 0", color: "#555" }}>
                🎬 감독: {movie.director}
              </p>
              <p style={{ margin: "4px 0", color: "#f59e0b" }}>
                ⭐ 평점: {movie.ratingAvg ?? "평점 없음"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
