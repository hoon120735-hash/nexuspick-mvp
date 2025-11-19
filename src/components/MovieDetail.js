// src/components/MovieDetail.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function MovieDetail({ userId }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 사용자 포인트 (localStorage에 저장)
  const [points, setPoints] = useState(
    Number(localStorage.getItem("nexusPoints") || 10000)
  );

  // 🔹 소장 목록 (localStorage 저장)
  const [ownedMovies, setOwnedMovies] = useState(
    JSON.parse(localStorage.getItem("ownedMovies") || "[]")
  );

  // 🔹 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovie = async () => {
      const movieRef = doc(db, "movies", id);
      const movieSnap = await getDoc(movieRef);

      if (movieSnap.exists()) {
        setMovie(movieSnap.data());
      } else {
        setMovie(null);
      }
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  // 🔹 소장하기 기능
  const buyMovie = () => {
    if (!movie) return;

    const price = movie.price ?? 0; // price가 없으면 0 처리

    if (price === 0) {
      alert("무료 콘텐츠입니다. 자동으로 소장되었습니다.");
    } else {
      if (points < price) {
        alert("포인트가 부족합니다!");
        return;
      }
      setPoints((prev) => {
        const newPoints = prev - price;
        localStorage.setItem("nexusPoints", newPoints);
        return newPoints;
      });
    }

    // 소장 목록 추가
    const newOwned = [...ownedMovies, movie.title];
    setOwnedMovies(newOwned);
    localStorage.setItem("ownedMovies", JSON.stringify(newOwned));

    alert("콘텐츠가 소장되었습니다!");
  };

  if (loading) return <p>로딩 중...</p>;
  if (!movie) return <p>영화 정보를 찾을 수 없습니다.</p>;

  const price = movie.price ?? 0; // 안전 처리

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>{movie.title}</h2>

      <p style={{ marginTop: "10px" }}>
        <strong>감독:</strong> {movie.director}
      </p>

      <p>
        <strong>장르:</strong> {movie.genre}
      </p>

      <p>
        <strong>연도:</strong> {movie.year}
      </p>

      <p>
        <strong>평점:</strong>{" "}
        {movie.ratingAvg ? `${movie.ratingAvg} ★` : "평점 없음"}
      </p>

      <p style={{ marginTop: "10px" }}>
        <strong>설명:</strong> {movie.description}
      </p>

      <h3 style={{ marginTop: "16px" }}>
        <strong>가격:</strong>{" "}
        {price > 0 ? `${price.toLocaleString()}원` : "가격 정보 없음"}
      </h3>

      {/* 소장하기 버튼 */}
      <button
        onClick={buyMovie}
        style={{
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          marginTop: "20px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        🎁 소장하기
      </button>

      <p style={{ marginTop: "20px", color: "#555" }}>
        보유 포인트: {points.toLocaleString()}P
      </p>
    </div>
  );
}

export default MovieDetail;
