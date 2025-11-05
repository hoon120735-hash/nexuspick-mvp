import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [ratingAvg, setRatingAvg] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !poster) {
      alert("제목과 포스터를 입력해주세요!");
      return;
    }

    setUploading(true);
    try {
      // 🔹 이미지 업로드
      const storageRef = ref(storage, `posters/${poster.name}`);
      await uploadBytes(storageRef, poster);
      const posterUrl = await getDownloadURL(storageRef);

      // 🔹 Firestore에 영화 정보 저장
      await addDoc(collection(db, "movies"), {
        title,
        director,
        year,
        genre,
        ratingAvg: parseFloat(ratingAvg),
        description,
        posterUrl,
      });

      setSuccess(true);
      alert("영화가 성공적으로 추가되었습니다!");
      setTitle("");
      setDirector("");
      setYear("");
      setGenre("");
      setRatingAvg("");
      setDescription("");
      setPoster(null);
    } catch (error) {
      console.error("영화 업로드 실패:", error);
      alert("업로드 실패: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎬 새 영화 추가</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="감독" value={director} onChange={(e) => setDirector(e.target.value)} />
        <input placeholder="개봉연도" value={year} onChange={(e) => setYear(e.target.value)} />
        <input placeholder="장르" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <input placeholder="평점" value={ratingAvg} onChange={(e) => setRatingAvg(e.target.value)} />
        <textarea placeholder="영화 설명" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setPoster(e.target.files[0])} />

        <button type="submit" disabled={uploading}>
          {uploading ? "업로드 중..." : "영화 등록"}
        </button>
      </form>

      {success && <p style={{ color: "green" }}>✅ 등록 완료!</p>}
    </div>
  );
}

export default AddMovie;
