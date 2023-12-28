import { Outlet } from "react-router-dom";
import LeftSidebar from "./left-sidebar";
import RightSideBar from "./right-sidebar";

export default function MainLayout() {
    return (
        <div className="w-[1440px] mx-auto flex"> 
            <LeftSidebar />
            
            {/* Body */}
            <main className="flex-1 flex flex-col gap-[30px] px-10">
                <main className="flex-1 max-w[915px]">
                    <Outlet />
                </main>    
            </main> 
            {/* Body End */} 

            <RightSideBar /> 
        </div>
        
    )
}