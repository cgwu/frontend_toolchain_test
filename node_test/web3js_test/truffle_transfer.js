/**
 * 向合约账户转账
 */
"use strict";
var Web3 = require("web3");

var contract = require("truffle-contract");
var data = require("../truffle_test/build/contracts/Deposit.json");

//返回合约抽象
var Deposit = contract(data);

var provider = new Web3.providers.HttpProvider("http://192.168.50.168:8545");
Deposit.setProvider(provider);

var depositInstance;
//通过合约抽象与合约交互
Deposit.deployed().then(function(instance){
    depositInstance = instance;
    return depositInstance.getBalance.call();
}).then(result=>{
    //显示余额
    console.info(`before deposit balance: ${ Deposit.web3.fromWei(result,'ether').toString() } ether`);
    //发送以太币
    return depositInstance.sendTransaction({ from: Deposit.web3.eth.accounts[0], 
        value:Deposit.web3.toWei(1, 'ether')});
}).then(result => {
    // console.log(result);
    // result是一个对象，含以下值:
    // result.tx => 交易hash，字符串
    // result.logs => 交易中触发的事件，数组
    // result.receipt =>交易接收对象，里面包含已使用的gas数量
    console.log('txId:',result.tx);
    //再次查询余额
    return depositInstance.getBalance.call();
}).then(result => {
    console.info(`after deposit balance: ${ Deposit.web3.fromWei(result,'ether').toString() } ether`);
}).catch(err => {
    console.log(err);
});
