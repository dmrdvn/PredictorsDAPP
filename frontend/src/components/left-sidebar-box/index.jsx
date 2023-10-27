import { BsSun } from 'react-icons/bs';
import { CiDark } from 'react-icons/ci';
export default function LeftSidebarBox() {
    return (
         
        <div className="bg-[#0f172a] font-medium text-sm  w-full rounded-[0.375rem] mx-auto">
           
            <div className="p-3 flex justify-between">
                <span>Bitcoin: </span>$35.000
            </div>

            <div className="p-3 flex justify-between items-center">
                <span>Theme: </span>
                <div className="space-x-1 flex gap-1">
                        <button className="btn btn-sm rounded-full bg-[#eef3f41a] btn-circle btn-ghost tooltip tooltip-top p-2" data-for="Light" data-tip="Light Theme">
                            <BsSun /><span className="sr-only">Light</span>
                        </button>

                        <button className="btn btn-sm rounded-full btn-circle btn-active tooltip tooltip-top p-2" data-for="" data-tip="Dark Theme">
                             <CiDark /> <span className="sr-only">Dark</span>
                        </button>
                </div>
            </div>
            
            
        </div>
    )
}