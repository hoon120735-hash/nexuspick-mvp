import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // ✅ 추가
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function MovieDetail() {
  const { id } = useParams();  // ✅ URL의 /movie/:id 에서 id 추출
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const docRef = doc(db, "movies", id);  // ✅ movieId → id
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMovie({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("해당 영화 문서를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("영화 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!movie) return <p>영화 데이터를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={movie.posterUrl || "https://via.placeholder.com/250x350"}
        alt={movie.title}
        width={250}
        style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
      />
      <h2 style={{ marginTop: "16px" }}>{movie.title}</h2>
      <p>감독: {movie.director}</p>
      <p>평점: {movie.ratingAvg ? `${movie.ratingAvg} ★` : "평점 없음"}</p>
      <p style={{ marginTop: "8px", color: "#555" }}>{movie.description || "영화 설명이 없습니다."}</p>
    </div>
  );
}

export default MovieDetail;
