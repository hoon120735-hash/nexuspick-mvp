// ✅ src/components/Login.js
import React, { useState } from "react";

function Login({ onLogin }) {
  const [language, setLanguage] = useState("English");
  const [loginType, setLoginType] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = ["K-POP", "Beauty", "Food", "Tradition", "Shopping"];

  const toggleInterest = (item) => {
    setSelectedInterests((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleStart = () => {
    if (!loginType) {
      alert("로그인 방식을 선택해주세요!");
      return;
    }
    console.log("🌐 언어:", language);
    console.log("🔐 로그인 방식:", loginType);
    console.log("🎯 관심사:", selectedInterests);
    onLogin(); // ✅ 기존 로그인 프로세스 실행
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-50 text-gray-800 font-sans">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">🎬 NexusPick</h1>
      <p className="text-gray-500 mb-8">Connect Your Movie Taste</p>

      {/* 언어 선택 */}
      <div className="mb-6 w-72">
        <label className="block text-sm mb-2 font-medium">언어 선택 / Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option>English</option>
          <option>Korean</option>
          <option>Japanese</option>
        </select>
      </div>

      {/* 소셜 로그인 */}
      <div className="w-72 space-y-3 mb-6">
        <button
          onClick={() => setLoginType("google")}
          className={`w-full border-2 rounded-lg py-2 text-sm flex items-center justify-center gap-2 ${
            loginType === "google"
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 hover:border-indigo-300"
          }`}
        >
          🔍 Google로 시작하기
        </button>

        <button
          onClick={() => setLoginType("apple")}
          className={`w-full border-2 rounded-lg py-2 text-sm flex items-center justify-center gap-2 ${
            loginType === "apple"
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 hover:border-indigo-300"
          }`}
        >
          🍎 Apple로 시작하기
        </button>

        <button
          onClick={() => setLoginType("normal")}
          className={`w-full border-2 rounded-lg py-2 text-sm flex items-center justify-center gap-2 ${
            loginType === "normal"
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 hover:border-indigo-300"
          }`}
        >
          💻 일반 로그인
        </button>
      </div>

      {/* 관심사 선택 */}
      <div className="w-72 mb-6">
        <p className="font-medium text-sm mb-2">관심사를 선택해주세요</p>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <button
              key={item}
              onClick={() => toggleInterest(item)}
              className={`px-3 py-1 text-sm rounded-full border transition ${
                selectedInterests.includes(item)
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "border-gray-300 hover:border-indigo-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <button
        onClick={handleStart}
        className="bg-gradient-to-r from-indigo-500 to-blue-400 text-white px-20 py-3 rounded-xl shadow hover:scale-105 transition"
      >
        시작하기
      </button>

      <p className="text-xs text-gray-400 mt-6">© 2025 NexusPick. All rights reserved.</p>
    </div>
  );
}

export default Login;
