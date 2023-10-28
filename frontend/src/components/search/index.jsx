
export default function Search() {
    return (
        <div className="min-h-[30px] mt-3 h-[50px] flex items-center p-3">
            <label className="h-[43px] rounded-full bg-[#0f172a] w-full group border border-transparent focus-within:bg-[#eef3f41a] flex justify-between">
                <div className="flex items-center justify-center ml-3">
                     <img src={process.env.PUBLIC_URL + '/search.png'} alt="logo" width={20}/>
                </div>
                <input type="text" placeholder="Kahin veya bir kehanet ara.." className="w-full h-full bg-transparent rounded-full outline-none pl-[10px]" />
            </label>
        </div>
    )
}