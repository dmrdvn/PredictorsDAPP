import HeaderLogo from "../../../components/header-logo";
import LeftMenu from "../../../components/left-menu";
import LeftSidebarBox from "../../../components/left-sidebar-box";

export default function LeftSidebar() {
  return (
    <aside className="w-[250px] z-[0] left-5 top-5 sticky h-full max-h-screen rounded-lg  bg-[#212f48]">
      <HeaderLogo />
      <LeftMenu />

      {/* <div className="mt-auto bottom-0 p-3">
                <LeftSidebarBox />
            </div> */}
    </aside>
  );
}
