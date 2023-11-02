const PredictorsApp = artifacts.require("PredictorsApp");
const SIDE = {
  LEFT: 0,
  RIGHT: 1
};


contract('PredictorsApp', (accounts) => {
  let predictorsApp;
  const [user1, user2, user3] = accounts;

  //Kontrat depoloy işlemi
  before(async () => {
    predictorsApp = await PredictorsApp.deployed();
  });

  describe('User Registration', () => {
    let userCountBefore;
    let testName1 = "Elon Musk";
    let testName2 = "Mark Zuckerberg";
    let testName3 = "Jeff Bezos";

    before(async () => {
      userCountBefore = await predictorsApp.userCount();
    });

    it("should deploy the PredictorsApp contract", () => {
      assert(predictorsApp.address, "PredictorsApp contract not deployed");
    });

    it("should register 1. user", async () => {
      await predictorsApp.registerUser(testName1, { from: user1 }); //Kullanıcı kaydetme işlemi
      const registeredUser1 = await predictorsApp.users(user1); //1.kullanıcıyı registerUser1 e atadık
      const userCountAfter = await predictorsApp.userCount();
      
      assert.equal(userCountAfter.toString(), (userCountBefore.toNumber() + 1).toString(), "User registration failed");
      assert.strictEqual(registeredUser1.fullName, testName1, "Full name does not match");
      assert.equal(registeredUser1.walletAddress, user1, "Wallet address does not match");
      console.log("=> 1st User Registered: ",registeredUser1.fullName+ " - Wallet Address: "+ registeredUser1.walletAddress);
    });

    /* it("should register 2. user", async () => {
      userCountBefore = await predictorsApp.userCount(); // userCountBefore'u tekrar alıyoruz
      await predictorsApp.registerUser(testName2, { from: user2 }); // 2. kullanıcıyı kaydetme işlemi
      const registeredUser2 = await predictorsApp.users(user2); // 2. kullanıcıyı registeredUser2'ye atadık
      const userCountAfter = await predictorsApp.userCount();
    
      assert.equal(userCountAfter.toString(), (userCountBefore.toNumber() + 1).toString(), "User2 registration failed");
      assert.strictEqual(registeredUser2.fullName, testName2, "Full name does not match");
      assert.equal(registeredUser2.walletAddress, user2, "Wallet address does not match");
      console.log("=> 2nd User Registered: ", registeredUser2.fullName + " - Wallet Address: " + registeredUser2.walletAddress);
    });
    it("should register 3. user", async () => {
      userCountBefore = await predictorsApp.userCount(); // userCountBefore'u tekrar alıyoruz
      await predictorsApp.registerUser(testName3, { from: user3 }); // 2. kullanıcıyı kaydetme işlemi
      const registeredUser3 = await predictorsApp.users(user3); // 2. kullanıcıyı registeredUser2'ye atadık
      const userCountAfter = await predictorsApp.userCount();
    
      assert.equal(userCountAfter.toString(), (userCountBefore.toNumber() + 1).toString(), "User3 registration failed");
      assert.strictEqual(registeredUser3.fullName, testName3, "Full name does not match");
      assert.equal(registeredUser3.walletAddress, user3, "Wallet address does not match");
      console.log("=> 3rd User Registered: ", registeredUser3.fullName + " - Wallet Address: " + registeredUser3.walletAddress);
    }); */
    



  });

  describe('Post Creation and Participate Another Posts', () => {
    let postCountBefore;
    const postContent1 = "Test post 1";
    const postContent2 = "Test post 2";
    const postBet1 = web3.utils.toWei("0.00001", "ether");
    const postBet2 = web3.utils.toWei("0.00003", "ether");
    const postEndDate1 = Math.floor(Date.now() / 1000) + 3600;
    const postEndDate2 = Math.floor(Date.now() / 2000) + 3600;
    const side1 = SIDE.LEFT;
    const side2 = SIDE.RIGHT;
    let postId;


    before(async () => {
      postCountBefore = await predictorsApp.postCount();
      //await predictorsApp.registerUser("User1", { from: user1 }); //User1 kullanıcıyı kaydettik
      //await predictorsApp.registerUser("User2", { from: user2 }); //User2 kullanıcıyı kaydettik
    });

    it("should create 1. post", async () => {
      await predictorsApp.createPost(postContent1, postBet1, postEndDate1, side1, { from: user1 }); //User1 post oluşturdu
      const postCountAfter = await predictorsApp.postCount();
      postId = postCountAfter.toNumber();
      const post1 = await predictorsApp.posts(postId); //1. postun bilgisini çektik
      const author = await predictorsApp.users(user1);
      

      assert.equal(postCountAfter.toString(), (postCountBefore.toNumber() + 1).toString(), "Post ID should be 1");
      assert.equal(post1.postContent, postContent1, "Post content should match");
      assert.equal(post1.postBet, postBet1, "Post bet should match");
      assert.equal(post1.postEndDate, postEndDate1, "Post end date should match");
      assert.equal(post1.postDate > 0, true, "Post creation date should be set");
      assert.equal(post1.postBetPool, postBet1, "Bet pool should match");
      assert.equal(post1.postFinished, false, "Post should not be finished");
      console.log("=> 1.Post:","(",author.fullName,")",
          post1.postContent, 
          " - Bet: ", post1.postBet.toString(),
          " - EndDate: ", post1.postEndDate.toString(),
          " - PostDate: ",post1.postDate.toString(),
          " - Pool: ",post1.postBetPool.toString()
      );
    });

    it("should create 2. post", async () => {
      postCountBefore = await predictorsApp.postCount(); // userCountBefore'u tekrar alıyoruz
      await predictorsApp.createPost(postContent2, postBet2, postEndDate2, side2, { from: user2 }); //User2 post oluşturdu
      const postCountAfter = await predictorsApp.postCount();
      postId = postCountAfter.toNumber();
      const post2 = await predictorsApp.posts(postId); //2.postun bilgisini çektik
      const author = await predictorsApp.users(user2);
      
      assert.equal(postCountAfter.toString(), (postCountBefore.toNumber() + 1).toString(), "Post ID should be 1");
      assert.equal(post2.postContent, postContent2, "Post content should match");
      assert.equal(post2.postBet, postBet2, "Post bet should match");
      assert.equal(post2.postEndDate, postEndDate2, "Post end date should match");
      assert.equal(post2.postDate > 0, true, "Post creation date should be set");
      assert.equal(post2.postBetPool, postBet2, "Bet pool should match");
      assert.equal(post2.postFinished, false, "Post should not be finished");
      
      console.log("=> 2.Post:","(",author.fullName,")",
          post2.postContent, 
          " - Bet: ", post2.postBet.toString(),
          " - EndDate: ", post2.postEndDate.toString(),
          " - PostDate: ",post2.postDate.toString(),
          " - Pool: ",post2.postBetPool.toString()
      );
    });

    it("should allow user2 to participate in post1", async () => {
      
      
      /* //////////////////////// */
      /* User1 Yeni Post Oluşturdu */
      /* //////////////////////// */
      const initialParticipants = []; //İlk katılımcıları tutan array
      const postContent = "This is a new post"; // Test İçeriği
      const postBet = web3.utils.toWei("0.00001", "ether");
      const postEndDate = Math.floor(Date.now() / 1000) + 3600; // 1 saat sonra
      const side = SIDE.LEFT; 
      await predictorsApp.createPost(postContent, postBet, postEndDate, side, { from: user1 }); //Post oluştu
      initialParticipants.push(user1); // İlk katılımcılara user1'i ekledik.
      
      
      const postId = await predictorsApp.postCount(); //Mevcut Post Count'ı çektik
      const post = await predictorsApp.posts(postId); //1. postun bilgilerini aldık
      
      /* //////////////////////// */
      /* User2 Post2 ye katıld */
      /* //////////////////////// */
      const user2Bet = web3.utils.toWei("0.00001", "ether");
      const user2Side = SIDE.RIGHT;
      
      const user1BetPoolBefore = post.postBetPool; //Postun bet havuzunu çektik
      const user2BetAmountBefore = await predictorsApp.betAmountByUser(user2, side); 
      await predictorsApp.participateInPost(postId, user2Bet, user2Side, { from: user2 }); //Posta user2 tarafından katılım sağlandı  
      initialParticipants.push(user2); // İlk katılımcılara user1'i ekledik.
      const user2BetAmountAfter = await predictorsApp.betAmountByUser(user2, side);//User2'nin katılımdan sonraki yaptığı bet miktarı
      const user1BetPoolAfter = post.postBetPool; //Postun bet havuzunu çektik
    
      /* Hata Kontrolleri */
      assert.equal(initialParticipants[0], user1, "User2 address should be in participants"); //*Daha sonra geliştirilecek
      assert.equal(initialParticipants[1], user2, "User2 address should be in participants"); //*Daha sonra geliştirilecek
      assert.equal(post.postBetPool, postBet, "Bet pool should match");
      assert.equal(post.postBet, postBet, "Post bet should match");
      assert.equal(user2BetAmountAfter.toNumber(), user2BetAmountBefore.toNumber() + user2BetAmountAfter, "User2's bet amount should be updated");

     
      console.log("=> Participated the post.",
      " - Bet Placed: ", user2Bet.toString(),
      " - Chosen Side: ", user2Side.toString(),
      );
       
    });
    
  });
 

  describe('Report Post Results', () => {
    let postCountBefore;
    const participants = []; //Katılımcıları tutan array
    let postId;

    before(async () => {
      /* Post oluşturduk ve Post sahibi katılım sağladı */
      const postContent = "Test post 1";
      const postBet = web3.utils.toWei("0.00001", "ether");
      const postEndDate = Math.floor(Date.now() / 1000) + 3600;
      const side = SIDE.LEFT;
      
      postCountBefore = await predictorsApp.postCount();
      await predictorsApp.createPost(postContent, postBet, postEndDate, side, { from: user1 }); //User1 post oluşturdu
      const postCountAfter = await predictorsApp.postCount();
      participants.push(user1); // Katılımcılara user1'i ekledik.
      
      postId = postCountAfter.toNumber();

      /* User2 Posta katılım sağladı */
      const user2Bet = web3.utils.toWei("0.00001", "ether");
      const user2Side = SIDE.RIGHT;
      await predictorsApp.participateInPost(postId, user2Bet, user2Side, { from: user2 }); //Posta user2 tarafından katılım sağlandı  
      participants.push(user2); // Katılımcılara user2'i ekledik.

      /* User3 Posta katılım sağladı */
      const user3Bet = web3.utils.toWei("0.00001", "ether");
      const user3Side = SIDE.LEFT;
      await predictorsApp.participateInPost(postId, user3Bet, user3Side, { from: user3 }); //Posta user2 tarafından katılım sağlandı  
      participants.push(user3); // Katılımcılara user2'i ekledik.
      
    });

    it("should report the result of a post", async () => {
      /* BU TEST-CASE GELİŞTİRİLMEYE DEVAM ETMEKTEDİR.. */
      
      // Post'un postFinished durumunu ayarladık
      const post = await predictorsApp.posts(postId);
      post.postFinished = true;
      
      const winner = SIDE.LEFT;
      const loser = SIDE.RIGHT;
    
      await predictorsApp.postResults(postId, winner,loser, { from: user1 });
       
      assert.equal(post.postFinished, true, "Post should be marked as finished");    
      assert.equal(participants.length, 3, "The number of user participating in the post must be 3");    
      
      console.log("Number of people participated",participants.length);
      console.log("=> The status of post number",postId,"is",post.postFinished ? "finished.": "continues.");

    }); 
  }); 
});
