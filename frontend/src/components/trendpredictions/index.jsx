import { topics } from "../../utils/consts";
import Topic from "../topic";

export default function TrendPredictions() {
    return (
        <section className="bg-[#eef3f41a] mx-3 my-4 py-3 px-4 rounded-[0.375rem] ">
            <h5 className="text-md leading-6 font-bold flex items-center my-2">Şuanda Trend Kehanetler</h5>
            <div className="grid">
                {topics.map((topic, index) => <Topic item={topic} key={index} /> )}
            </div>
        </section>
    )
}