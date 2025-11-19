// src/components/Search.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

// URL의 ?query= 값 가져오기
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const queryParam = useQuery().get("query") || "";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState([]);

  // 🔹 1) Firebase에서 전체 영화 불러오기
  const fetchMovies = async () => {
    const col = collection(db, "movies");
    const snap = await getDocs(col);
    const list = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMovies(list);
    setLoading(false);
  };

  // 최초 1회 로딩
  useEffect(() => {
    fetchMovies();
  }, []);

  // 🔹 2) 검색어에 따라 필터링 실행
  useEffect(() => {
    if (!loading) {
      const q = queryParam.toLowerCase();

      const filtered = movies.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.director && m.director.toLowerCase().includes(q))
      );

      setResults(filtered);
    }
  }, [queryParam, loading, movies]);

  if (loading) return <p>영화 데이터를 불러오는 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        🔍 검색 결과: <strong>{queryParam}</strong>
      </h2>

      {results.length === 0 && (
        <p style={{ marginTop: "20px" }}>검색 결과가 없습니다.</p>
      )}

      {/* 3열 카드 UI */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {results.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{
              cursor: "pointer",
              padding: "18px",
              background: "white",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{movie.title}</h3>

            <p style={{ color: "#6b7280", marginBottom: "8px" }}>
              감독: {movie.director || "정보 없음"}
            </p>

            <p style={{ color: "#f59e0b", fontWeight: "bold" }}>
              ⭐ {movie.ratingAvg ?? "평점 없음"}
            </p>

            <button
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                background: "#111827",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              바로 보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
