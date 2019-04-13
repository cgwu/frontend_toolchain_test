pragma solidity >=0.4.21 <0.6.0;

contract Deposit {
    event LogDeposit(address from, uint value);

    function() external payable {
        emit LogDeposit(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}