// src/components/Search.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Search() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search).get("query")?.trim() || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Firestore 전체 읽고 클라이언트에서 검색 필터링
  const fetchResults = async () => {
    setLoading(true);

    try {
      const movieCol = collection(db, "movies");
      const snapshot = await getDocs(movieCol);

      const movieList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🔍 부분 검색 + 제목/감독 검색
      const filtered = movieList.filter((movie) => {
        const t = movie.title?.toLowerCase() || "";
        const d = movie.director?.toLowerCase() || "";
        const q = queryParam.toLowerCase();

        return t.includes(q) || d.includes(q);
      });

      setResults(filtered);
    } catch (error) {
      console.error("검색 오류:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [queryParam]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 검색 결과</h2>
      <p style={{ color: "#555" }}>"{queryParam}" 검색 결과</p>

      {loading ? (
        <p>검색 중...</p>
      ) : results.length === 0 ? (
        <p>검색 결과가 없습니다 😢</p>
      ) : (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {results.map((movie) => (
            <li
              key={movie.id}
              style={{
                listStyle: "none",
                background: "white",
                padding: "12px",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <strong style={{ fontSize: "18px" }}>{movie.title}</strong>
              <p style={{ color: "#666", marginTop: "6px" }}>
                감독: {movie.director}
              </p>
              <p style={{ color: "#f59e0b" }}>
                {movie.ratingAvg ? `${movie.ratingAvg}★` : "평점 없음"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
