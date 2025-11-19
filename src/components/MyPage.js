import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function MyPage() {
  const username = localStorage.getItem("username");
  const [points, setPoints] = useState(Number(localStorage.getItem("points") || 0));
  const [list, setList] = useState([]);

  const charge = (amount) => {
    const newValue = points + amount;
    setPoints(newValue);
    localStorage.setItem("points", newValue);
  };

  const loadOwnedMovies = async () => {
    const ids = JSON.parse(localStorage.getItem("ownedMovies") || "[]");
    const results = [];

    for (let id of ids) {
      const snap = await getDoc(doc(db, "movies", id));
      if (snap.exists()) results.push(snap.data().title);
    }

    setList(results);
  };

  useEffect(() => {
    loadOwnedMovies();
  }, []);

  return (
    <div>
      <h2>내 정보</h2>
      <p><b>아이디:</b> {username}</p>
      <p><b>보유 포인트:</b> {points.toLocaleString()}P</p>

      <button onClick={() => charge(1000)}>+ 1,000 충전</button>
      <button onClick={() => charge(5000)} style={{ marginLeft: 10 }}>+ 5,000 충전</button>
      <button onClick={() => charge(10000)} style={{ marginLeft: 10 }}>+ 10,000 충전</button>

      <hr style={{ margin: "20px 0" }} />

      <h3>소장 콘텐츠</h3>
      {list.length === 0 ? (
        <p>소장한 콘텐츠가 없습니다.</p>
      ) : (
        <ul>
          {list.map((title, i) => (
            <li key={i}>{title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPage;
