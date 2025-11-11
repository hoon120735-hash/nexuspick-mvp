// src/components/MovieDetail.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { useParams } from "react-router-dom";

function MovieDetail({ userId }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const docRef = doc(db, "movies", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMovie({ id: docSnap.id, ...docSnap.data() });
      }
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
    const moviePrice = 3000;

    if (userData.points < moviePrice) {
      alert("포인트가 부족합니다! 💳");
      return;
    }

    await updateDoc(userRef, {
      points: increment(-moviePrice),
      ownedMovies: arrayUnion(id),
    });

    alert(`${movie.title}을(를) 소장했습니다!`);
  };

  if (!movie) return <p>영화 정보를 불러오는 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{movie.title}</h2>
      <p>감독: {movie.director}</p>
      <p>개봉년도: {movie.year}</p>
      {movie.trailerUrl && (
        <iframe
          width="560"
          height="315"
          src={movie.trailerUrl}
          title="예고편"
          frameBorder="0"
          allowFullScreen
          style={{ marginTop: "20px" }}
        ></iframe>
      )}
      <br />
      <button
        onClick={handlePurchase}
        style={{
          marginTop: "20px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        🎁 영화 소장하기 (3,000P)
      </button>
    </div>
  );
}

export default MovieDetail;
