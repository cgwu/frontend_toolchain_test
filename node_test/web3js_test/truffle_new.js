"use strict";
var Web3 = require("web3");

var contract = require("truffle-contract");
var data = require("../truffle_test/build/contracts/Storage.json");

//返回合约抽象
var Storage = contract(data);

var provider = new Web3.providers.HttpProvider("http://192.168.50.168:8545");
Storage.setProvider(provider);

var storageInstance;
//部署新的合约
Storage.new({from: Storage.web3.eth.accounts[0], gas: 1000000})
.then(function(instance){
    storageInstance = instance;
    //输出新合约地址
    console.log('新合约地址: ',instance.address);
    //以transaction方式与合约交互
    return storageInstance.set(2, { from: Storage.web3.eth.accounts[0]});
}).then(result => {
    // result是一个对象，含以下值:
    // result.tx => 交易hash，字符串
    // result.logs => 交易中触发的事件，数组
    // result.receipt =>交易接收对象，里面包含已使用的gas数量
    console.log(result.tx);
})
.then(function(){
    return storageInstance.get.call();
}).then(result => {
    console.log('set之后再get到的值:',result.toString());
}).catch(err=>{
    console.log(err);
});
