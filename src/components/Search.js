import React, { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Search() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const moviesRef = collection(db, "movies");

      // 감독, 배우, 장르 중 하나라도 일치하면 검색
      const q = query(
        moviesRef,
        where("director", "==", text)
      );

      const querySnapshot = await getDocs(q);
      const resultList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResults(resultList);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 콘텐츠 검색</h2>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="감독 이름으로 검색"
          style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "8px", width: "250px" }}
        />
        <button
          onClick={handleSearch}
          style={{ backgroundColor: "#4f46e5", color: "white", padding: "8px 12px", borderRadius: "4px" }}
        >
          검색
        </button>
      </div>

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
