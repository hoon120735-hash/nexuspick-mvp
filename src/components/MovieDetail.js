import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // 포인트 & 소장 목록(localStorage 저장)
  const [points, setPoints] = useState(
    Number(localStorage.getItem("nexusPoints") || 10000)
  );

  const [ownedMovies, setOwnedMovies] = useState(
    JSON.parse(localStorage.getItem("ownedMovies") || "[]")
  );

  // 영화 불러오기
  useEffect(() => {
    const fetchMovie = async () => {
      const docRef = doc(db, "movies", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setMovie(docSnap.data());
      else setMovie(null);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  // 소장하기
  const buyMovie = () => {
    if (!movie) return;

    const price = movie.price ?? 0;

    // 가격 있을 때만 차감
    if (price > 0) {
      if (points < price) {
        alert("포인트가 부족합니다!");
        return;
      }

      const newPoints = points - price;
      setPoints(newPoints);
      localStorage.setItem("nexusPoints", newPoints);
    }

    // 중복 소장 방지
    if (ownedMovies.includes(movie.title)) {
      alert("이미 소장한 콘텐츠입니다.");
      return;
    }

    const newOwned = [...ownedMovies, movie.title];
    setOwnedMovies(newOwned);
    localStorage.setItem("ownedMovies", JSON.stringify(newOwned));

    alert("콘텐츠가 소장되었습니다!");
  };

  if (loading) return <p>로딩 중...</p>;
  if (!movie) return <p>영화 정보를 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>{movie.title}</h2>

      <p><strong>감독:</strong> {movie.director}</p>
      <p><strong>장르:</strong> {movie.genre}</p>
      <p><strong>연도:</strong> {movie.year}</p>
      <p><strong>평점:</strong> {movie.ratingAvg || "평점 없음"}</p>

      <h3 style={{ marginTop: "16px" }}>
        <strong>가격:</strong> {movie.price ? `${movie.price}원` : "무료"}
      </h3>

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
        }}
      >
        🎁 소장하기
      </button>

      <p style={{ marginTop: "20px" }}>
        보유 포인트: {points.toLocaleString()}P
      </p>
    </div>
  );
}

export default MovieDetail;
