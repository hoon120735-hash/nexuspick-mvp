import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, or } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);

  const navigate = useNavigate();

  // 🔹 전체 영화 불러오기
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

  // 🔹 제목 또는 감독으로 검색
  const handleSearch = async () => {
    if (!searchText.trim()) {
      fetchAllMovies();
      return;
    }

    setSearching(true);
    try {
      const moviesRef = collection(db, "movies");

      // 🔸 Firestore 9.22 이상부터 `or` 조건 지원
      const q = query(
        moviesRef,
        or(
          where("title", "==", searchText),
          where("director", "==", searchText)
        )
      );

      const querySnapshot = await getDocs(q);
      const resultList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

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
      {/* 상단 영역: 로고 + 검색창 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        {/* 🔹 로고 클릭 시 홈으로 이동 */}
        <h1
          onClick={() => navigate("/")}
          style={{
            color: "#4f46e5",
            cursor: "pointer",
            fontFamily: "sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🎬 NexusPick MVP
        </h1>

        {/* 🔹 검색창 */}
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="제목 또는 감독으로 검색"
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
      </div>

      {/* 영화 리스트 */}
      <h2 style={{ marginBottom: "16px" }}>🎞 인기 영화 리스트</h2>
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
