import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs, or } from "firebase/firestore";

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 ?query= 검색어 추출
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("query") || "";

  useEffect(() => {
    async function fetchResults() {
      if (!searchText.trim()) return;

      setLoading(true);
      try {
        const moviesRef = collection(db, "movies");
        const q = query(
          moviesRef,
          or(where("title", "==", searchText), where("director", "==", searchText))
        );
        const snapshot = await getDocs(q);
        const resultList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(resultList);
      } catch (err) {
        console.error("검색 오류:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [searchText]);

  if (loading) return <p>검색 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 검색 결과: "{searchText}"</h2>
      {results.length === 0 ? (
        <p>검색 결과가 없습니다 😢</p>
      ) : (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          {results.map((movie) => (
            <li
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)} // ✅ 클릭 시 상세 페이지로 이동
              style={{
                listStyle: "none",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={movie.posterUrl || "https://via.placeholder.com/150"}
                alt={movie.title}
                width={120}
                height={180}
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              />
              <p style={{ marginTop: "8px", fontWeight: "bold" }}>{movie.title}</p>
              <p style={{ color: "#f59e0b" }}>
                {movie.ratingAvg ? `${movie.ratingAvg} ★` : "평점 없음"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;

