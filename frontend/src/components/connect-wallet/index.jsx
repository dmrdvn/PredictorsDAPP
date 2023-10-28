import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background:'#192435',
      width: '700px',
      padding: '40px',
    },
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement('#root');
  

export default function ConnectWallet() {

let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //Modal açıldıktan sonra yapılacak işlemler
  }

  function closeModal() {
    setIsOpen(false);
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
            
                <h2 className='flex justify-center text-[white] '>Cüzdanını Bağla</h2>
                <p className='flex justify-center text-[white]/[.60] mb-4'>Lütfen bir EVM cüzdanı bağlayınız.</p>

                
                <div className='flex w-full gap-3'>
                    <a href="" className='w-[50%] h-[150px] bg-[#eef3f41a] rounded-[0.375rem] flex justify-center items-center'>
                        <img src="./metamask.svg" alt="" className='w-[75px]'/>
                    </a>

                    <a href="" className='w-[50%] h-[150px] bg-[#eef3f41a] rounded-[0.375rem] flex justify-center items-center'>
                        <img src="./walletconnect.png" alt="" className='w-[75px]'/>
                    </a>
                    
                    
                </div>
                
                

            </Modal>
        </div>
    </div>

    
    )
}