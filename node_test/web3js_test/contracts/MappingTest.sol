pragma solidity >0.4.22 <0.7.0;

contract MappingExample {
    mapping(address => uint) public balances;

    function update(uint newBalance) public {
        balances[msg.sender] = newBalance;
    }
}

contract MappingUser {
    event Log(uint);
    function f() public returns( uint b){
        MappingExample m = new MappingExample();
        m.update(100);
        b = m.balances(address(this));
        emit Log(b);
    }
}
