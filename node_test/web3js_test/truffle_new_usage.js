"use strict";
var Web3 = require("web3");

var contract = require("truffle-contract");
var data = require("../truffle_test/build/contracts/Storage.json");

//返回合约抽象
var Storage = contract(data);

var provider = new Web3.providers.HttpProvider("http://192.168.50.168:8545");
Storage.setProvider(provider);

var storageInstance;
//通过地址使用新的合约
// Storage.at("0x8e442138141c33d9546c7a7962bbe6216f66589d")
Storage.at("0xf22395e56455be83d56c4a86309e5f509b0a0672")
.then(function(instance){
    return instance.get.call();
}).then(result => {
    console.log('set之后再get到的值:',result.toString());
}).catch(err=>{
    console.log(err);
});
