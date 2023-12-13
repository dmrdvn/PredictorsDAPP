import Web3 from "web3";

export const numberFormat = (value) => Intl.NumberFormat("tr").format(value);

export const dateFormat = (value) => Intl.DateTimeFormat("tr").format(value);

export const unixFormat = (value) => {
  const date = new Date(parseInt(value) * 1000);
  return date;
};

export const formattedBet = (value) => {
  const formattedBet = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BNB", // Burada kullanılan para birimi simgesi isteğe bağlıdır
    minimumFractionDigits: 4, // Ethereum genellikle 18 ondalık basamağa kadar hassastır
  }).format(value / 10 ** 18); // 1 Ether = 10^18 Wei
  return formattedBet;
};

export const calculateTimeLeft = (value) => {
  const currentTime = new Date(); // Şu anki zamanı al
  const timestamp = currentTime.getTime(); // Şu anki zamanı milisaniye cinsinden al (timestamp)
  const timeDifference = value - timestamp; //endDate - currentTime
  if (timeDifference <= 0) {
    return "Kehanetin sonucu bekleniyor..";
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (days >= 1) {
    return `${days} gün ${hours} saat`;
  } else if (hours >= 1) {
    return `${hours} saat ${minutes} dakika`;
  } else if (minutes >= 1) {
    return `${minutes} dakika ${seconds} saniye`;
  } else {
    return `${seconds} saniye`;
  }
};
