import StickyHeader from "../../components/stickheader";
import Following from "./following";
import General from "./general";
import React, {useState, useEffect} from 'react';
import Tab from "./../../components/tab";
export default function Home() {

 
     return (
        
        <> 
        <StickyHeader title="Timeline"/>
            
       <Tab activeTab="general">
        <Tab.Items>
            <Tab.Item id="general">General</Tab.Item>
            <Tab.Item id="following">Followings</Tab.Item>
        </Tab.Items>

        <Tab.Content id="general">
            <General/>
        </Tab.Content>
        <Tab.Content id="following">
            <Following/>
        </Tab.Content>
            
       </Tab>
            

        </>
    )
}

