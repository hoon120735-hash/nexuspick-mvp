// src/components/Home.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(""); // 🔍 검색어 상태
  const [searching, setSearching] = useState(false);

  // 🔹 영화 전체 불러오기
  const fetchAllMovies = async () => {
    const movieCol = collection(db, "movies");
    const movieSnapshot = await getDocs(movieCol);
    const movieList = movieSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMovies(movieList);
    setLoading(false);
  };

  // 🔹 검색 실행 함수
  const handleSearch = async () => {
    if (!searchText.trim()) {
      fetchAllMovies();
      return;
    }
    setSearching(true);
    try {
      const moviesRef = collection(db, "movies");
      const q = query(moviesRef, where("title", "==", searchText)); // 제목으로 검색
      const querySnapshot = await getDocs(q);
      const resultList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMovies(resultList);
    } catch (error) {
      console.error("검색 오류:", error);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎥 인기 영화 리스트</h2>

      {/* 🔍 검색 영역 */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="제목으로 검색"
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            width: "250px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {searching ? "검색 중..." : "검색"}
        </button>
      </div>

      {/* 🔹 영화 리스트 */}
      {movies.length === 0 ? (
        <p>검색 결과가 없습니다 😢</p>
      ) : (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          {movies.map((movie) => (
            <li key={movie.id} style={{ listStyle: "none", textAlign: "center" }}>
              <img
                src={movie.posterUrl || "https://via.placeholder.com/150"}
                alt={movie.title}
                width={120}
                height={180}
                style={{ borderRadius: "8px", cursor: "pointer" }}
                onClick={() => (window.location.href = `/movie/${movie.id}`)}
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

export default Home;
