import HeaderLogo from "../../../components/header-logo";
import LeftMenu from "../../../components/left-menu";
import LeftSidebarBox from "../../../components/left-sidebar-box";


export default function LeftSidebar() {
    return (
        <aside className="w-[225px] max-h-screen z-[2] top-0 sticky bg-[#192435] flex flex-col">
            <HeaderLogo />
            <LeftMenu />
            
            <div className="mt-auto bottom-0">
                <LeftSidebarBox />
            </div>
        </aside>
    )
}