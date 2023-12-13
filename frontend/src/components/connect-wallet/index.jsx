import Web3 from "web3";
import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { init,getUserAddress, register, getOwner, login } from "../../Web3Client";
// Assets

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#192435",
    width: "700px",
    padding: "40px",
  },
};
Modal.setAppElement("#root");

function ConnectWallet() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [init] = useState(false);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");

  const emptyAddress = "0x0000000000000000000000000000000000000000";

  useEffect(() => {
    const handleInit = async () => {
      console.log(init)
      try {
        let isAUser = await login();

        // If the user exists
        if (isAUser) {
          setLoggedIn(true);

          // set user
          setUser(isAUser);
          setName(isAUser.fullName);
          console.log(user);

          // get the user address
          let address = await getUserAddress();

          // get the owner
          let owner = await getOwner();

          // see if the user is the owner
        } else {
          setIsOpen(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleInit();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // Modal açıldığında yapılacak işlemler
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="flex gap-3">
        <button className="justify-center items-center p-3 bg-[#eef3f41a] rounded-[0.375rem]">
          <a href="https://testnet.bnbchain.org/faucet-smart" target="_blank">
            BNB Faucet
          </a>
        </button>

        <button
          className="flex gap-2 justify-center items-center p-3 bg-[#eef3f41a] rounded-[0.375rem]"
          onClick={() => setIsOpen(true)}
        >
          <div>
            <img src="./metamask.svg" width={20} alt="" />
          </div>

          <div className="text-sm">
            {loggedIn //
              ? name + " (0x..." + String(user.walletAddress).slice(-5) + ")"
              : "Tilkiyle Bağlan"}
          </div>
        </button>
      </div>

      <div className="relative">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            onClick={closeModal}
            className="absolute right-0 top-0 bg-[red] p-1 px-3 rounded-bl-[0.375rem]"
          >
            X
          </button>

          {loggedIn ? (
            <h2 className="flex justify-left text-[white] ">
              <div className="flex flex-col gap-3">
                <h3>User ID: {user.id && user.id}</h3>
                <h3>Full Name: {user.fullName && user.fullName}</h3>
                <h3>Balance: {user.balance && user.balance}</h3>
                <h3>
                  Wallet Address: {user.walletAddress && user.walletAddress}
                </h3>
                <h3>Register Date: {user.registerDate && user.registerDate}</h3>
                <h3>Is Verified: {user.isVerified && user.isVerified}</h3>
                <h3>
                  Participated Predictions:{" "}
                  {user.partipicatedPost && user.partipicatedPost}
                </h3>
                <h3>
                  All Predictions: {user.allPredictions && user.allPredictions}
                </h3>
                <h3>
                  Succesful Predictions:{" "}
                  {user.predictionSuccesful && user.predictionSuccesful}
                </h3>
              </div>
            </h2>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                className="w-[70%] h-10 bg-transparent rounded-full px-5 outline-none border border-[white]"
                placeholder="Your Full Name"
                onChange={handleNameChange}
              />
              <button
                className="mt-5 bg-[#192435] border border-[white] border-1 px-2 py-2 hover:bg-[#f91880] rounded-[0.375rem]"
                onClick={() => {
                  register(name);
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default ConnectWallet;
