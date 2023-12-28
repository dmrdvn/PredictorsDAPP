import StickyHeader from "../../components/stickheader";
import React from "react";
import { useParams } from "react-router-dom";
import Tab from "./../../components/tab";
import lv1 from "../../assets/nfts/lv1predictor.png";
import Overview from "./overview";
import MyPredictions from "./mypredictions";
import Bagdes from "./badges";
import Followers from "./followers";
import Statics from "./statics";

function Profile() {
  const { userId } = useParams();

  return (
    <div className="">
      <StickyHeader title="My Profile" />

      <div className="px-5 py-5 flex flex-col gap-3">
        <div
          id="cover"
          className="relative"
          style={{
            backgroundImage:
              'url("https://www.brandingmag.com/wp-content/uploads/2021/06/Brett_Rakestraw_001_COVER.jpg")',
            height: "250px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0.375rem",
          }}
        >
          <h1 id="id" className="absolute top-0 left-0 p-3 text-xs">
            User ID: #1
          </h1>

          <div className="absolute bottom-3 left-3 flex justify-end items-center gap-3">
            <div>
              <img
                id="profile"
                src="https://placehold.co/400" // Profil fotoğrafının gerçek URL'sini buraya ekleyin
                alt="Profile"
                className=" rounded-full h-24 w-24 object-cover border-4 border-white" // Profil fotoğrafı için uygun sınıfları ekleyin
              />
            </div>
            <div className="flex flex-col opacity-70">
              <p className="text-sm opacity-70">Hasan Demirdöven</p>
              <p className="text-sm opacity-70">
                0xBa2dB1ab7510dDfCB34f7121a685611f81428894
              </p>
              <p className="text-sm">25.12.2023 22:04:00</p>
            </div>
          </div>

          <div id="actions" className="absolute bottom-3 right-3 flex gap-3">
            <button className="bg-[green]/[.90]  text-white rounded-lg px-5 py-2 text-xs">
              Send Message
            </button>
            <button className="bg-[red]/[.70]  text-white rounded-lg px-5 py-2 text-xs">
              Follow
            </button>
          </div>
        </div>

        <Tab
          activeTab="overview"
          style={"bg-[#212f48]/[.50] z-0 border-solid  rounded-lg"}
        >
          <Tab.Items>
            <Tab.Item id="overview">Overview</Tab.Item>
            <Tab.Item id="predicitons">Predictions</Tab.Item>
            <Tab.Item id="badges">Badges</Tab.Item>
            <Tab.Item id="followers">Followers</Tab.Item>
            <Tab.Item id="statistics">Statics</Tab.Item>
          </Tab.Items>

          <Tab.Content id="overview">
            <Overview />
          </Tab.Content>
          <Tab.Content id="predicitons">
            <MyPredictions />
          </Tab.Content>
          <Tab.Content id="badges">
            <Bagdes />
          </Tab.Content>
          <Tab.Content id="followers">
            <Followers />
          </Tab.Content>
          <Tab.Content id="statistics">
            <Statics />
          </Tab.Content>
        </Tab>
      </div>
    </div>
  );
}

export default Profile;
