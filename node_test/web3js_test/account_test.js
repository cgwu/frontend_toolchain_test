/**
 * 依赖版本web3.js(0.20.x):
 * cnpm install --save web3@0.20.7
 */
"use strict";
var Web3 = require("web3");
// 创建web3对象
var web3 = new Web3();
//连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://192.168.50.168:8545"));

/* web3.js 1.0版本中 Web3.givenProvider浏览器区块链网络（如：Metamask）如果浏览器安装了Metamask插件，那么会自动识别 */
// const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("http://localhost:8545"));
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
//   } else {
//     // set the provider you want from Web3.providers
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//   }

// version
// var version = web3.version.api;
// console.info(version);

//账户相关
//列出所有可用账户
var accounts = web3.eth.accounts;
console.info(accounts);

const acctFrom = 1;
var acctTo = 3;

//查看余额
var balance_1 = web3.eth.getBalance(web3.eth.accounts[acctFrom]);
console.info('acc1 转账前余额:', web3.fromWei(balance_1, 'ether').toString(), 'wei');
var balance_3 = web3.eth.getBalance(web3.eth.accounts[acctTo]);
console.info('acc2 转账前余额:', web3.fromWei(balance_3, 'ether').toString(), 'wei');

// var balance_3_eth = web3.fromWei(balance_3, "ether");
// console.log(balance_3_eth.toString(), 'eth');

//估算转账大概需要消耗的gas
var estimate_gas = web3.eth.estimateGas({
    from: web3.eth.accounts[acctFrom],
    to: web3.eth.accounts[acctTo],
    value: web3.toWei(1, 'ether')
});
console.info('estimate gas:', estimate_gas);

//解锁账户(解锁成功之后才能从该账户转出金额)
web3.personal.unlockAccount(web3.eth.accounts[acctFrom],"001");
// web3.personal.unlockAccount(web3.eth.accounts[0]);

//开始转账操作
var txId = web3.eth.sendTransaction({
    // from: web3.eth.accounts[acctFrom],
    from: '0x17bb95bbc1a75e5f838b3695b403114ca3cb876b',   //不存在的地址
    to: web3.eth.accounts[acctTo],
    value: web3.toWei(0.1, 'ether'),    //转账数额
    gas: estimate_gas
});
console.info('transaction id:', txId);

console.info('----------------------------');
//查询 转账交易详情
var tx = web3.eth.getTransaction(txId);
console.info('转账交易详情: ', tx);
console.info('----------------------------');
//查询 交易收据详情
var tx_receipt = web3.eth.getTransactionReceipt(txId);
console.info('交易收据详情: ', tx_receipt);
console.info('----------------------------');

balance_1 = web3.eth.getBalance(web3.eth.accounts[acctFrom]);
console.info('acct1 转账后金额: ', web3.fromWei( balance_1, 'ether').toString(), 'wei');

balance_3 = web3.eth.getBalance(web3.eth.accounts[acctTo]);
console.info('acct2 转账后金额: ', web3.fromWei( balance_3, 'ether').toString(), 'wei');
