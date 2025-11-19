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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
        {movies.map((m) => (
          <div key={m.id} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
            <b>{m.title}</b>
            <p>{m.genre}</p>
            <p>{m.price ? `${m.price}원` : "무료"}</p>

            <button
              onClick={() => navigate(`/movie/${m.id}`)}
              style={{ marginTop: 10, width: "100%" }}
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
