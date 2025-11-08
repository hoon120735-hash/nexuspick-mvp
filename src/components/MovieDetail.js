import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";

function MovieDetail({ username }) {
  const { id } = useParams(); // URL의 영화 ID
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const docRef = doc(db, "movies", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMovie({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("영화를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("영화 불러오기 오류:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  // ✅ 구매 처리
  const handlePurchase = async () => {
    if (!username) {
      alert("로그인이 필요합니다!");
      return;
    }

    const userRef = doc(db, "users", username);

    try {
      setIsBuying(true);
      await updateDoc(userRef, {
        ownedMovies: arrayUnion(id),
        points: increment(-3000), // 포인트 차감
      });

      alert(`🎉 ${movie.title}을(를) 구매했습니다!`);
    } catch (error) {
      console.error("구매 처리 중 오류:", error);
      alert("❌ 구매 중 문제가 발생했습니다.");
    } finally {
      setIsBuying(false);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (!movie) return <p>영화를 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <img
        src={movie.posterUrl || "https://via.placeholder.com/250x350"}
        alt={movie.title}
        width={250}
        style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
      />
      <h2 style={{ marginTop: "16px", color: "#4f46e5" }}>{movie.title}</h2>
      <p>감독: {movie.director}</p>
      <p>개봉연도: {movie.year || "정보 없음"}</p>
      <p>장르: {movie.genre || "정보 없음"}</p>
      <p style={{ color: "#f59e0b" }}>
        평점: {movie.ratingAvg ? `${movie.ratingAvg} ★` : "평점 없음"}
      </p>
      <p style={{ marginTop: "8px", color: "#555" }}>{movie.description}</p>

      {/* 🎥 유튜브 예고편 */}
      {movie.trailerUrl && (
        <div style={{ marginTop: "20px" }}>
          <iframe
            width="100%"
            height="315"
            src={movie.trailerUrl.replace("watch?v=", "embed/")}
            title="예고편"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* 💳 구매 버튼 */}
      <button
        onClick={handlePurchase}
        disabled={isBuying}
        style={{
          marginTop: "20px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: isBuying ? "not-allowed" : "pointer",
        }}
      >
        {isBuying ? "구매 중..." : "🎬 3,000P로 구매하기"}
      </button>
    </div>
  );
}

export default MovieDetail;
