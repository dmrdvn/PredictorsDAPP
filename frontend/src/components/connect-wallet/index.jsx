import Web3 from "web3";
import lv1 from "../../assets/nfts/lv1predictor.png";
import lv2 from "../../assets/nfts/lv2predictor.png";
import lv3 from "../../assets/nfts/lv3predictor.png";
import lv4 from "../../assets/nfts/lv4predictor.png";
import lv5 from "../../assets/nfts/lv5predictor.png";
import lv6 from "../../assets/nfts/lv6predictor.png";
import { MdVerified } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import React from "react";
import { NavLink } from "react-router-dom";
import { unixFormat } from "../../utils/format";
import Button from "../button";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { register, login } from "../../Web3Client";
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
    borderRadius: ".5rem",
  },
};
Modal.setAppElement("#root");

function ConnectWallet() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isUserInContract, setIsUserInContract] = useState(false);

  useEffect(() => {
    const handleInit = () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setLoggedIn(true);
          setIsUserInContract(true);
          setUser(parsedUser);
          setProfileImg();
        }
      } catch (error) {
        console.log(error);
      }
    };
    setUser(localStorage.getItem("user"));
    setProfileImg();

    handleInit();
  }, []);

  const connectWithWallet = async () => {
    if (!loggedIn) {
      try {
        let isAUser = await login();

        if (isAUser) {
          setLoggedIn(true);
          setUser(isAUser);

          setProfileImg();

          setIsUserInContract(true);
          localStorage.setItem("user", JSON.stringify(isAUser));
        } else {
          setIsUserInContract(false);
          setIsOpen(true);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoggedIn(true);
      setIsOpen(true);
    }
  };

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

  function setProfileImg() {
    let postCount = 10;

    if (postCount <= 3) {
      setAvatar(lv1);
    } else if (postCount > 3 && postCount <= 5) {
      setAvatar(lv2);
    } else if (postCount > 5 && postCount <= 10) {
      setAvatar(lv3);
    } else if (postCount > 10 && postCount <= 20) {
      setAvatar(lv4);
    } else if (postCount > 20 && postCount <= 30) {
      setAvatar(lv5);
    } else if (postCount > 30) {
      setAvatar(lv6);
    }
  }

  function disconnect() {
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser("");
    setIsUserInContract(false);
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
          onClick={connectWithWallet}
        >
          <div>
            <img src="./metamask.svg" width={20} alt="" />
          </div>

          <div className="text-sm">
            {loggedIn //
              ? user[1] + " (0x..." + String(user[3]).slice(-5) + ")"
              : "Connect with Wolf!"}
          </div>
        </button>
      </div>

      <div className="relative">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          contentLabel="Example Modal"
        >
          <button
            onClick={closeModal}
            className="absolute right-0 top-0 bg-[red] p-1 px-3 rounded-bl-[0.375rem]"
          >
            X
          </button>

          {loggedIn ? (
            <div className="flex flex-col justify-left text-[white] ">
              <div className="flex justify-left gap-5">
                <div className="relative">
                  <img src={avatar} width={140} alt="" />
                  <h3 className="absolute top-0 right-0 bg-[#2e3949] text-sm px-1 opacity-50">
                    #{user[0] && user[0]}
                  </h3>
                  {/*  <img src={lv1} width={140} alt="" /> */}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <h3 className="text-sm  bg-[#2e3949] p-1 rounded">
                      Full Name :
                    </h3>
                    <div className="flex ml-2">
                      {user[1] && user[1]}

                      <div className="flex items-center ml-1 ">
                        {user[5] ? (
                          <span className="flex items-center gap-1">
                            <MdVerified />
                            <p className="text-[0.80rem] text-[gray]">
                              {" "}
                              Verified
                            </p>
                          </span>
                        ) : (
                          <span className="flex gap-1 items-center">
                            <GoVerified />
                            <p className="text-[0.80rem] text-[gray] underline">
                              {" "}
                              Mint your Web ID
                            </p>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <h3 className="text-sm  bg-[#2e3949] p-1 rounded">
                      Address :
                    </h3>
                    <h3 className="flex ml-2">{user[3] && user[3]}</h3>
                  </div>

                  <div className="flex items-center">
                    <h3 className="text-sm  bg-[#2e3949] p-1 rounded">
                      Reward Balance :
                    </h3>
                    <h3 className="flex ml-2">{user[2] && user[2]}</h3>
                  </div>

                  <div className="flex items-center">
                    <h3 className="text-sm bg-[#2e3949] p-1 rounded">
                      Register Date :
                    </h3>
                    <h3 className="flex ml-2">
                      {user[4] && unixFormat(user[4]).toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-between gap-3">
                <div className="flex flex-col items-center justify-center">
                  Participated Predictions:{" "}
                  <span>
                    {user[6] && user[6].length !== 0 ? user[6].length : "0"}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  All Predictions:{" "}
                  <span>
                    {user[7] && user[7].length !== 0 ? user[7].length : "0"}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  Succesful Predictions:{" "}
                  <span>{user[8] && user[8] !== 0 ? user[8] : "0"}</span>
                </div>
              </div>

              <div className="mt-10 flex justify-center gap-3">
                <div className="flex flex-col items-center justify-center">
                  {login && <Button onClick={disconnect}>Disconnect</Button>}
                </div>

                <div className="flex flex-col items-center justify-center"></div>

                <NavLink
                  to={`/profile/${user[0]}`}
                  className="relative block group"
                >
                  {login && <Button>Go to Profile</Button>}
                </NavLink>
              </div>
            </div>
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
