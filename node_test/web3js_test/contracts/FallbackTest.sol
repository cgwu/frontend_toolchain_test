pragma solidity >0.4.22 <0.7.0;

// 这个合约会持有发送给它的以太币，即无法赎回
contract Sink {
    function() payable {}
}
