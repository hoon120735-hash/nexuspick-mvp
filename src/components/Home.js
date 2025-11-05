import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 전체 영화 불러오기
  const fetchAllMovies = async () => {
    try {
      const movieCol = collection(db, "movies");
      const movieSnapshot = await getDocs(movieCol);
      const movieList = movieSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(movieList);
    } catch (error) {
      console.error("영화 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* ✅ 영화 리스트만 표시 */}
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
              style={{ listStyle: "none", textAlign: "center", cursor: "pointer" }}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={movie.posterUrl || "https://via.placeholder.com/150"}
                alt={movie.title}
                width={120}
                height={180}
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
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
