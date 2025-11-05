import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLocation } from "react-router-dom";

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // ✅ URL의 ?query=값 가져오기
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("query") || "";

  useEffect(() => {
    async function fetchSearchResults() {
      if (!keyword.trim()) return;
      setLoading(true);

      try {
        const moviesRef = collection(db, "movies");
        const snapshot = await getDocs(moviesRef);
        const allMovies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // ✅ title 또는 director 중 하나라도 keyword 포함 시 검색
        const filtered = allMovies.filter(
          m =>
            m.title?.toLowerCase().includes(keyword.toLowerCase()) ||
            m.director?.toLowerCase().includes(keyword.toLowerCase())
        );

        setResults(filtered);
      } catch (err) {
        console.error("검색 중 오류:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [keyword]); // ✅ keyword가 바뀔 때마다 자동 검색

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 검색 결과</h2>
      {loading ? (
        <p>검색 중...</p>
      ) : results.length > 0 ? (
        <ul>
          {results.map(movie => (
            <li key={movie.id} style={{ marginBottom: "10px" }}>
              🎬 {movie.title} ({movie.director})
            </li>
          ))}
        </ul>
      ) : (
        <p>검색 결과가 없습니다 😢</p>
      )}
    </div>
  );
}

export default Search;
