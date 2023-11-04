import StickyHeader from "../../components/stickheader";
/* import Tab from "../../components/home-tab"; */
import General from "./general";
import React, {useState, useEffect} from 'react';

export default function Home() {

 
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

