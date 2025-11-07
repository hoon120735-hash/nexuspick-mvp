import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function MyPage({ username }) {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Firestore에서 사용자 데이터 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!username) return;

        const userRef = doc(db, "users", username);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          // 🔹 유저 데이터가 없으면 새로 생성
          await updateDoc(userRef, {
            points: 0,
            ownedMovies: [],
          });
          setUserData({ points: 0, ownedMovies: [] });
        }
      } catch (error) {
        console.error("유저 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  // ✅ 포인트 충전
  const handlePayment = async () => {
    if (!selectedAmount) {
      alert("충전할 금액을 선택해주세요!");
      return;
    }

    try {
      const userRef = doc(db, "users", username);
      const newPoints = (userData.points || 0) + selectedAmount;
      await updateDoc(userRef, { points: newPoints });
      setUserData((prev) => ({ ...prev, points: newPoints }));
      alert(`${selectedAmount.toLocaleString()}P가 충전되었습니다!`);
      setShowModal(false);
    } catch (error) {
      console.error("포인트 충전 실패:", error);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (!userData) return <p>유저 정보를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5", fontWeight: "bold" }}>👤 내 정보</h2>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <p>
          <strong>아이디:</strong> {username}
        </p>
        <p>
          <strong>보유 포인트:</strong> {userData.points?.toLocaleString()}P
        </p>

        <h3 style={{ marginTop: "20px", fontSize: "18px" }}>🎞 소장한 영화</h3>
        {userData.ownedMovies?.length > 0 ? (
          <ul>
            {userData.ownedMovies.map((movieId, index) => (
              <li key={index}>🎬 {movieId}</li>
            ))}
          </ul>
        ) : (
          <p>아직 소장한 영화가 없습니다.</p>
        )}

        {/* 💳 포인트 충전 버튼 */}
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          💳 포인트 충전
        </button>
      </div>

      {/* 💰 결제 모달창 */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              width: "320px",
              textAlign: "center",
            }}
          >
            <h3>💰 포인트 충전</h3>
            <p style={{ marginBottom: "16px" }}>충전할 금액을 선택하세요</p>

            {[1000, 5000, 10000, 20000].map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                style={{
                  display: "block",
                  width: "100%",
                  margin: "6px 0",
                  padding: "10px",
                  borderRadius: "8px",
                  border:
                    selectedAmount === amount
                      ? "2px solid #4f46e5"
                      : "1px solid #ccc",
                  backgroundColor:
                    selectedAmount === amount ? "#e0e7ff" : "white",
                  cursor: "pointer",
                }}
              >
                {amount.toLocaleString()}P
              </button>
            ))}

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handlePayment}
                style={{
                  backgroundColor: "#4f46e5",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                결제하기
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: "#e5e7eb",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPage;
