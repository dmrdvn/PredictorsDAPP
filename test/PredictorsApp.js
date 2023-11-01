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
      assert.equal(registeredUser1.balance, 0, "Balance does not match");
      assert.equal(registeredUser1.walletAddress, user1, "Wallet address does not match");
      console.log("=> Kaydolan 1. Kullanıcı: ",registeredUser1.fullName+ " - Cüzdan Adresi: "+ registeredUser1.walletAddress);
    });

    it("should register 2. user", async () => {
      userCountBefore = await predictorsApp.userCount(); // userCountBefore'u tekrar alıyoruz
      await predictorsApp.registerUser(testName2, { from: user2 }); // 2. kullanıcıyı kaydetme işlemi
      const registeredUser2 = await predictorsApp.users(user2); // 2. kullanıcıyı registeredUser2'ye atadık
      const userCountAfter = await predictorsApp.userCount();
    
      assert.equal(userCountAfter.toString(), (userCountBefore.toNumber() + 1).toString(), "User2 registration failed");
      assert.strictEqual(registeredUser2.fullName, testName2, "Full name does not match");
      assert.equal(registeredUser2.balance, 0, "Balance does not match");
      assert.equal(registeredUser2.walletAddress, user2, "Wallet address does not match");
      console.log("=> Kaydolan 2. Kullanıcı: ", registeredUser2.fullName + " - Cüzdan Adresi: " + registeredUser2.walletAddress);
    });
    it("should register 3. user", async () => {
      userCountBefore = await predictorsApp.userCount(); // userCountBefore'u tekrar alıyoruz
      await predictorsApp.registerUser(testName3, { from: user3 }); // 2. kullanıcıyı kaydetme işlemi
      const registeredUser3 = await predictorsApp.users(user3); // 2. kullanıcıyı registeredUser2'ye atadık
      const userCountAfter = await predictorsApp.userCount();
    
      assert.equal(userCountAfter.toString(), (userCountBefore.toNumber() + 1).toString(), "User3 registration failed");
      assert.strictEqual(registeredUser3.fullName, testName3, "Full name does not match");
      assert.equal(registeredUser3.balance, 0, "Balance does not match");
      assert.equal(registeredUser3.walletAddress, user3, "Wallet address does not match");
      console.log("=> Kaydolan 3. Kullanıcı: ", registeredUser3.fullName + " - Cüzdan Adresi: " + registeredUser3.walletAddress);
    });
    



  });

  describe('Post Creation and Participate Another Posts', () => {
    let postCountBefore;
    const postContent1 = "Test post 1";
    const postContent2 = "Test post 2";
    const postBet1 = web3.utils.toWei("0.0001", "ether");
    const postBet2 = web3.utils.toWei("0.0003", "ether");
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
      

      /* User1 in yeni post oluşturması */
      const initialParticipants = []; //İlk katılımcıları tutan array
      const postContent = "This is a new post"; // Test Content
      const postBet = web3.utils.toWei("0.00001", "ether");
      const postEndDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const side = SIDE.LEFT; 
      await predictorsApp.createPost(postContent, postBet, postEndDate, side, { from: user1 }); //Post oluştu
      initialParticipants.push(user1); // İlk katılımcılara user1'i ekledik.
      
      
      const postId = await predictorsApp.postCount(); //Post Count'ı çektik
      //const postId = postCountAfter.toNumber(); //ToInt
      
      
      
      const post = await predictorsApp.posts(postId); //1. postun bilgilerini aldık
      
      
      /* User2 Post2 ye katılması */
      const user2Bet = web3.utils.toWei("0.0001", "ether");
      const user2Side = SIDE.RIGHT;
      
      const user1BetPoolBefore = await predictorsApp.topBetsForSide(side); 
      const user2BetAmountBefore = await predictorsApp.betAmountByUser(user2, side); 
      await predictorsApp.participateInPost(postId, user2Bet, user2Side, { from: user2 }); //Posta user2 tarafından katılım sağlandı  
      initialParticipants.push(user2); // İlk katılımcılara user1'i ekledik.
      const user1BetPoolAfter = await predictorsApp.topBetsForSide(side);//Postun user2 nin katılımından sonraki bet havuzu
      const user2BetAmountAfter = await predictorsApp.betAmountByUser(user2, side);//User2'nin katılımdan sonraki yaptığı bet miktarı
    
      
      /* Hata Kontrolleri */
    
    assert.equal(initialParticipants[0], user1, "User2 address should be in participants"); //*Daha sonra geliştirilecek
    assert.equal(initialParticipants[1], user2, "User2 address should be in participants"); //*Daha sonra geliştirilecek
    assert.equal(post.postBetPool, postBet, "Bet pool should match");
    assert.equal(post.postBet, postBet, "Post bet should match");
    


/* 
    
      assert.equal(
        sidePoolPoolAfter.toString(),
        (sidePoolPoolBefore.toNumber() + parseInt(user2Bet)).toString(),
        "Side pool should increase after participation"
      );
      
      assert.equal(user2.partipicatedPost.length, 1, "User2's number of another post participants should be 2"); //Post1 in katılımcıları 2 olmalı
      /* assert.equal(postCountAfter.toString(), (postCountBefore.toNumber() + 1).toString(), "Post ID should be 1");
      assert.equal(initialParticipants[0], user1, "User1 address should be in participants"); //*Daha sonra geliştirilecek
      assert.equal(initialParticipants[1], user2, "User1 address should be in participants"); //*Daha sonra geliştirilecek
      assert.equal(post.postBetPool, postBet, "Bet pool should match");
      assert.equal(post.postBet, postBet, "Post bet should match"); */
       
    });
    




  });
 
/*
  describe('Report Post Results', () => {
    const postContent = "This is a test post";
    const postBet = web3.utils.toWei("0.0001", "ether");
    const postEndDate = Math.floor(Date.now() / 1000) + 3600;
    const side = SIDE.LEFT;
    let postId;

    before(async () => {
      await predictorsApp.registerUser("User1", { from: user1 });
      await predictorsApp.registerUser("User2", { from: user2 });
      await predictorsApp.createPost(postContent, postBet, postEndDate, side, { from: user1 });
      postId = (await predictorsApp.postCount()).toNumber();
      await predictorsApp.participateInPost(postId, postBet, SIDE.RIGHT, { from: user2 });
    });

    it("should report the result of a post", async () => {
      const winner = SIDE.LEFT;
      const loser = SIDE.RIGHT;
      await predictorsApp.postResults(postId, winner, loser, { from: user1 });

      const post = await predictorsApp.posts(postId);
      const user1Details = await predictorsApp.users(user1);
      const user2Details = await predictorsApp.users(user2);

      assert.equal(post.postFinished, false, "Post should not be finished");
      assert.equal(user1Details.predictionSuccesful.toString(), "1", "User1's successful predictions should be 1");
      assert.equal(user2Details.predictionSuccesful.toString(), "0", "User2's successful predictions should be 0");
      assert(user1Details.balance > 0, "User1's balance should be greater than 0");
      assert.equal(user2Details.balance.toString(), "0", "User2's balance should be 0");
    });
  }); */
});
