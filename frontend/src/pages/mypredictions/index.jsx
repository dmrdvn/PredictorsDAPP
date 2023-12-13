import StickyHeader from "../../components/stickheader";
function MyPredictions() {
    return (
        <div>
            <StickyHeader title="My Predictions"/>
            <div className="px-5 py-5">
            <h2 className="text-center mt-10 text-[gray]/[.50]">Here will be all the predictions you posted.</h2>
            </div>
        </div>
    )
}

export default MyPredictions;