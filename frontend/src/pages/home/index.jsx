import StickyHeader from "../../components/stickheader";
/* import Tab from "../../components/home-tab"; */
import General from "./general";
import React, {useState, useEffect} from 'react';
import {getUserAddress, registerUser, createPost, login, getPostDetails, getUserDetails, getUserFullName, getPostByStatus, getOwner 
  } from "../../Web3Client";
import Web3 from "web3";

export default function Home() {

    const [showModal, setShowModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const emptyAddress = "0x0000000000000000000000000000000000000000";
    

    const [userAddress, setUserAddress] = useState('');
    const [owner, setOwner] = useState('');
    const [userDetails, setUserDetails] = useState('');
    const [userFullName, setUserFullName] = useState('');
    const [postDetails, setPostDetails] = useState('');
    const [status, setStatus] = useState('');
    const [newUserFullName, setNewUserFullName] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostBet, setNewPostBet] = useState('');
// Diğer state'leri ekleyin

    useEffect(() => {
        
      const handleInit = async () => { //Sayfa yüklendiğinde çalışacak fonksiyon
        const address = await getUserAddress(); //Kullanıcının adresini alıyoruz
        setUserAddress(address); //Kullanıcının adresini state'e atıyoruz
      };
      





      //fetchData();
      }, []);



    return (
        
        <div className=""> 
            <StickyHeader title="Anasayfa"/>
            
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

