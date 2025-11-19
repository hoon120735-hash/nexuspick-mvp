// src/components/Search.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

// URL에서 ?query= 값 읽어오는 훅
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const queryParam = useQuery().get("query") || ""; // /search?query=봉준호
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);   // 전체 영화 (Firebase에서 읽어온 것)
  const [results, setResults] = useState([]); // 검색 결과만

  // 1) Firebase 에서 영화 전체 읽기
  const fetchMovies = async () => {
    try {
      const col = collection(db, "movies");
      const snap = await getDocs(col);
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(list);
    } catch (e) {
      console.error("영화 불러오기 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // 2) queryParam(검색어) + 영화 데이터로 필터링
  useEffect(() => {
    if (loading) return;

    const q = queryParam.trim().toLowerCase();

    // 🔴 검색어가 비어 있을 때는 결과를 비워둠 (전체 영화 출력을 막기 위해)
    if (!q) {
      setResults([]);
      return;
    }

    const filtered = movies.filter((m) => {
      const title = (m.title || "").toLowerCase();
      const director = (m.director || "").toLowerCase();

      return title.includes(q) || director.includes(q);
    });

    setResults(filtered);
  }, [queryParam, loading, movies]);

  if (loading) return <p>영화 데이터를 불러오는 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        🔍 검색 결과:{" "}
        <strong>{queryParam ? queryParam : "(검색어 없음)"}</strong>
      </h2>

      {/* 검색어가 없을 때 */}
      {!queryParam.trim() && (
        <p style={{ marginTop: "16px", color: "#6b7280" }}>
          위 상단 검색창에서 제목이나 감독 이름을 입력 후 Enter를 눌러주세요.
        </p>
      )}

      {/* 검색어는 있는데 결과가 없을 때 */}
      {queryParam.trim() && results.length === 0 && (
        <p style={{ marginTop: "16px" }}>검색 결과가 없습니다 😢</p>
      )}

      {/* 검색 결과 카드들 (3열) */}
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

            <p style={{ color: "#6b7280", marginBottom: "4px" }}>
              감독: {movie.director || "정보 없음"}
            </p>

            <p style={{ color: "#4b5563", fontSize: "14px" }}>
              개봉연도: {movie.year || "미상"}
            </p>

            <p style={{ color: "#f59e0b", fontWeight: "bold", marginTop: "4px" }}>
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
              상세보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
