export default function postTrustPoint(postDatas) {
    // Verilen kriterlere göre puanları hesapla
    let puan = postDatas.dogrulanmisProfil ? 20 : 0; // Doğrulanmış profil ise 20 puan, değilse 0 puan
    puan += postDatas.katilimciSayisi; // Katılımcı sayısı kadar puan
    puan += postDatas.begenenSayisi;  // Beğenen sayısı kadar puan
    puan += postDatas.yorumSayisi * 2; // Yorum sayısı kadar 2 katı puan

    // Güvenilirlik puanına göre kategoriye karar ver
    if (puan >= 0 && puan <= 30) {
        return <p className="text-[white]/[.20]">Düşük <span className="">({puan})</span></p>;
    } else if (puan > 30 && puan <= 50) {
        return <p className="text-[white]/[.70]">Orta <span className="t">({puan})</span></p>;
    } else if (puan > 50 && puan <= 100) {
        return <p className="text-[white]/[1]">Yüksek <span className="te">({puan})</span></p>;
    } else if (puan > 100) {
        return <p className="text-[white]/[1]">Yüksek <span className="te">(100)</span></p>;
    }

    return "Geçersiz Puan";
}

/* // Örnek kullanım
const dogrulanmisProfil = true;
const katilimciSayisi = 10;
const begenenSayisi = 40;
const yorumSayisi = 5;

const guvenilirlikKategorisi = hesaplaGuvenilirlikPuani(dogrulanmisProfil, katilimciSayisi, begenenSayisi, yorumSayisi);
console.log("Güvenilirlik Kategorisi: " + guvenilirlikKategorisi); */
