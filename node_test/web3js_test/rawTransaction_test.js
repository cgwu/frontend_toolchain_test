/**
 * 发送一个已经签名的转账交易
 * cnpm install --save ethereumjs-tx
 * 与普通转账区别在于不需要解锁, 如：
 * web3.personal.unlockAccount(web3.eth.accounts[acctFrom], password);
 */

"use strict";
var Web3 = require("web3");
var Tx = require('ethereumjs-tx');

// 创建web3对象
var web3 = new Web3();
//连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://192.168.50.168:8545"));

// var address = "0x9a7472988290211e2E285C08Fd2236Bb612Cb398";
var address = "0x09b71044eca245db15e3277ce2a7f4853a4ee12d"; //发送者地址：需要存在于链中.
var nonce = web3.eth.getTransactionCount(address, 'pending');
console.log('nonce', nonce);

var amount = web3.toWei(1, 'ether');
var rawTx = {
    from: address,
    to: "0x17bb95bbc1a75e5f838b3695b403114ca3cb876a",
    value: web3.toHex(amount),
    nonce: web3.toHex(nonce),
    gasLimit: web3.toHex('49674')
};
//创建raw transaction
var tx = new Tx(rawTx);

//from私钥地址
// var privateKey = new Buffer('54d4b4d618fd68ed590caf43c60dcfdbf4cd31d5cde13127033b1a0f15fa95dd', 'hex');
var privateKey = Buffer.from('969af3b990653b01518369655df878775146201ac5ef44e69abc87ffa9adf74a', 'hex');

//使用私钥给rawTx签名
tx.sign(privateKey);
//签名后的交易
var serializedTx = tx.serialize();
console.log('签名后的交易:',serializedTx.toString('hex'));

const acctFrom = 1;
var acctTo = 3;

//查看余额
var balance_1 = web3.eth.getBalance(web3.eth.accounts[acctFrom]);
console.info('acc1 转账前余额:', web3.fromWei(balance_1, 'ether').toString(), 'wei');
var balance_3 = web3.eth.getBalance(web3.eth.accounts[acctTo]);
console.info('acc2 转账前余额:', web3.fromWei(balance_3, 'ether').toString(), 'wei');

web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'), function(err,hash){
    if(!err){
        console.log('交易哈希:',hash);

        balance_1 = web3.eth.getBalance(web3.eth.accounts[acctFrom]);
        console.info('acct1 转账后金额: ', web3.fromWei( balance_1, 'ether').toString(), 'wei');
        balance_3 = web3.eth.getBalance(web3.eth.accounts[acctTo]);
        console.info('acct2 转账后金额: ', web3.fromWei( balance_3, 'ether').toString(), 'wei');

        var txId = hash;
        console.info('----------------------------');
        //查询 转账交易详情
        var tx = web3.eth.getTransaction(txId);
        console.info('转账交易详情: ', tx);
        console.info('----------------------------');
        //查询 交易收据详情
        var tx_receipt = web3.eth.getTransactionReceipt(txId);
        console.info('交易收据详情: ', tx_receipt);
        console.info('----------------------------');

    } else {
        console.log(err);
    }
});
