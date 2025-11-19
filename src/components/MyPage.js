import React, { useState } from "react";

function MyPage({ username, onLogout }) {
  const [points, setPoints] = useState(10000);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const charge = () => {
    if (!selected) return alert("충전 금액을 선택하세요!");
    setPoints(points + selected);
    setShowModal(false);
    alert(`${selected.toLocaleString()}P 충전 완료!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>{username}님의 정보</h2>

      <p>보유 포인트: {points.toLocaleString()}P</p>

      <button
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        💳 충전하기
      </button>

      <button
        onClick={onLogout}
        style={{
          backgroundColor: "#ccc",
          marginLeft: "10px",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        로그아웃
      </button>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <h3>포인트 충전</h3>

            {[1000, 5000, 10000, 20000].map((v) => (
              <button
                key={v}
                onClick={() => setSelected(v)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "8px",
                  borderRadius: "6px",
                  border:
                    selected === v ? "2px solid #4f46e5" : "1px solid #ccc",
                }}
              >
                {v.toLocaleString()}P
              </button>
            ))}

            <button
              onClick={charge}
              style={{
                width: "100%",
                marginTop: "16px",
                padding: "10px",
                background: "#4f46e5",
                color: "white",
                borderRadius: "6px",
                border: "none",
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPage;
