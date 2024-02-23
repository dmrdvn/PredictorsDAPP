import { initializeApp } from "firebase/app";
import {
  getFirestore,
  Timestamp,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  increment,
  collection,
  query,
  where,
} from "firebase/firestore";

import { dateToUnix, getCurrentUnixTimestamp } from "../utils/format";
import { getPostCount, getUserAddress } from "../Web3Client";

const firebaseConfig = {
  apiKey: "AIzaSyAp9J18Bs6DwTTu1qwVSXoWpo2ixL-gZuM",
  authDomain: "predictors-ca2a1.firebaseapp.com",
  projectId: "predictors-ca2a1",
  storageBucket: "predictors-ca2a1.appspot.com",
  messagingSenderId: "251401885628",
  appId: "1:251401885628:web:4c1cb8470cddd8f7603db9",
  measurementId: "G-HLZHR7RZWV",
};

// Firebase'i başlatma
const app = initializeApp(firebaseConfig);
// Firestore bağlantısı
const db = getFirestore(app);

// Unix zaman damgasını alıp sadece tarih ve saati gösteren bir dizeye dönüştür
const getFBUnixTS = () => {
  const firebaseTimestamp = Timestamp.now();
  const unixTimestamp = firebaseTimestamp.toMillis() / 1000;

  return unixTimestamp;
};

//YENİ POST EKLE
// Yeni belge eklemek için işlev
const addNewPost = async (ref, postDescription, postBet, postEndDate) => {
  try {
    const user = await getUserAddress();
    const postCount = await getPostCount();

    // Yeni belgenin özel ID'sini oluştur
    const generateNewPostId = (postCount) => {
      return postCount + 1;
    };
    const newPostId = generateNewPostId(postCount);

    // Yeni belgeyi ekler

    await addDoc(ref, {
      id: Number(newPostId),
      postContent: postDescription,
      postBet: Number(postBet),
      postEndDate: dateToUnix(postEndDate),
      postCategory: "Kenahet",
      author: user,
      postDate: getCurrentUnixTimestamp(),
      postParticipants: [
        {
          wallet: user,
          side: "0",
          bet: Number(postBet),
        },
      ],

      postBetPool: Number(postBet),
      postFinished: false,
      trustCount: 0,
      comments: [],
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
/////////

//POST GÜNCELLEME  //post.id, user, side, postBet

const postParticipatation = async (id, user, side, postBet) => {
  try {
    // Kullanıcının yaptığı bahis bilgilerini Firebase verilerine ekleyin
    const ref = collection(db, "posts");
    const query = query(ref, where("id", "==", id.toString()));

    const result = await getDocs(query);

    /*  const postRef = doc(db, "posts", id); */
    await updateDoc(result, {
      postParticipants: arrayUnion({
        wallet: user.toString(),
        side: side.toString(),
        bet: Number(postBet),
      }),
      postBetPool: increment(Number(postBet)),
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export { db, getFBUnixTS, addNewPost, postParticipatation };
