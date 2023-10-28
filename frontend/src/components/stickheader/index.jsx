import PropTypes from 'prop-types'
import ConnectWallet from '../connect-wallet'
export default function StickyHeader({title}) {
    return (
        <header className="sticky top-0 z-10 bg-[#0f172a]/[.70] backdrop-blur-md border-b border-[#4b4b4b]/[.60] flex justify-between items-center">
            <h3 className="px-5 h-[4rem] flex items-center font-bold">{title}</h3>
            <div className='px-5 h-[4rem] flex items-center font-bold'><ConnectWallet/></div>
        </header>
    )
}

StickyHeader.propTypes = {
    title: PropTypes.string.isRequired
}