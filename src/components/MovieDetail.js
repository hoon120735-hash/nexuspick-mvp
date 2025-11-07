import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";

function MovieDetail({ username }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

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

        // 사용자 포인트 불러오기
        if (username) {
          const userRef = doc(db, "users", username);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserPoints(userSnap.data().points || 0);
          } else {
            // 없으면 새로 생성
            await updateDoc(userRef, { points: 10000, ownedMovies: [] });
            setUserPoints(10000);
          }
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id, username]);

  // ✅ 구매 처리
  const handlePurchase = async () => {
    if (!username) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const price = movie.price || 3000; // 기본 가격 3000P
    if (userPoints < price) {
      alert("포인트가 부족합니다 💸");
      return;
    }

    try {
      const userRef = doc(db, "users", username);

      await updateDoc(userRef, {
        points: increment(-price), // 포인트 차감
        ownedMovies: arrayUnion({
          id: movie.id,
          title: movie.title,
          posterUrl: movie.posterUrl || "",
          price,
        }),
      });

      alert(`🎉 '${movie.title}'을(를) 소장했습니다!`);
      setUserPoints(userPoints - price);
    } catch (error) {
      console.error("구매 실패:", error);
      alert("구매 처리 중 오류가 발생했습니다.");
    }
  };

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
      <p>개봉연도: {movie.year || "정보 없음"}</p>
      <p>장르: {movie.genre || "정보 없음"}</p>
      <p>평점: {movie.ratingAvg ? `${movie.ratingAvg} ★` : "평점 없음"}</p>
      <p style={{ marginTop: "8px", color: "#555" }}>
        {movie.description || "영화 설명이 없습니다."}
      </p>

      {/* 🎟️ 예고편 */}
      {movie.trailerUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>🎬 예고편</h3>
          <iframe
            width="420"
            height="240"
            src={movie.trailerUrl}
            title="예고편"
            allowFullScreen
            style={{ borderRadius: "8px" }}
          ></iframe>
        </div>
      )}

      {/* 💰 구매 버튼 */}
      <div style={{ marginTop: "20px" }}>
        <p>보유 포인트: {userPoints.toLocaleString()}P</p>
        <button
          onClick={handlePurchase}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          🎟️ {movie.price || 3000}P에 소장하기
        </button>
      </div>
    </div>
  );
}

export default MovieDetail;
