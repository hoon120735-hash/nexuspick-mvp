import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function MyPage({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);

    const unsub = onSnapshot(userRef, (snap) => {
      if (snap.exists()) setUserData(snap.data());
      else setUserData(null);
    });

    return () => unsub();
  }, [userId]);

  if (!userId) return <p>로그인 후 이용해주세요.</p>;
  if (!userData) return <p>유저 정보를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>👤 내 정보</h2>
      <p>
        <strong>아이디:</strong> {userId}
      </p>
      <p>
        <strong>보유 포인트:</strong> {userData.points?.toLocaleString()}P
      </p>
      <p>
        <strong>소장 영화 수:</strong> {userData.ownedMovies?.length || 0}편
      </p>

      <ul>
        {userData.ownedMovies?.map((movieId, index) => (
          <li key={index}>{movieId}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyPage;
