pragma solidity >=0.4.21 <0.6.0;

contract Storage {
    uint256 storedData;

    function set(uint256 data) public {
        storedData = data;
    }

    function get() view public returns (uint256) {
        return storedData;
    }
}