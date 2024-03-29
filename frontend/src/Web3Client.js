import Web3 from "web3";
import PredictorsABI from "./contracts/PredictorsApp.json";

let selectedAccount;
let predictorsContract;
let isInitialized = false;
let predictorsContractAddress = "0x7185c26105496c4dA0238a0F047E2Faf562aC137";

/* //////////___ EXECUTE FUNCTIONS ___////////// */

export const init = async () => {
  // Configure contract
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  window.ethereum.on("accountChanged", function (accounts) {
    selectedAccount = accounts[0];
  });

  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();

  predictorsContract = new web3.eth.Contract(
    PredictorsABI.abi,
    predictorsContractAddress
  );

  isInitialized = true;
};

export const register = async (name) => {
  if (!isInitialized) {
    alert("You must install Metamask to use this dApp!");
    await init();
  }
  try {
    let res = await predictorsContract.methods
      .registerUser(name)
      .send({ from: selectedAccount });
    console.error("Registered");
    return res;
  } catch (e) {
    console.error(e, "Not Registered!");
  }
};

export const login = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getUser(selectedAccount).call();
    return res;
  } catch (e) {
    console.error(e, "Login Failed!");
  }
};

export const createPost = async (
  _postContent,
  _postBet,
  _postEndDate,
  _side
) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
      .createPost(_postContent, _postBet, _postEndDate, _side)
      .send({ from: selectedAccount });

    return res;
  } catch (e) {
    console.error(e);
  }
};

export const participateInPost = async (_postId, _side, _amount) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
      .participateInPost(_postId, _side, _amount)
      .send({ from: selectedAccount });
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const postResults = async (_id, _winner, _loser) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
      .postResults(_id, _winner, _loser)
      .send({ from: selectedAccount });
    return res;
  } catch (e) {
    console.error(e);
  }
};

/* //////////___ QUERY FUNCTIONS ___////////// */

export const getOwner = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getOwner().call();
    return res.toString();
  } catch (e) {
    console.error(e);
  }
};

export const getPostDetails = async (_id) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getPostDetails(_id).call();
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const getUserDetails = async (_walletAddress) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
      .getUserDetails(_walletAddress)
      .call();
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const getUserFullName = async (userAddress) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
      .getUserDetails(userAddress)
      .call();
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const getPost = async (_id) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getPost(_id).call();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async (_walletAddress) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getUser(_walletAddress).call();
    return res;
  } catch (e) {
    console.error(e);
  }
};

/* export const isUser = async (selectedAccount) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.isUser(selectedAccount);
    return res;
  } catch (e) {
    console.error(e);
  }
}; */

export const getAllPosts = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getAllPosts().call();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getPostByStatus = async (_status) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getPostByStatus(_status).call();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getUserCount = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getUserCount().call();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getPostCount = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getPostCount().call();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getSideByUser = async (walletAddress, id) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
      .getSideByUser(walletAddress, id)
      .call();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getUserAddress = async () => {
  if (!isInitialized) {
    await init();
  }
  return selectedAccount;
};

export const setOwner = async (newOwner) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
      .setOwner(newOwner.toLowerCase())
      .send({ from: selectedAccount });
    return res;
  } catch (e) {
    console.error(e);
  }
};
