import {AiOutlineComment,AiOutlineShareAlt} from 'react-icons/ai'
import {FaEthereum} from 'react-icons/fa'
import {VscWorkspaceTrusted} from 'react-icons/vsc'
import React, { useEffect, useState } from 'react';
import { dateFormat } from "../../utils/format";
import postTrustPoint from '../../utils/post-trust-point';


export default function Post({post}){

    //Post Status Datas
    const postDatas = {
        dogrulanmisProfil: post.account.isVerified,
        katilimciSayisi: post.prediction.participants,
        begenenSayisi: post.stats.trust,
        yorumSayisi: post.stats.comments,
    };

    //Date İşlemleri
    const startDate = new Date(post.prediction.startOfTime); // Başlangıç tarihi
    const endDate = new Date(post.prediction.endOfTime);   // Bitiş tarihi
    const [leftDays, setLeftDays] = useState(calculateTimeLeft());
    const [progress, setProgress] = useState(0);

    function calculateTimeLeft() {
        const currentTime = new Date();
        const timeDifference = endDate - currentTime;
        if (timeDifference <= 0) {
          return 'Kehanetin sonucu bekleniyor..';
          
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        if (days >= 1) {
            return `${days} gün`;
          } else if (hours >= 1) {
            return `${hours} saat`;
          } else if (minutes >= 1) {
            return `${minutes} dakika`;
          } else {
            return `${seconds} saniye`;
          }

    }


    useEffect(() => {
        const interval = setInterval(() => {
          const newLeftTime = calculateTimeLeft();
          setLeftDays(newLeftTime);
    
          if (newLeftTime === 'Kehanetin sonucu bekleniyor..') {
            clearInterval(interval);
          } else {
            // İlerleme yüzdesini hesapla
            const currentTime = new Date();
            const totalTimeInMilliseconds = endDate - startDate;
            const elapsedTime = currentTime - startDate;
            const newProgress = (elapsedTime / totalTimeInMilliseconds) * 100;
            setProgress(newProgress);
          }
        }, 1000);
    
        return () => clearInterval(interval);
      }, [endDate]);
    

    return ( 
        
        <div className="relative  bg-[#eef3f41a]  rounded-[0.375rem]  flex flex-col justify-start items-start mb-10" >
            
            {/* <div className='absolute  h-5 z-1 top-2 right-5  bg-transparent text-[8px] flex justify-end items-center gap-2'>
                <div className='p-1.5 bg-black rounded-[0.375rem]'>Başlangıç: {dateFormat(startDate)}</div> -
                <div className='p-1.5 bg-black rounded-[0.375rem]'>Bitiş: {dateFormat(endDate)}</div>
            </div> */}
           
            <div id="post-inner" className=" flex items-start px-5 py-10">

                {/* Fotoğraf Alanı */}
                <div id="photo" className="flex items-start">
                
                    <img src={post.account.avatar} className="w-12 h-12 rounded-full object-cover"/>
                </div>

                {/* Content Alanı */}
                <div id="content-area" className="relative ml-5 flex flex-col gap-2 justify-center items-start" >
                    <div id="" className="absolute w-[25px] h-[25px] bg-[#192435] -left-[calc(0.7%)] top-[calc(10%)] rotate-45 z-1"></div>
                    
                    {/* Kehanet İçeriği */}
                    <div className=" bg-[#192435] w-full p-4 overflow-hidden rounded-[0.375rem] z-0 flex flex-col ">

                            <div className=' text-[10px] text-[white]/[.50]'>Paylaşım Tarihi: {dateFormat(startDate)}</div>          
                            <h3>{post.content}</h3>
                    </div>
                    
                    {/* Kalan Süre Alanı */}
                    <div id="time" className="flex justify-center gap-5 items-center">
                        <div>Kalan Süre: {leftDays} </div>
                    </div>  
                </div>

            </div>
            
            {/* Kalan Süre Progress Bar */}
            <div className="w-full h-1  relative flex justify-start items-start">{/* Progress Bar */}
                <div className="h-full bg-[red] shadow-custom" style={{ width: `${progress}%` }}/>        
            </div>

            {/* Post Etkileşim Alanı */}
            <div id="post-action" className="flex justify-between w-full bg-[#192435] px-5 py-3  border-t-1 rounded-b-[0.375rem] text-[.8rem]">

                 {/* Action Butonları */}   
                <div id="interact-buttons" className="flex gap-5">
                    <a href="#" className="p-1 flex items-center gap-1 hover:text-[#f91880] hover:text-[18px]" title="Paylaş"><AiOutlineShareAlt /> <span className='text-[.9rem]'>{post.stats.share}</span></a>
                    <a href="#" className="p-1 flex items-center gap-1 hover:text-[#00ba7c] hover:text-[18px]" title="Yorum Yap"><AiOutlineComment/> <span className='text-[.9rem]'>{post.stats.comments}</span></a>
                    <a href="#" className="p-1 flex items-center gap-1 hover:text-[orange] hover:text-[18px]" title="Güvenilir"><VscWorkspaceTrusted/> <span className='text-[.9rem]'>{post.stats.trust}</span></a>
                </div>

                {/* Post Metadaları */}
                <div className="flex gap-4">
                    
                    <div className='flex items-center justify-center gap-1'>
                        Katılımcı Sayısı: 
                        <span className="p-1  bg-[#eef3f41a] rounded-[0.375rem]">{post.prediction.participants}</span>
                    </div>
                    
                    <div className='flex items-center justify-center gap-1'>
                        <p>Toplanan Bahis Tutarı:</p> 
                        <span className="p-1 pr-1.5 bg-[#eef3f41a] rounded-[0.375rem] flex items-center">
                            <FaEthereum/>{post.prediction.bets}
                        </span>
                    </div>

                    <div className='flex items-center justify-center gap-1'>
                      
                  
                        Güvenilirlik Puanı: 
                        <span className="p-1  bg-[#eef3f41a] rounded-[0.375rem]" title="Hesaplama => Web3 ID + Katılımcı Sayısı + Trust Sayısı + Yorum Sayısı ">{postTrustPoint({...postDatas})}</span>
                    </div>
                </div>               
            </div>  
        </div>
    )
}