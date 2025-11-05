import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 전체 영화 불러오기
  const fetchAllMovies = async () => {
    try {
      const movieCol = collection(db, "movies");
      const movieSnapshot = await getDocs(movieCol);
      const movieList = movieSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(movieList);
    } catch (error) {
      console.error("영화 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* ✅ 영화 리스트만 표시 */}
      <h2 style={{ marginBottom: "16px" }}>🎞 인기 영화 리스트</h2>
      {movies.length === 0 ? (
        <p>등록된 영화가 없습니다 😢</p>
      ) : (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          {movies.map((movie) =>
