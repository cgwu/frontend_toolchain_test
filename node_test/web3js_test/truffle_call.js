"use strict";
var Web3 = require("web3");

var contract = require("truffle-contract");
var data = require("../truffle_test/build/contracts/Storage.json");

//返回合约抽象
var Storage = contract(data);

var provider = new Web3.providers.HttpProvider("http://192.168.50.168:8545");
Storage.setProvider(provider);

//通过合约抽象与合约交互
Storage.deployed().then(function(instance){
    return instance.get.call();
}).then(result => {
    console.log(result.toString());
}).catch(err=>{
    console.err(err);
});
