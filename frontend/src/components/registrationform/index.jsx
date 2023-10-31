import React, { useState } from 'react';
import { registerUser } from './Web3Client';

function RegistrationForm() {
  const [fullName, setFullName] = useState('');

  const handleRegistration = async () => {
    try {
      await registerUser(fullName);
      // Kayıt başarılı oldu
    } catch (error) {
      console.error(error);
      // Kayıt sırasında hata oluştu
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Adınızı Girin"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <button onClick={handleRegistration}>Kayıt Ol</button>
    </div>
  );
}

export default RegistrationForm;
