import React, { useState } from 'react';
import { createPost } from './Web3Client';

function PostCreationForm() {
  const [postContent, setPostContent] = useState('');
  const [postBet, setPostBet] = useState('');
  const [postEndDate, setPostEndDate] = useState('');
  const [side, setSide] = useState(''); // LEFT veya RIGHT

  const handlePostCreation = async () => {
    try {
      const betInWei = Web3.utils.toWei(postBet, 'ether'); // Eğer ether cinsinden bahis yapılıyorsa
      await createPost(postContent, betInWei, postEndDate, side);
      // Post oluşturma başarılı oldu
    } catch (error) {
      console.error(error);
      // Post oluştururken hata oluştu
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Post İçeriği"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bahis Miktarı"
        value={postBet}
        onChange={(e) => setPostBet(e.target.value)}
      />
      <input
        type="text"
        placeholder="Son Tarih"
        value={postEndDate}
        onChange={(e) => setPostEndDate(e.target.value)}
      />
      <select value={side} onChange={(e) => setSide(e.target.value)}>
        <option value="LEFT">Sol</option>
        <option value="RIGHT">Sağ</option>
      </select>
      <button onClick={handlePostCreation}>Post Oluştur</button>
    </div>
  );
}

export default PostCreationForm;
