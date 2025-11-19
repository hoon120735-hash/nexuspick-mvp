// src/components/Home.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home({ username }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Firestore에서 movies 읽기 (읽기만)
  useEffect(() => {
    const fetchMovies = async () => {
      const snapshot = await getDocs(collection(db, "movies"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(list);
    };
    fetchMovies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#4f46e5" }}>
        {username}님, 환영합니다 👋
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: "white",
              cursor: "pointer",
              boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>{movie.title}</h3>
            <p style={{ color: "#555" }}>{movie.director}</p>
            <p style={{ color: "#f59e0b" }}>
              ⭐ {movie.ratingAvg ? movie.ratingAvg.toFixed(1) : "평점 없음"}
            </p>
            <p style={{ fontWeight: "bold", color: "#4f46e5" }}>
              {movie.price ? `${movie.price.toLocaleString()}P` : "무료"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
