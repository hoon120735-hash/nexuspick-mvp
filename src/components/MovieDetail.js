import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { db } from "../firebase";

function MovieDetail({ userId }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const ref = doc(db, "movies", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setMovie(snap.data());
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  const handlePurchase = async () => {
    if (!userId) {
      alert("로그인 후 이용해주세요!");
      return;
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      alert("유저 정보를 불러올 수 없습니다.");
      return;
    }

    const userData = userSnap.data();

    // 이미 소장 중인 영화인지 확인
    if (userData.ownedMovies?.includes(id)) {
      alert("이미 소장한 영화입니다!");
      return;
    }

    const cost = 3000; // 영화 한 편 가격

    if (userData.points < cost) {
      alert("포인트가 부족합니다. 충전 후 이용해주세요!");
      return;
    }

    // Firestore 업데이트 (포인트 차감 + 소장목록 추가)
    await updateDoc(userRef, {
      points: increment(-cost),
      ownedMovies: arrayUnion(id),
    });

    alert(`✅ "${movie.title}"을(를) 소장했습니다!`);
  };

  if (loading) return <p>불러오는 중...</p>;
  if (!movie) return <p>영화 정보를 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>🎬 감독: {movie.director}</p>
      <p>📅 연도: {movie.year}</p>
      <p>⭐ 평점: {movie.ratingAvg}</p>

      <button
        onClick={handlePurchase}
        style={{
          backgroundColor: "#4f46e5",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        🎁 영화 소장하기 (3,000P)
      </button>
    </div>
  );
}

export default MovieDetail;
