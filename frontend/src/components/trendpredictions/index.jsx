import { topics } from "../../utils/consts";
import Topic from "../topic";

export default function TrendPredictions() {
  return (
    <section className="bg-[#152033]/[.60] mx-2 my-4 py-5 px-4 rounded-[0.375rem] ">
      Trending Predictions Now
      <div className="grid mt-1">
        {topics.map((topic, index) => (
          <Topic item={topic} key={index} />
        ))}
      </div>
    </section>
  );
}
