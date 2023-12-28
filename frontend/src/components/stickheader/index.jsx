import PropTypes from 'prop-types'
import ConnectWallet from '../connect-wallet'
export default function StickyHeader({title}) {
    return (
        <header className="mt-5 z-10 bg-[#212f48] backdrop-blur-md border-b border-[#212f48]/[.60] flex justify-between items-center rounded-t-lg">
            <h3 className="px-5 h-[4rem] flex items-center font-bold">{title}</h3>
            <div className='px-5 h-[4rem] flex items-center font-bold'><ConnectWallet/></div>
        </header>
    )
}

StickyHeader.propTypes = {
    title: PropTypes.string.isRequired
}