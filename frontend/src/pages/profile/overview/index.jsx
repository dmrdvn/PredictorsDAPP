import React from "react";
import Card from "../../../components/card";
import { weiToEth, unixFormat } from "../../../utils/format";

const Overview = ({ postCount, posts }) => {
  return (
    <div>
      <Card
        styles={
          "relative w-full bg-[#212f48] border-solid text-white/[.60] mt-5 px-5 pt-12 pb-5 rounded-lg "
        }
      >
        <span className="absolute bg-[#212f48] px-2 py-[2px] rounded left-3 text-xs top-[10px] border border-[white] border-[1px]">
          My Predictions ( {postCount} )
        </span>
        <div>
          <table className="w-full  border border-gray-300">
            <thead className="">
              <tr>
                <th className="py-2 px-1 border-b text-xs">ID</th>
                <th className="py-2 px-4 border-b text-xs">Description</th>
                <th className="py-2 px-4 border-b text-xs">Post Bet</th>
                <th className="py-2 px-4 border-b text-xs">Participants</th>
                <th className="py-2 px-4 border-b text-xs">Bet Pool</th>
                <th className="py-2 px-4 border-b text-xs">Start Date</th>
                <th className="py-2 px-4 border-b text-xs">End Date</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-xs">{post[0]}</td> {/* id */}
                  <td className="py-2 px-4 text-xs">
                    {" "}
                    {/* desc */}
                    {String(post[1]).slice(0, 20)}..
                  </td>
                  <td className="py-2 px-4 text-xs">{weiToEth(post[2])}</td>{" "}
                  <td className="py-2 px-4 text-xs">
                    {String(post[5].length)}
                  </td>{" "}
                  <td className="py-2 px-4 text-xs">{weiToEth(post[6])}</td>{" "}
                  <td className="py-2 px-4 text-xs">
                    {unixFormat(post[3]).toLocaleString()}
                  </td>{" "}
                  <td className="py-2 px-4 text-xs">
                    {unixFormat(post[4]).toLocaleString()}
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card
        styles={
          "relative w-full bg-[#212f48] border-solid text-white/[.60] mt-5 px-5 py-7 rounded-lg"
        }
      >
        <span className="absolute bg-[#212f48] px-2 py-[2px] rounded left-3 text-xs top-[-10px] border border-[white] border-[1px]">
          My Predictions
        </span>
        Lorem Ipsum, kısaca Lipsum, masaüstü yayıncılık ve basın yayın
        sektöründe kullanılan taklit yazı bloğu olarak tanımlanır. Lipsum,
        oluşturulacak şablon ve taslaklarda içerik yerine geçerek yazı bloğunu
        doldurmak için kullanılır
      </Card>

      <Card
        styles={
          "relative w-full bg-[#212f48] border-solid text-white/[.60] mt-5 px-5 pt-10 pb-5 rounded-lg "
        }
      >
        <span className="absolute bg-[#D9277D] px-2 py-[1px] rounded-full left-3 text-xs top-[10px]">
          Badges
        </span>
        Lorem Ipsum, kısaca Lipsum, masaüstü yayıncılık ve basın yayın
        sektöründe kullanılan taklit yazı bloğu olarak tanımlanır. Lipsum,
        oluşturulacak şablon ve taslaklarda içerik yerine geçerek yazı bloğunu
        doldurmak için kullanılır
      </Card>

      <Card
        styles={
          "relative w-full bg-[#212f48] border-solid text-white/[.60] mt-5 px-5 py-7 rounded-lg "
        }
      >
        <span className="absolute bg-[#D9277D] px-2 py-[1px] rounded-full left-3 text-xs top-[-5px]">
          Badges
        </span>
        Lorem Ipsum, kısaca Lipsum, masaüstü yayıncılık ve basın yayın
        sektöründe kullanılan taklit yazı bloğu olarak tanımlanır. Lipsum,
        oluşturulacak şablon ve taslaklarda içerik yerine geçerek yazı bloğunu
        doldurmak için kullanılır
      </Card>

      <Card
        styles={
          "relative w-full bg-[#212f48] border-solid text-white/[.60] mt-5 px-5 pt-12 pb-5 rounded-lg "
        }
      >
        <span className="absolute bg-[#DB604C] px-2 py-[2px] rounded  top-[10px] left-3 text-xs ">
          My Predictions
        </span>
        Lorem Ipsum, kısaca Lipsum, masaüstü yayıncılık ve basın yayın
        sektöründe kullanılan taklit yazı bloğu olarak tanımlanır. Lipsum,
        oluşturulacak şablon ve taslaklarda içerik yerine geçerek yazı bloğunu
        doldurmak için kullanılır
      </Card>

      <Card
        styles={
          "relative w-full bg-[#212f48] border-solid text-white/[.60] mt-5 px-5 py-7 rounded-lg "
        }
      >
        <span className="absolute bg-[#27D9B6] px-2 py-[1px] rounded-full left-3 text-xs top-[-5px] text-black">
          Followers
        </span>
        Lorem Ipsum, kısaca Lipsum, masaüstü yayıncılık ve basın yayın
        sektöründe kullanılan taklit yazı bloğu olarak tanımlanır. Lipsum,
        oluşturulacak şablon ve taslaklarda içerik yerine geçerek yazı bloğunu
        doldurmak için kullanılır
      </Card>
    </div>
  );
};

export default Overview;
