import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const buyMovie = () => {
    const current = JSON.parse(localStorage.getItem("ownedMovies") || "[]");
    const points = parseInt(localStorage.getItem("points") || "0");

    if (current.includes(id)) {
      return alert("이미 소장한 콘텐츠입니다.");
    }

    const price = movie.price || 0;

    if (points < price) {
      return alert("포인트가 부족합니다!");
    }

    localStorage.setItem("ownedMovies", JSON.stringify([...current, id]));
    localStorage.setItem("points", points - price);

    alert("구매 완료!");
  };

  const fetchMovie = async () => {
    const snap = await getDoc(doc(db, "movies", id));
    if (snap.exists()) setMovie({ id, ...snap.data() });
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  if (!movie) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.genre}</p>
      <p>{movie.price ? `${movie.price}원` : "무료"}</p>

      <button
        onClick={buyMovie}
        style={{ background: "#4f46e5", color: "white", padding: "10px 16px", borderRadius: 6 }}
      >
        소장하기
      </button>
    </div>
  );
}

export default MovieDetail;
