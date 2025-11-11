import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home({ username }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchAllMovies();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* 로그인한 사용자 환영 메시지 */}
      {username && (
        <h2 style={{ marginBottom: "20px", color: "#4f46e5" }}>
          {username}님, 넥서스픽에 오신 걸 환영합니다 👋
        </h2>
      )}

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
