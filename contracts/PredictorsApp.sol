// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

//import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PredictorsApp {
    
    /* ////////////////////////////////// */
    /* ////////// DEĞİŞKENLER /////////// */
    /* ////////////////////////////////// */
    address private owner; // Contract sahibinin adresini tutmak için bir değişken oluşturuyoruz.
    uint256 public userCount; // Kullanıcı sayısını tutmak için bir değişken oluşturuyoruz. Backend'e saklayacağız
    uint256 public postCount; // Post sayısını tutmak için bir değişken oluşturuyoruz. Backend'e saklayacağız
    address public admin; // Admin adresini tutmak için bir değişken oluşturuyoruz.
    WinnerLoserState public state; // WinnerLoserState struct'ını manipule etmek için bu değişkeni kullanacağız.

    /* ////////////////////////////////// */
    /* //////////// ENUMLAR ///////////// */
    /* ////////////////////////////////// */

    enum SIDE {LEFT,RIGHT} // LEFT/RIGHT enum tipini oluşturuyoruz.

    /* ////////////////////////////////// */
    /* ///////// STRUCT YAPILARI //////// */
    /* ////////////////////////////////// */

    //Kullanıcı bilgilerini tutmak için User struct'ı oluşturuyoruz.
    struct User {
        uint256 id; // Kullanıcının ID'sini tutuyoruz.
        string fullName; // Kullanıcının adını ve soyadını tutuyoruz.
        uint balance; //Kullanıcının bakiyesi
        address walletAddress; //Kullanıcının cüzdan adresini tutuyoruz.
        uint256 registerDate; //Kullanıcının kayıt olduğu tarihi tutuyoruz.
        bool isVerified; //Kullanıcının doğrulanıp doğrulanmadığını tutuyoruz.
        uint256[] partipicatedPost; //Kullanicinin Katildigi (DİĞER) Postlar - Int Array (Kendi postuna katılamaz)
        uint256[] allPredictions; //Kullanicinin Tum Postlarinın ID'leri - Int Array
        uint256 predictionSuccesful; //Kullanici Basarili Sonuclanan Post Sayisi
    }

    //Post bilgilerini tutmak için Post struct'ı oluşturuyoruz.
    struct Post {
        uint256 id; // Postun ID'sini tutuyoruz.
        string postContent; // Postun içeriğini tutuyoruz.
        uint256 postBet; // Kahinin postu oluştururken yatırdığı bet miktarını tutuyoruz.
        uint256 postDate; // Postun oluşturulma tarihini tutuyoruz.
        uint256 postEndDate; // Postun bitiş tarihini tutuyoruz.
        address[] postParticipants; //Post katilimcileri - Address Array
        uint256 postBetPool; //Posta katılımcıların yatırdığı toplam bet miktarını tutuyoruz.
        bool postFinished; // Postun bitip bitmediğini tutuyoruz.
    }

    // Kehanetin sonucunu yani hangi tarafın kazandığını burada tutacağız
    struct WinnerLoserState {
        SIDE winner; // SIDE tipinde kazananları tutuyoruz. (Left'in ve Right'ın kazananları)
        SIDE loser; // SIDE tipinde kaybedenleri tutuyoruz. (Left'in ve Right'ın kaybedenleri)
    }

    /* ////////////////////////////////// */
    /* //////// MAPPING YAPILARI //////// */
    /* ////////////////////////////////// */

    mapping(address => User) public users; // Kullanıcıları tutmak/döndürmek için bir mapping oluşturuyoruz.
    mapping(uint256 => Post) public posts; // Postları tutmak/döndürmek için bir mapping oluşturuyoruz.
    mapping(SIDE => uint256) public topBetsForSide; //Taraflar için toplam yatırılan bahisler. Ödül dağıtımında kullanılacak
    mapping(address => mapping(uint256 => SIDE)) public sideByUser; // Kullanıcının seçtiği tarafı tutuyoruz.
    mapping(address => mapping(SIDE => uint256)) public betAmountByUser; //Kullanıcının tarafa yatırdığı bahis

    // Post bet miktarını wei cinsinden tutuyoruz
    mapping(uint256 => uint256) public postBet;
    mapping(uint256 => uint256) public postBetPool;


    /* ////////////////////////////////// */
    /* ///////// EVENT YAPILARI ///////// */
    /* ////////////////////////////////// */

    // Fonksiyonların durum bilgileri event ile başkalarına yayın yapıyoruz
    event NewUser(uint256 id, string fullName, address walletAddress);
    event NewPost(uint256 id,string postContent,uint256 postBet,uint256 postEndDate,address postAuthor,SIDE _side);
    event PostParticipation(uint256 postId,address participant,uint256 amount,SIDE _side);
    event PostFinish(uint256 postId,address winner,uint256 totalBet,uint256 authorReward);
    event BalanceWithdrawn(address walletAddress,uint256 amount);
    
    /* ////////////////////////////////// */
    /* /////////// CONSTRUCTOR ////////// */
    /* ////////////////////////////////// */

    // Başlangıçta ilklenmesi için constructor fonksiyonu oluşturuyoruz, kullanıcı ve post sayılarını sıfıra ayarlıyoruz.
    constructor() {
        owner = msg.sender;
       
       /*  userCount = userCount;
        postCount = postCount; */
    }

    /* ////////////////////////////////// */
    /* /////////// MODIFIERLAR ////////// */
    /* ////////////////////////////////// */

    // Sadece adminin kullanabileceği fonksiyonları belirlemek için bir modifier oluşturuyoruz.
    modifier onlyOwner() {
        require(msg.sender == owner, "Sadece hesap sahibi degistirebilir!");
        _;
    }
    
    /* ////////////////////////////////// */
    /* /////// EXECUTE FONKSIYONLAR ///// */
    /* ////////////////////////////////// */
    // UI'da kullanıcı değişirse yeni sahipliği setOwner ile vereceğiz
    function setOwner(address _newOwner) external onlyOwner {  
        owner = _newOwner;
    }

    // Kullanıcı oluşturma fonksiyonu
    function registerUser(string memory _fullName) public {
        require(bytes(_fullName).length > 0, "Full name is required");
        
        require(!isUser(msg.sender) , "Bu kullanici zaten var!"); //Kullanıcı yoksa devam et
        userCount+=1;

        users[msg.sender] = User({
            id: userCount,
            fullName: _fullName,
            balance: 0,
            walletAddress: msg.sender,
            registerDate: block.timestamp,
            isVerified: false, //dogrulanmis mi
            partipicatedPost: new uint256[](0), //diger katildigi tahminlerin/postların indexi
            allPredictions: new uint256[](0), //oluşturduğu postların/tahminlerin indexi
            predictionSuccesful: 0 //Kullanıcının basarili tahmin sayısını tutuyoruz
        });
        
        emit NewUser(userCount, _fullName, msg.sender);
    }
    // Post oluşturma fonksiyonu
    function createPost(string memory _postContent,uint256 _postBet,uint256 _postEndDate, SIDE _side) public {
        require(isUser(msg.sender) , "Post olusturmak icin kullanici olmalisiniz!"); //Kullanıcı yoksa devam et
        require(bytes(_postContent).length > 0, "Post content is required");
        require(_postBet > 0, "Bet amount must be greater than 0");
        //require(_postEndDate > block.timestamp, "End date must be in the future");
        postCount+=1;

        //Post yaratıldığında ilk katılımcı olarak post sahibini ekliyoruz.
        address[] memory initialParticipants = new address[](1);
        initialParticipants[0] = msg.sender;

        //Seçilen tarafı post ID sine göre kullanıcının seçtiği tarafa mapliyoruz.
        sideByUser[msg.sender][postCount] = _side;
        
        posts[postCount] = Post({
            id: postCount, //Postun ID si
            postContent: _postContent, //Post icerigi
            postBet: _postBet, //Postun degeri
            postDate: block.timestamp,
            postEndDate: _postEndDate,
            postParticipants: initialParticipants, // İlk katılımcı olarak sadece göndereni ekle
            postBetPool: _postBet, //Postun toplam havuzu. Ilk yaratildiginda kahin betini post havuzuna ekledik
            postFinished: false // Post bitti mi
            //taraf: sideByUser[msg.sender][postCount] //Kahinin post'ta seçeceği tarafı structa atadık
        });

        //Kahinin evet veya hayır seçeneğine ödediği miktarı ve hangi tarafını seçtiğini tutan mappingi güncelleiyoruz.
        betAmountByUser[msg.sender][_side] += _postBet; //Kahin'in odedigi miktari guncelledik
        topBetsForSide[_side] += _postBet;
        
        //Kullanicinin toplam tahmin sayisini guncelliyoruz
        users[msg.sender].allPredictions.push(postCount);

        emit NewPost(postCount, _postContent, _postBet, _postEndDate, msg.sender, _side);
    }

    // Diğer kullanıcıların bir posta katılım fonksiyonu
    function participateInPost( uint256 _postId, SIDE _side, uint256 _amount ) public {
        require(_postId <= postCount && _postId > 0, "Invalid post ID");
        //require(posts[_postId].postEndDate > block.timestamp, "Post has ended.");
        require(_amount > 0, "Amount must be greater than 0");
        //Post sahibi kendi postuna bahis yapamaz
        require(posts[_postId].postParticipants[0] != msg.sender,
            "Kendi kehanetine katilim yapamazsin!");

        //Evet veya Hayır seçeneğinin toplam toplam havuzuna amount u ekliyoruz.
        topBetsForSide[_side] += _amount;
        posts[_postId].postBetPool += _amount; //Postun havuzunu güncelliyoruz.

        //Kahin'in evet veya hayır seçeneğine ödediği miktarı güncelleiyoruz.
        //Örn: Kahin(msg.sender) "Evet/Hayır" seçeneğine _amount miktar ödeme ekledi.
        betAmountByUser[msg.sender][_side] += _amount; //Kahin'in odedigi miktari guncelledik


        sideByUser[msg.sender][_postId] = _side; //Kullanıcının postID'ye göre tarafını güncelledik
        //posts[_postId].taraf = _side;//Post'un taraf havuzunu arttırdık

        posts[_postId].postParticipants.push(msg.sender); // Katılan kullanıcının cüzdan adresini katilimcilar dizisine ekledik

        //Kullanıcının diğer katıldığı postları güncelliyoruz.
        users[msg.sender].partipicatedPost.push(_postId);

        emit PostParticipation(_postId, msg.sender, _amount, _side);
    }

    // Etkinligin kazanani belirleyen fonksiyon.
    // winner ile 0(LEFT) veya 1(RIGHT) alacaz. loser ile 0(LEFT) veya 1(RIGHT) alacaz
    function postResults( uint256 _postId, SIDE _winner, SIDE _loser) external payable {
        //require(predictor == msg.sender, "Kahin degilsiniz!"); //Kahin olup olmadığını kontrol ediyoruz.
        require(posts[_postId].postFinished == false, "Kehanet bitmedi!"); //Kehanetin bitmediyse devam et, bittiyse rapor oluşturma.
        
        //Hangi tarafın kazandığını struct'a bildiriyoruz
        state.winner = _winner; //Param ile gelen winner'i struct'taki winner'a atiyoruz.
        state.loser = _loser; //Param ile gelen loser'i struct'taki loser'a atiyoruz.
        posts[_postId].postFinished = true; //Kehanetin bittigini belirtiyoruz.

    
        //Kazananları listelemek için for kullanacağız. 
        //Her döngüde kullanıcının state(winner) durumunu kontrol edeceğiz.
        // Side durumunu ve katılımcıları almak için geçici diziler oluşturuyoruz
        SIDE[] memory participantsSides = new SIDE[](posts[_postId].postParticipants.length); 
        address[] memory participantsAddresses = posts[_postId].postParticipants; 
        
        uint totalBetPool = posts[_postId].postBetPool;
        

        for (uint256 i = 0; i < participantsAddresses.length; i++) {
            address participant = participantsAddresses[i];
            participantsSides[i] = sideByUser[participant][_postId];

            if(participantsSides[i] == state.winner){  // Katılımcının adresi  = winner ise
                
                users[participant].predictionSuccesful +=1; //Kazananlarin basarili tahmin degerini guncelledik

                // Odul miktarini hesapla (kazananlarin toplam bahis havuzunun yuzdesi)
                uint participantBet = betAmountByUser[participant][participantsSides[i]]; //Yatırdığı sermaye
                
                //(Yatırdığı bahis * Havuzdaki top miktar) /toplam kazanan sayısı
                uint rewardAmount = (participantBet * totalBetPool) / topBetsForSide[state.winner];
                users[participant].balance += rewardAmount;
                //payable(users[participant]).transfer(users[participant].balance);
                
                //uint256 sermaye = betAmountByUser[msg.sender][state.winner];
                
                // KAZANC + (no diyenlerin sayisi * sermaye) / KAZANAN KISI SAYISI
                // uint256 kazanc = sermaye + (topBetsForSide[state.loser] * sermaye) / topBetsForSide[state.winner];
   
            }   
        }
    }

    /* //withdrawBalance
    function withdrawBalance(uint amount) external nonReentrant {
        require(isUser(msg.sender), "Kullanici bulunamadi!");
        
        uint balance = users[msg.sender].balance;
        require(balance >= amount, "Yetersiz bakiye!");

        users[msg.sender].balance -= amount;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed.");

        emit BalanceWithdrawn(msg.sender, amount);
    } */

    /* //////////////////////////////////// */
    /* //////// QUERY FONKSIYONLAR //////// */
    /* //////////////////////////////////// */

    //Kullanıcı var olup olmadığını kontrol ediyoruz. True yada False dönmesini bekliyoruz.
    function isUser(address _walletAddress) public view returns (bool) {
        return users[_walletAddress].walletAddress != address(0); // Adress verdiğimiz kullanıcının adresi 0'a eşit değilse true döndürüyoruz.
    }
   
    // Kullanıcının ad ve soyadını çeken fonksiyon
    function getUserFullName(address _userAddress) public view returns (string memory) {
        return string(abi.encodePacked(users[_userAddress].fullName)); 
    }

    //Kullanıcı bilgilerini çekme fonksiyonu
    function getUserDetails(address _walletAddress) external view returns ( 
        uint256, 
        string memory, 
        uint, 
        address, 
        uint256, 
        bool,
        uint256[] memory, 
        uint256[] memory, 
        uint256 
        )
        {
        require(isUser(_walletAddress), "Kullanici bulunamadi!"); //Kullanıcı yoksa devam et

        User memory user = users[_walletAddress]; 

        return (
            user.id,
            user.fullName,
            user.balance,
            user.walletAddress,
            user.registerDate,
            user.isVerified,
            user.partipicatedPost,
            user.allPredictions,
            user.predictionSuccesful
        );
    }

    //Post bilgilerini çekme fonksiyonu
    function getPostDetails(uint256 _id) external view returns ( 
        uint256, 
        string memory, 
        uint256, 
        uint256, 
        uint256, 
        address[] memory, 
        uint256, 
        bool 
        ) {
        require(posts[_id].id != 0, "Post bulunamadi!"); // Post varsa devam et

        Post memory post = posts[_id];

        return (
            post.id,
            post.postContent,
            post.postBet,
            post.postDate,
            post.postEndDate,
            post.postParticipants,
            post.postBetPool,
            post.postFinished
        );

       
    }

    // Postları aktif/pasif durumuna göre listeleme fonksiyonu (Parametre 0/1 alır)
    function getPostByStatus(bool _status) external view returns (Post[] memory) {
    uint256 count = 0;

    // Tüm postları döngüye alın ve belirtilen durumu sağlayanları sayın
    for (uint256 i = 1; i <= postCount; i++) {
        if (posts[i].postFinished == _status) {
            count++;
        }
    }

    // Belirtilen durumu sağlayan postları saklamak için dinamik bir dizi oluşturun
    Post[] memory postsWithStatus = new Post[](count);
    
    // Tüm postları tekrar döngüye alın ve belirtilen durumu sağlayanları diziyi ekleyin
    uint256 index = 0;
    for (uint256 i = 1; i <= postCount; i++) {
        if (posts[i].postFinished == _status) {
            postsWithStatus[index] = posts[i];
            index++;
        }
    }

    return postsWithStatus;
}


    function getOwner() external view returns(address) {
         return owner;
    }

    function getUser(address _walletAddress) external view returns (User memory) {
        require(isUser(_walletAddress), "Kullanici bulunamadi!");
        return users[_walletAddress];
    }

    function getPost(uint _id) external view returns(Post memory) {
        require(posts[_id].id != 0, "Post does not exist!");
        return posts[_id];
    }

    function getUserCount() external view returns (uint) {
        return userCount;
    }

    function getPostCount() external view returns (uint) {
        return postCount;
    }

    // Post bet miktarını ondalıklı sayıya dönüştürerek görüntülemek için bir fonksiyon
    function getPostBet(uint256 _postId) external view returns (uint256) {
        // Bet miktarını ondalıklı sayıya dönüştürmek için bir çarpan kullanabilirsiniz.
        // Bu örnekte 1 ETH'in 10^18 wei olduğunu varsayalım.
        uint256 betMultiplier = 10**18;
        return postBet[_postId] / betMultiplier;
    }

    // Post bet pool miktarını ondalıklı sayıya dönüştürerek görüntülemek için bir fonksiyon
    function getPostBetPool(uint256 _postId) external view returns (uint256) {
        // Bet miktarını ondalıklı sayıya dönüştürmek için bir çarpan kullanabilirsiniz.
        // Bu örnekte 1 ETH'in 10^18 wei olduğunu varsayalım.
        uint256 betMultiplier = 10**18;
        return postBetPool[_postId] / betMultiplier;
    }
    

}
