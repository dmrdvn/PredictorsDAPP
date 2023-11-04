import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { init, registerUser,getUser,getOwner,getUserAddress, login } from '../../Web3Client';
import store from '../../store';
import { useSelector, useDispatch } from 'react-redux';



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

  alert(store.getState().auth.currentAccount.wallet)
  _addAccounts(store.getState().auth.currentAccount.wallet)
  
  const [modalIsOpen, setIsOpen] = React.useState(false); // Modal açık mı kapalı mı
  const [isRegistered, setIsRegistered] = useState(false); // Kayıt olundu mu olunmadı mı
  const [isOwner, setIsOwner] = useState(false); // Kayıt olundu mu olunmadı mı
  const [fullName, setFullName] = useState(''); 
  const [wallet, setWallet] = useState(''); 
  const emptyAddress = "0x0000000000000000000000000000000000000000";
  let handleInit;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // Modal açıldığında yapılacak işlemler
  }

  function closeModal() {
    setIsOpen(false);
  }

  /* useEffect(() => {
    
    

    handleInit();
  }, []); */

  handleInit = async () => {
    try {
      await login(); // MetaMask ile bağlanan kişinin wallet adresini aldık

      let user = await getUser(); // MetaMask ile bağlanan kişinin wallet adresini aldık
      

      if (user.walletAddress !== emptyAddress) { //Kullanıcı varsa

        setIsRegistered(true);
        setFullName(user.fullName);
        setWallet(user.walletAddress);
        alert("Wallet: "+user.walletAddress + " Name: "+user.fullName)

        /* //Cüzdanın sahipliğini kontrol ediyoruz. 1 Cüzdan mı diye
        let address = await getUserAddress(); // MetaMask ile bağlanan kişinin wallet adresini aldık
        let owner = await getOwner();
        if (address === owner.toLowerCase()) {
          setIsOwner(true);
      
      } else {
        setIsRegistered(false);
        setIsOpen(true);
      } */
      }else {
        alert("Cüzdan 0000")
      }

    }
    catch (error) {
      alert("birşeyler ters gitti")
      
      setIsOpen(true);
    }
  }



  const handleNameChange = (event) => {
    setFullName(event.target.value);
    console.log(fullName)
  };

  const register = () => {
    registerUser(fullName)
    setIsRegistered(true);
  }



    return(
    <div>
        <button className='flex gap-2 justify-center items-center p-3 bg-[#eef3f41a] rounded-[0.375rem]' onClick={handleInit}>

            <div><img src="./metamask.svg" width={20} alt="" /></div> 

            <div className="text-sm">{isRegistered ? fullName+'('+wallet+')' : 'Tilkiyle Bağlan' }</div>
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
                <h2 className='flex justify-left text-[white] '>
                  <div className='flex flex-col gap-3'>
                  <h3>Adınız: {fullName}</h3>
                  <h3>Adresiniz: {wallet}</h3>
                  </div>
                  
                </h2>) : (
                    
                    <div className='flex flex-col justify-center items-center'>
                      <input
                        type="text"
                        className='w-[70%] h-10 bg-transparent rounded-full px-5 outline-none border border-[white]'
                        placeholder="Adınızı Girin"
                        onChange={handleNameChange}
                     />
                        <button className='mt-5 bg-[#192435] border border-[white] border-1 px-2 py-2 hover:bg-[#f91880] rounded-[0.375rem]' onClick={() => {
                    register()}} >Kayıt Ol</button>
                        
                        

                    </div>
                )}
            
            </Modal>
        </div>

       
    </div>

    
    )
}