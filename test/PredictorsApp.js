const Web3 = require('web3');
const web3 = new Web3('https://bsc-dataseed.binance.org/');

const PredictorsApp = artifacts.require("PredictorsApp");
const SIDE = {
  LEFT: 0,
  RIGHT: 1
}

contract('PredictorsApp', (accounts) => {
  let predictorsApp; 
  const [user1, user2] = accounts; 
  
  before(async () => {
    predictorsApp = await PredictorsApp.deployed();
  });

  it("should deploy the PredictorsApp contract", async () => {
    assert(predictorsApp.address, "PredictorsApp contract not deployed");
  });

  it("should register a user", async () => {
    const testName = "John Doe";
    const userCountBefore = await predictorsApp.userCount(); //Başlangıçtaki ID değeri
    
    await predictorsApp.registerUser(testName, { from: user1 }); //0. wallet ile kayıt oluşturuldu.
    const registeredUser = await predictorsApp.users(user1); //0. wallet'ın bilgilerini registeredUser'a atadık.

    const userCountAfter = await predictorsApp.userCount(); //Kayıttan sonraki ID değeri
    
    //Önceki ID değeri sonraki ID değerinden 1 fazla olmalı.
    assert.equal( userCountAfter.toString(), (userCountBefore.toNumber() + 1).toString(), "User registration failed");
    
    //Mapping'deki 0.adresin adı ile testName aynı olmalı. 
    assert.strictEqual(registeredUser.fullName, testName, "Full name does not match");
    assert.equal(registeredUser.balance, 0, "Balance does not match");
    assert.equal(registeredUser.walletAddress, user1, "Wallet address does not match");
  });
  
  it("should create a post", async () => {

    const postContent = "This is a test post"; // Test Content
    //const postBet = web3.utils.toBN("0.1", "bnb");
    const postBet = web3.utils.toWei("0.0001", "bnb");
    const postEndDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const side = SIDE.LEFT; 
    
    const postCountBefore = await predictorsApp.postCount(); //Postu oluşturmadan önceki ID değeri  
    await predictorsApp.createPost(postContent, postBet, postEndDate, side, { from: user1 }); //Post oluştu
    const postCountAfter = await predictorsApp.postCount();//Postu oluşturduktan sonraki ID değeri

    const postId = postCountAfter.toNumber();
    const post = await predictorsApp.posts(postId); //1. postun bilgilerini aldık
    const initialParticipants = []; //İlk katılımcıları tutan array
    initialParticipants.push(user1); // İlk katılımcılara user1'i ekledik.
    
    /* Hata Kontrolleri */
    assert.equal(postCountAfter.toString(), (postCountBefore.toNumber() + 1).toString(), "Post ID should be 1");
    assert.equal(post.postContent, postContent, "Post content should match");
    assert.equal(post.postBet, postBet, "Post bet should match");
    assert.equal(post.postEndDate, postEndDate, "Post end date should match");
    assert.equal(post.postDate > 0, true, "Post creation date should be set");
    assert.equal(initialParticipants.length, 1, "Number of participants should be 1"); //*Daha sonra geliştirilecek
    assert.equal(initialParticipants[0], user1, "User1 address should be in participants"); //*Daha sonra geliştirilecek
    assert.equal(post.postBetPool, postBet, "Bet pool should match");
    assert.equal(post.postFinished, false, "Post should not be finished");
    
  }); 

   it("should allow a user to participate in a post", async () => {
 
    /* Post Oluşturma */
    const postContent = "This is a test post"; // Test Content
    //const postBet = web3.utils.toBN("0.1", "bnb");
    const postBet = web3.utils.toWei("0.0001", "bnb");
    const postEndDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const side = SIDE.LEFT; 
    
    const postCountBefore = await predictorsApp.postCount(); //Postu oluşturmadan önceki ID değeri  
    await predictorsApp.createPost(postContent, postBet, postEndDate, side, { from: user1 }); //Post oluştu
    const postCountAfter = await predictorsApp.postCount();//Postu oluşturduktan sonraki ID değeri

    const postId = postCountAfter.toNumber();
    const post = await predictorsApp.posts(postId); //1. postun bilgilerini aldık
    const initialParticipants = []; //İlk katılımcıları tutan array
    initialParticipants.push(user1); // İlk katılımcılara user1'i ekledik.
    initialParticipants.push(user2); // İlk katılımcılara user1'i ekledik.
    
    /* Kullanıcının Posta Katılması */
    const user2Bet = web3.utils.toWei("0.0001", "ether");
    const user2Side = SIDE.RIGHT;
    
    const user1BetPoolBefore = await predictorsApp.topBetsForSide(side); 
    const user2BetAmountBefore = await predictorsApp.betAmountByUser(user2, side); 
    await predictorsApp.participateInPost(postId, user2Bet, user2Side, { from: user2 }); //Posta user2 tarafından katılım sağlandı  
    const user1BetPoolAfter = await predictorsApp.topBetsForSide(side);//Postun user2 nin katılımından sonraki bet havuzu
    const user2BetAmountAfter = await predictorsApp.betAmountByUser(user2, side);//User2'nin katılımdan sonraki yaptığı bet miktarı
  
    /* Hata Kontrolleri */
    assert.equal(postCountAfter.toString(), (postCountBefore.toNumber() + 1).toString(), "Post ID should be 1");
    assert.equal(initialParticipants.length, 2, "Number of participants should be 2"); //*Daha sonra geliştirilecek
    assert.equal(initialParticipants[0], user1, "User1 address should be in participants"); //*Daha sonra geliştirilecek
    assert.equal(initialParticipants[1], user2, "User1 address should be in participants"); //*Daha sonra geliştirilecek
    assert.equal(post.postBetPool, postBet, "Bet pool should match");
    assert.equal(post.postBet, postBet, "Post bet should match");
  });

  it("should report the result of a post", async () => {
    /* Post Oluşturma (Kullanıcı 1 oluşturdu) */
    const postContent = "This is a test post"; // Test Content
    //const postBet = web3.utils.toBN("0.1", "bnb");
    const postBet = web3.utils.toWei("0.0001", "ether");
    const postEndDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const side = SIDE.LEFT; 
    
    const postCountBefore = await predictorsApp.postCount(); //Postu oluşturmadan önceki ID değeri  
    await predictorsApp.createPost(postContent, postBet, postEndDate, side, { from: user1 }); //Post oluştu
    const postCountAfter = await predictorsApp.postCount();//Postu oluşturduktan sonraki ID değeri

    const postId = postCountAfter.toNumber();
    const post = await predictorsApp.posts(postId); //1. postun bilgilerini aldık
    const initialParticipants = []; //İlk katılımcıları tutan array
    initialParticipants.push(user1); // İlk katılımcılara user1'i ekledik.
    initialParticipants.push(user2); // İlk katılımcılara user1'i ekledik.

    /* Kullanıcının Posta Katılması (Kullanıcı 2 kehanete katıldı) */
    const user2Bet = web3.utils.toWei("0.0001", "ether");
    const user2Side = SIDE.RIGHT;
    
    const user1BetPoolBefore = await predictorsApp.topBetsForSide(side); 
    const user2BetAmountBefore = await predictorsApp.betAmountByUser(user2, side); 
    await predictorsApp.participateInPost(postId, user2Bet, user2Side, { from: user2 }); //Posta user2 tarafından katılım sağlandı  
    const user1BetPoolAfter = await predictorsApp.topBetsForSide(side);//Postun user2 nin katılımından sonraki bet havuzu
    const user2BetAmountAfter = await predictorsApp.betAmountByUser(user2, side);//User2'nin katılımdan sonraki yaptığı bet miktarı
  
    /* Kehanetin Sonuçlandırması */
    // Kazanan tarafı ve kaybeden tarafı belirliyoruz (örneğin, sol taraf kazandı)
    const winner = SIDE.LEFT;
    const loser = SIDE.RIGHT;
    
    await predictorsApp.postResults(postId, winner, loser, { from: user1 }); //Post user1 tarafından sonuçlandırıldı
  
    // Kullanıcı detaylarını alıyoruz
    const user1Details = await predictorsApp.users(user1); //User1'in detayları
    const user2Details = await predictorsApp.users(user2); //User2'nin detayları
   
    //Postun henüz bitmemiş olması gerekmekte
    assert.equal(post.postFinished, false, "Post should not be finished");  
  
    // Kullanıcı 1'in başarılı tahmin sayısı 1 olmalı
    assert.equal(user1Details.predictionSuccesful.toString(), "1", "User1's successful predictions should be 1");
  
    // Kullanıcı 2'nin başarılı tahmin sayısı artmamalı
    assert.equal(user2Details.predictionSuccesful.toString(), "0", "User2's successful predictions should be 0");
   
    assert(user1Details.balance > 0, "User1's balance should be greater than 0"); //Bakiye kontrolü
    assert.equal(user2Details.balance.toString(), "0", "User2's balance should be 0"); //Bakiye kontrolü
    
  });
  
 
});
