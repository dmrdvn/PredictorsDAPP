const PredictorsApp = artifacts.require("PredictorsApp"); // Akıllı sözleşmenizin adını buraya ekleyin

contract("PredictorsApp", accounts => {
  let predictorsApp; // Akıllı sözleşmenizi burada depolamak için kullanacağınız bir değişken

  before(async () => {
    predictorsApp = await PredictorsApp.deployed();
  });

  it("should deploy the PredictorsApp contract", async () => {
    assert(predictorsApp.address, "PredictorsApp contract not deployed");
  });

  it("should register a user", async () => {
    const fullName = "John Doe";
    const userCountBefore = await predictorsApp.userCount();
    
    await predictorsApp.registerUser(fullName, { from: accounts[0] });
    
    const userCountAfter = await predictorsApp.userCount();
    
    assert.equal(
      userCountAfter.toString(),
      (userCountBefore.toNumber() + 1).toString(),
      "User registration failed"
    );
  });

  it("should create a post", async () => {
    const postContent = "This is a test post";
    const postBet = web3.utils.toWei("0.1", "ether");
    const postEndDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const side = 0; // You can specify 0 for "LEFT" or 1 for "RIGHT"
    
    const postCountBefore = await predictorsApp.postCount();
    
    await predictorsApp.createPost(postContent, postBet, postEndDate, side, { from: accounts[0], value: postBet });
    
    const postCountAfter = await predictorsApp.postCount();
    
    assert.equal(
      postCountAfter.toString(),
      (postCountBefore.toNumber() + 1).toString(),
      "Post creation failed"
    );
  });
});
