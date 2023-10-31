import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { registerUser,getUser,getOwner } from '../../Web3Client';

const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background:'#192435',
      width: '500px',
      padding: '40px',
    },
  };


    Modal.setAppElement('#root');
  

export default function ConnectWallet() {

  
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Kullanıcının kayıtlı olup olmadığını izleyen durum
  const [fullName, setFullName] = useState('');
  const [userDetails, setUserDetails] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // Modal açıldığında yapılacak işlemler
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleRegistration = async () => {
    try {
      await registerUser(fullName);
      
      // Kayıt başarılı oldu
      setUserDetails(fullName)

    } catch (error) {
      console.error(error);
      // Kayıt sırasında hata oluştu
    }
  }


    return(
    <div>
        <button className='flex gap-2 justify-center items-center p-3 bg-[#eef3f41a] rounded-[0.375rem]' onClick={openModal}>

            <div><img src="./metamask.svg" width={20} alt="" /></div> 

            <div className="text-sm">Tilkiyle Bağlan</div>
        </button>

        <div className='relative'>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <button onClick={closeModal} className='absolute right-0 top-0 bg-[red] p-1 px-3 rounded-bl-[0.375rem]'>X</button>
               
               {isRegistered ? ( 
                <h2 className='flex justify-center text-[white] '>Cüzdanını Bağla</h2>) : (
                    
                    <div className='flex flex-col justify-center items-center'>
                      <input
                        type="text"
                        className='w-[70%] h-10 bg-transparent rounded-full px-5 outline-none border border-[white]'
                        placeholder="Adınızı Girin"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                     />
                        <button className='mt-5 bg-[#192435] border border-[white] border-1 px-2 py-2 hover:bg-[#f91880] rounded-[0.375rem]' onClick={handleRegistration}>Kayıt Ol</button>
                        
                        <h3>Adınız: {fullName}</h3>
                        <h3>Adresiniz: 0x00000</h3>

                    </div>
                )}
            
            </Modal>
        </div>
    </div>

    
    )
}