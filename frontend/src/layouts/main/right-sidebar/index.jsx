import BuyWeb3 from "../../../components/buyweb3";
import Search from "../../../components/search";
import TrendPredictions from "../../../components/trendpredictions";

export default function RightSideBar() {
  return (
    <aside className="w-[300px] z-[0] sticky max-h-screen h-full  rounded-lg top-5 right-5 bg-[#212f48]">
      <Search />
      <BuyWeb3 />
      <TrendPredictions />
    </aside>
  );
}
