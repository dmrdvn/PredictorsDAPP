import BuyWeb3 from "../../../components/buyweb3"
import Search from "../../../components/search"
import TrendPredictions from "../../../components/trendpredictions"

export default function RightSideBar() {
    return (
        <aside className="w-[300px] sticky max-h-screen top-0 bg-[#192435]">
            <Search />
            <BuyWeb3 />
            <TrendPredictions />
        </aside>
    )
}