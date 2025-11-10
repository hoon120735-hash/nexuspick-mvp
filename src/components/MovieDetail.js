import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

function MovieDetail({ userId }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieRef = doc(db, "movies", id);
      const movieSnap = await getDoc(movieRef);
      if (movieSnap.exists()) setMovie(movieSnap.data());
      setLoading(false);
    };

    const fetchUser = async () => {
      if (!userId) return;
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUserPoints(userSnap.data().points || 0);
    };

    fetchMovie();
    fetchUser();
  }, [id, userId]);

  // ✅ 영화 소장 처리
  const handlePurchase = async () => {
    if (!userId) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    if (userPoints < 2000) {
      alert("포인트가 부족합니다!");
      return;
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const ownedMovies = userData.ownedMovies || [];

    if (ownedMovies.includes(id)) {
      alert("이미 소장한 영화입니다!");
      return;
    }

    await updateDoc(userRef, {
      points: userData.points - 2000,
      ownedMovies: arrayUnion(id),
    });

    alert(`✅ ${movie.title}을(를) 소장했습니다! (2000P 차감)`);
    setUserPoints(userData.points - 2000);
  };

  if (loading) return <p>로딩 중...</p>;
  if (!movie) return <p>영화를 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>{movie.title}</h2>
      <p>🎬 감독: {movie.director}</p>
      <p>🗓️ 개봉연도: {movie.year}</p>
      <p>⭐ 평점: {movie.ratingAvg}</p>

      <img
        src={movie.posterUrl}
        alt={movie.title}
        style={{ width: "240px", borderRadius: "12px", margin: "12px 0" }}
      />

      <p style={{ color: "#555" }}>{movie.description}</p>

      <button
        onClick={handlePurchase}
        style={{
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "12px",
        }}
      >
        💾 소장하기 (2000P)
      </button>
    </div>
  );
}

export default MovieDetail;
