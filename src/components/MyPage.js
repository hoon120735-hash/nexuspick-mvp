import React, { useState } from "react";

function MyPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [points, setPoints] = useState(0);

  // ✅ 결제 완료 시 포인트 반영
  const handlePayment = () => {
    if (!selectedAmount) {
      alert("충전할 금액을 선택해주세요!");
      return;
    }

    setPoints(points + selectedAmount);
    setShowModal(false);
    alert(`${selectedAmount}P가 충전되었습니다!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 내 정보</h2>
      <p>보유 포인트: <strong>{points.toLocaleString()}P</strong></p>
      <p>소장한 영화: 아직 없습니다</p>

      {/* 💳 포인트 충전 버튼 */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        💳 포인트 충전
      </button>

      {/* 💰 결제 모달창 */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              width: "320px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h3>💰 포인트 충전</h3>
            <p style={{ marginBottom: "16px", color: "#555" }}>
              충전할 금액을 선택하세요
            </p>

            {/* 금액 선택 버튼 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
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

            {/* 결제 및 취소 버튼 */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={handlePayment}
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
