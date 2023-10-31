import StickyHeader from "../../components/stickheader";
/* import Tab from "../../components/home-tab"; */
import General from "./general";
import React, {useState, useEffect} from 'react';
import getBlockchain from './ethereum.js';
import {
    getUserAddress,
    registerUser,
    createPost,
    sonucuRaporla,
    login,
    getPostDetails,
    getUserDetails,
    getUserFullName,
    getPostByStatus
  } from "./Web3Client";
  // External exports
import { BiWalletAlt, BiTimeFive } from "react-icons/bi";
import { GiToken } from "react-icons/gi";
import Web3 from "web3";

export default function Home() {

    const [showModal, setShowModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [posts, setPosts] = useState([]);
    const [fullname, setFullname] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [userCredit, setUserCredit] = useState("0");
    const [due, setDue] = useState("0");
    const [isFinished, setIsFinished] = useState("Can Rent");
    const [rideMins, setRideMins] = useState("0");
    const emptyAddress = "0x0000000000000000000000000000000000000000";
    const owner = "0xBa2dB1ab7510dDfCB34f7121a685611f81428894";

    useEffect(() => {
        const handleInit = async () => {
          let isAUser = await login();
          // If the user exists
          if (isAUser.address !== emptyAddress) {
            setLoggedIn(true); //login user
            // set user credits
            setUserCredit(
              Web3.utils.fromWei(String(isAUser.balance), "bnb").toString()
            );
            // set user due
            let userDue = Web3.utils.fromWei(String(isAUser.debt), "bnb").toString();
            setDue(userDue);
            // set user name
            setUserName(isAUser.name);
            // get the user address
            let address = await getUserAddress();
            // get the owner
            //let owner = await getOwner();
            // see if the user is the owner
            if (address === owner.toLowerCase()) {
              setIsAdmin(true);
            }
            // get posts
            let postArray = [];
            let postsByStatus = await getPostByStatus(2);
            postArray.push(...postsByStatus);
            
            if(isAUser.rentedCarId !== "0") {
              const userCar = await getCar(Number(isAUser.rentedCarId));
              carArray.push(userCar);
            }
            setCars(carArray);
            // update user status
            if (isAUser.rentedCarId !== "0") {
              let rentedCar = await getCar(isAUser.rentedCarId);
              setIsAvailable(`Rented ${rentedCar.name} - ${rentedCar.id}`);
            } else {
              console.warn(userDue);
              if (userDue !== "0") {
                setIsAvailable("Pay your due to rent again!");
              }
            }
            // adjust ride time
            let rideMins = "0";
            if (isAUser.rentedCarId !== "0") {
              rideMins = Math.floor((Math.floor(Date.now() / 1000) - isAUser.start) / 60).toString();
            }
            setRideMins(rideMins);
          }
        };
    
        handleInit();
      }, []);



    return (
        
        <div className=""> 
            <StickyHeader title="Anasayfa"/>
            a
            {/* <Tab>    
                <Tab.Items>
                        <Tab.Item id="genel">Genel</Tab.Item>
                        
                        <Tab.Item id="followings">Takip Edilenler</Tab.Item>
                    </Tab.Items>
                    
                    <Tab.Content>
                        <Tab.Content id="genel">
                            1.İçerik
                        </Tab.Content>

                        <Tab.Content id="followings">
                            2.İçerik
                        </Tab.Content>
                        
                    </Tab.Content>
            </Tab> */}

            <General/>

        </div>
    )
}

