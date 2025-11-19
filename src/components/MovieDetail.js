// src/components/MovieDetail.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function MovieDetail({ userId }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  // Firestore에서 해당 영화 불러오기
  useEffect(() => {
    const loadMovie = async () => {
      const movieRef = doc(db, "movies", id);
      const snap = await getDoc(movieRef);

      if (snap.exists()) {
        setMovie({ id: snap.id, ...snap.data() });
      }
    };

    loadMovie();
  }, [id]);

  // 영화 소장하기 기능
  const handleOwnMovie = async () => {
    if (!userId) {
      alert("로그인 후 이용해주세요!");
      return;
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const userData = userSnap.data();

    // 소장 정보 생성 (id + title)
    const movieData = {
      id: movie.id,
      title: movie.title,
    };

    await updateDoc(userRef, {
      ownedMovies: [...(userData.ownedMovies || []), movieData],
    });

    alert("영화를 소장했습니다!");
  };

  if (!movie) return <p>영화 정보를 불러오는 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{movie.title}</h2>
      {movie.year && <p>📆 제작년도: {movie.year}</p>}

      <button onClick={handleOwnMovie}>🎁 소장하기</button>
    </div>
  );
}

export default MovieDetail;
