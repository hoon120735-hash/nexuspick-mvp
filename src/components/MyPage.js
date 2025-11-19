import React, { useEffect, useState } from "react";

function MyPage() {
  const username = localStorage.getItem("username");
  const [points, setPoints] = useState(Number(localStorage.getItem("points") || 0));
  const [list, setList] = useState([]);

  const charge = (amount) => {
    const newValue = points + amount;
    setPoints(newValue);
    localStorage.setItem("points", newValue);
  };

  const loadOwnedMovies = () => {
    const saved = JSON.parse(localStorage.getItem("ownedMovies") || "[]");
    setList(saved);
  };

  useEffect(() => {
    loadOwnedMovies();
  }, []);

  return (
    <div>
      <h2>내 정보</h2>
      <p>
        <b>아이디:</b> {username}
      </p>
      <p>
        <b>보유 포인트:</b> {points.toLocaleString()}P
      </p>

      {/* 충전 버튼 */}
      <button onClick={() => charge(1000)}>+ 1,000 충전</button>
      <button onClick={() => charge(5000)} style={{ marginLeft: 10 }}>
        + 5,000 충전
      </button>
      <button onClick={() => charge(10000)} style={{ marginLeft: 10 }}>
        + 10,000 충전
      </button>

      <hr style={{ margin: "20px 0" }} />

      <h3>소장 콘텐츠</h3>

      {list.length === 0 ? (
        <p>소장한 콘텐츠가 없습니다.</p>
      ) : (
        <ul>
          {list.map((item, i) => (
            <li key={i}>
              {item.title} —{" "}
              {item.price ? `₩${item.price.toLocaleString()}` : "무료"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPage;
