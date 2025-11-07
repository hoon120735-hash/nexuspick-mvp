import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

function MyPage({ username }) {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Firestore에서 사용자 데이터 불러오기
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userRef = doc(db, "users", username);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.warn("해당 사용자가 Firestore에 없습니다.");
        }
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    if (username) fetchUserData();
  }, [username]);

  // ✅ 포인트 충전 처리
  const handleChargePoints = async () => {
    if (!selectedAmount) {
      alert("충전할 금액을 선택하세요!");
      return;
    }

    try {
      const userRef = doc(db, "users", username);
      const newPoints = (userData?.points || 0) + selectedAmount;

      await updateDoc(userRef, { points: newPoints });

      setUserData((prev) => ({ ...prev, points: newPoints }));
      alert(`${selectedAmount}P가 충전되었습니다!`);
      setShowModal(false);
    } catch (error) {
      console.error("포인트 충전 실패:", error);
    }
  };

  // ✅ 로딩 상태
  if (loading) return <p style={{ padding: "20px" }}>로딩 중...</p>;
  if (!userData)
    return <p style={{ padding: "20px" }}>유저 데이터를 불러올 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>👤 {username}님 정보</h2>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <p>
          <strong>보유 포인트:</strong>{" "}
          <span style={{ color: "#4f46e5" }}>
            {userData.points?.toLocaleString() || 0}P
          </span>
        </p>

        <p>
          <strong>소장한 영화:</strong>{" "}
          {userData.ownedMovies?.length > 0
            ? `${userData.ownedMovies.length}편`
            : "없음"}
        </p>

        {/* 🎬 소장 영화 리스트 */}
        {userData.ownedMovies?.length > 0 && (
          <ul style={{ marginTop: "10px" }}>
            {userData.ownedMovies.map((movieId, i) => (
              <li key={i}>🎞 {movieId}</li>
            ))}
          </ul>
        )}

        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          💳 포인트 충전하기
        </button>
      </div>

      {/* 💰 결제 모달 */}
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
            <p style={{ marginBottom: "16px", color: "#555" }}>
              충전할 금액을 선택하세요
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[1000, 5000, 10000, 20000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
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
            </div>

            <div style={{ marginTop: "16px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={handleChargePoints}
                style={{
                  backgroundColor: "#4f46e5",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
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
