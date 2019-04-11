pragma solidity >0.4.22 <0.7.0;

contract SimpleAuction {
    address payable public beneficiary; //受益人
    uint public auctionEndTime; // unix timestamp: seconds since 1970-01-01

    address public highestBidder; //最高竞卖人
    uint public highestBid; //最高金额

    mapping(address => uint) pendingReturns;

    bool ended;

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    constructor(
        uint _biddingTime,
        address payable _beneficiary
    ) public {
        beneficiary = _beneficiary;
        auctionEndTime = now + _biddingTime;
    }

    function bid() public payable {
        require(
            now <= auctionEndTime,
            "Auction already ended."
        );
        require(
            msg.value > highestBid,
            "There already is a higher bid."
        );
        if(highestBid != 0) {
            // Sending back the money by simply using
            // highestBidder.send(highestBid) is a security risk 
            // because it could execute an untrusted contract. 
            // It is always safer to let the recipients
            // withdraw their money themselves.
            pendingReturns[highestBidder] += highestBid;    //放回返还金额mapping中
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    function withdraw() public returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if(amount >0){
            pendingReturns[msg.sender] = 0;
            if(!msg.sender.send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    function auctionEnd() public {
        // 1. Conditions
        require(now >= auctionEndTime, "Auction not yet ended.");
        require(!ended, "auctionEnd has already been called.");
        // 2. Effects
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);
        // 3. Interaction
        beneficiary.transfer(highestBid);
    }

}