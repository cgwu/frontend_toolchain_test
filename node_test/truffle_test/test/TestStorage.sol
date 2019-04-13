pragma solidity >=0.4.21 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Storage.sol";

contract TestStorage {
    function testGet() public {
        Storage meta = Storage(DeployedAddresses.Storage());
        uint expected = 0;
        Assert.equal(meta.get(), expected, "storedData should have equal zero");
    }

function testSet() public {
        Storage meta = Storage(DeployedAddresses.Storage());
        uint expected = 1234;
        meta.set(expected);
        
        Assert.equal(meta.get(), expected, "storedData should have equal zero");
    }

}