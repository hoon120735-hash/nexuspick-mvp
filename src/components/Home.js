import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    const snap = await getDocs(collection(db, "movies"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setMovies(list);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>🎞 추천 콘텐츠</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {movies.map((m) => (
          <div
            key={m.id}
            style={{
              border: "1px solid #ddd",
              padding: 20,
              borderRadius: 10,
              boxShadow: "0 3px 6px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{m.title}</h3>
            <p style={{ color: "#777" }}>{m.genre}</p>

            <p style={{ fontWeight: "bold" }}>
              {m.price ? `₩${m.price.toLocaleString()}` : "무료"}
            </p>

            <p style={{ color: "#facc15", fontSize: 14 }}>
              ⭐ {m.rating ? m.rating : "평점 없음"}
            </p>

            <button
              onClick={() => navigate(`/movie/${m.id}`)}
              style={{
                width: "100%",
                marginTop: 10,
                background: "#111827",
                color: "white",
                padding: "10px 14px",
                borderRadius: 8,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              바로 보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
