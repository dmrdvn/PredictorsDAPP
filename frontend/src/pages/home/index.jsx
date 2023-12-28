import StickyHeader from "../../components/stickheader";
import Following from "./following";
import General from "./general";
import React, { useState, useEffect } from "react";
import Tab from "./../../components/tab";
export default function Home() {
  return (
    <>
      <StickyHeader title="Timeline" />

      <Tab
        activeTab="general"
        style={
          "bg-[#212f48]/[.50] z-0 border-solid border-t-2 border-[#2b3b58] rounded-b-lg"
        }
      >
        <Tab.Items>
          <Tab.Item id="general">General</Tab.Item>
          <Tab.Item id="following">Followings</Tab.Item>
        </Tab.Items>

        <Tab.Content id="general">
          <General />
        </Tab.Content>
        <Tab.Content id="following">
          <Following />
        </Tab.Content>
      </Tab>
    </>
  );
}
