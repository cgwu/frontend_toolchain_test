/**
 *  ERROR!
 */
"use strict";
var Web3 = require("web3");
// 创建web3对象
var web3 = new Web3();
//连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://192.168.50.168:8545"));

console.log( web3.utils.isAddress('0x11') );

console.log( web3.utils.isAddress('0x753fa8eb92706df7d5a96380837db217f984f598') );
