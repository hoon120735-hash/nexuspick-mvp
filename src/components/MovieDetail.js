// src/components/MovieDetail.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function MovieDetail({ onPurchase, ownedMovies, points }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const snap = await getDoc(doc(db, "movies", id));
      if (snap.exists()) setMovie({ id, ...snap.data() });
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>로딩 중...</p>;

  const alreadyOwned = ownedMovies.some((m) => m.id === movie.id);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>{movie.title}</h2>
      <p>감독: {movie.director}</p>
      <p>연도: {movie.year}</p>
      <p>예고편: {movie.trailerUrl}</p>
      <p style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}>
        가격: {movie.price.toLocaleString()}P
      </p>

      <button
        onClick={() => onPurchase(movie)}
        disabled={alreadyOwned}
        style={{
          backgroundColor: alreadyOwned ? "#ccc" : "#4f46e5",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          marginTop: "20px",
          cursor: alreadyOwned ? "not-allowed" : "pointer",
        }}
      >
        {alreadyOwned ? "소장 완료" : "소장하기"}
      </button>

      <p style={{ marginTop: "10px" }}>보유 포인트: {points}P</p>
    </div>
  );
}

export default MovieDetail;
