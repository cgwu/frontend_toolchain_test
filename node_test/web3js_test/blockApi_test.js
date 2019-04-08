"use strict";
var Web3 = require("web3");
// 创建web3对象
var web3 = new Web3();
//连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://192.168.50.168:8545"));

//最新区编号
var blockNumber = web3.eth.blockNumber;
console.log('blockNumber:', blockNumber);
console.log('------------------------------');

var lastBlock = web3.eth.getBlock(blockNumber);
console.log('#1 lastBlock:', lastBlock);
console.log('------------------------------');

var lastBlock2 = web3.eth.getBlock('latest');
console.log('#2 lastBlock2:', lastBlock2);

//根据区块编号查询
var block0 = web3.eth.getBlock(0);
console.log('#3 block0:', block0);
console.log('------------------------------');

//根据hash查询区块
var blockHash = web3.eth.getBlock('0xf692d75291c57a71f1ebe1113b2e6302a20da310e790478cdda2ee1ad6dfebd7');
console.log('#4 blockHash:', blockHash);
console.log('------------------------------');
