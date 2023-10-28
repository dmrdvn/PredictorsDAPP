import { BsSun } from 'react-icons/bs';
import { CiDark } from 'react-icons/ci';
import { FaBtc } from 'react-icons/fa';
import { FaEthereum } from 'react-icons/fa';
export default function LeftSidebarBox() {
    return (
         
        <div className="bg-[#0f172a] w-full rounded-[0.375rem]">
           
            <div className='font-medium text-sm'>
                <div className="p-3 flex justify-between flex-col">
                    <div className='flex items-center gap-1'><FaBtc/><span>Bitcoin : $33.750 </span></div>
                    <div className='flex items-center gap-1'><FaEthereum/><span>Etherium : $1.780</span></div>
                </div>
                <hr className="border-[#192435]" />
                <div className="p-3 flex justify-between items-center">
                    <span>Theme: </span>
                    <div className="space-x-1 flex gap-1">
                            <button className="btn btn-sm rounded-full bg-[#eef3f41a] btn-circle btn-active tooltip tooltip-top p-2" data-for="Dark" data-tip="Dark Theme">
                                <CiDark /> <span className="sr-only">Dark</span>
                            </button>
                            
                            
                            <button className="btn btn-sm rounded-full  btn-circle btn-ghost tooltip tooltip-top p-2" data-for="Light" data-tip="Light Theme">
                                <BsSun /><span className="sr-only">Light</span>
                            </button>

                            
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}