import {Link} from 'react-router-dom';
export default function HeaderLogo() {
    
    return (
        <div className='flex items-center px-4 mb-6'>
            <Link to="/" className="w-full  mt-5 flex items-center justify-center">
                 <img alt="" className="" src="https://herasoft.com.tr/kahinler/kahinler-header-logo.svg"></img>
            </Link>
        </div>
    )
}