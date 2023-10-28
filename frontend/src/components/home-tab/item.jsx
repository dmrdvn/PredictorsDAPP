//import {useTab} from './tab-context';
export default function Item( {children} ) {
    return (
        <button type="button" className="flex-auto text-center">
            
            <div className="h-[3rem] inline-flex items-center relative">
                {children}
                <div className="h-[4px] absolute bottom-0 left-0 w-full rounded-full bg-[black]"/>
            </div>
        </button>
    )
}