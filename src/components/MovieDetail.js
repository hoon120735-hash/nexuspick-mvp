import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const docRef = doc(db, "movies", id);
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

  const handleBuyMovie = async () => {
    if (!userId) {
      alert("로그인이 필요합니다!");
      return;
    }

    setBuying(true);
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("유저 정보를 찾을 수 없습니다.");
        return;
      }

      const userData = userSnap.data();
      const currentPoints = userData.points || 0;
      const moviePrice = 3000; // 🎟️ 영화 구매 가격 (예시)

      // 이미 소장 중인지 확인
      if (userData.ownedMovies?.includes(id)) {
        alert("이미 소장한 영화입니다 🎬");
        return;
      }

      // 포인트 부족 시
      if (currentPoints < moviePrice) {
        alert("포인트가 부족합니다 💳 마이페이지에서 충전해주세요!");
        return;
      }

      // Firestore 업데이트 (포인트 차감 + 소장 목록 추가)
      await updateDoc(userRef, {
        points: currentPoints - moviePrice,
        ownedMovies: arrayUnion(id),
      });

      alert(`${movie.title}을(를) 소장했습니다! 🎉`);
    } catch (error) {
      console.error("구매 처리 중 오류:", error);
      alert("구매 처리 중 문제가 발생했습니다.");
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (!movie) return <p>영화 데이터를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <img
        src={movie.posterUrl || "https://via.placeholder.com/250x350"}
        alt={movie.title}
        width={250}
        style={{
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          marginBottom: "16px",
        }}
      />
      <h2 style={{ marginTop: "16px", fontSize: "24px" }}>{movie.title}</h2>
      <p>감독: {movie.director}</p>
      <p>개봉 연도: {movie.year || "정보 없음"}</p>
      <p>장르: {movie.genre || "정보 없음"}</p>
      <p>평점: {movie.ratingAvg ? `${movie.ratingAvg} ★` : "평점 없음"}</p>
      <p style={{ marginTop: "8px", color: "#555" }}>
        {movie.description || "영화 설명이 없습니다."}
      </p>

      {/* 🎞️ 예고편 */}
      {movie.trailerUrl && (
        <div style={{ marginTop: "20px" }}>
          <iframe
            width="560"
            height="315"
            src={movie.trailerUrl.replace("watch?v=", "embed/")}
            title="예고편"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* 🎟️ 구매(소장) 버튼 */}
      <button
        onClick={handleBuyMovie}
        disabled={buying}
        style={{
          marginTop: "24px",
          backgroundColor: buying ? "#9ca3af" : "#4f46e5",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {buying ? "처리 중..." : "🎟️ 영화 구매 (3000P)"}
      </button>
    </div>
  );
}

export default MovieDetail;
