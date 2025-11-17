import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

function MovieDetail({ userId }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [userData, setUserData] = useState(null);

  // 🔹 영화 정보 로드
  const fetchMovie = useCallback(async () => {
    const ref = doc(db, "movies", id);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) setMovie(snapshot.data());
  }, [id]);

  // 🔹 사용자 정보 로드
  const fetchUserData = useCallback(async () => {
    if (!userId) return;
    const ref = doc(db, "users", userId);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) setUserData(snapshot.data());
  }, [userId]);

  useEffect(() => {
    fetchMovie();
    fetchUserData();
  }, [fetchMovie, fetchUserData]);

  // 🔹 "소장하기" 버튼
  const buyMovie = async () => {
    if (!userId) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (userData.ownedMovies?.includes(id)) {
      alert("이미 소장한 영화입니다.");
      return;
    }

    if (userData.points < 2000) {
      alert("포인트가 부족합니다.");
      return;
    }

    try {
      const ref = doc(db, "users", userId);
      await updateDoc(ref, {
        points: userData.points - 2000,
        ownedMovies: arrayUnion(id),
      });

      alert("소장 완료!");
      fetchUserData(); // 최신화
    } catch (err) {
      console.error("구매 오류:", err);
    }
  };

  if (!movie) return <p style={{ padding: "20px" }}>영화 정보를 불러오는 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{movie.title}</h2>
      <p>감독: {movie.director}</p>
      <p>장르: {movie.genre}</p>
      <p>평점: {movie.ratingAvg}</p>

      {movie.posterUrl && (
        <img src={movie.posterUrl} alt={movie.title} width={200} />
      )}

      <button
        onClick={buyMovie}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          backgroundColor: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🎁 소장하기 (2000P)
      </button>
    </div>
  );
}

export default MovieDetail;
