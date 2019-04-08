/**
 * web3.js调用智能合约方法
 */
"use strict";
var Web3 = require("web3");
var Tx = require('ethereumjs-tx');
// 创建web3对象
var web3 = new Web3();
//连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://192.168.50.168:8545"));

//将合约的get()方法先经过sha3计算后，取除了0X外的前面8位.
var get_func_sign = web3.sha3('get()').substr(2,8);
var set_func_sign = web3.sha3('set(uint256)').substr(2,8);
console.log('get_func_sign:',get_func_sign);
console.log('set_func_sign:',set_func_sign);

// var addr_sender   = "0x753fa8eb92706df7d5a96380837db217f984f598";
var addr_sender   = "0x09b71044eca245db15e3277ce2a7f4853a4ee12d";
var addr_contract = "0x2a52f61f166d7d1245ed1f2444ec7b2c1db85af6";

// tx_get.data是一个 0x + 函数前缀 + 32byte参数
var tx_get = {
    "from": addr_sender,
    "to" : addr_contract,
    "data" : "0x" + get_func_sign + "0000000000000000000000000000000000000000000000000000000000000000"
};

var result = web3.eth.call(tx_get);
console.info('读取state变量初始值:',result);

//解锁账户
web3.personal.unlockAccount(addr_sender,"001",600);

var tx_set = {
    "from": addr_sender,
    "to" : addr_contract,
    "data" : "0x" + set_func_sign + "0000000000000000000000000000000000000000000000000000000000000006"
};
var txId = web3.eth.sendTransaction(tx_set); //调用合约set(uint256方法), 返回交易hash

//再次调用get()方法输出state数据
result = web3.eth.call(tx_get);
console.info('方法一修改变量后的值:',result);

console.log('-----------发送已签名交易调用合约------------------');
var nonce = web3.eth.getTransactionCount(addr_sender, 'pending');
var raw_tx = {
    "from": addr_sender,
    "to" : addr_contract,
    "data" : "0x" + set_func_sign + "0000000000000000000000000000000000000000000000000000000000000007",
    "gas" : web3.toHex(50000),
    "value" : '0x00',
    "nonce" : web3.toHex(nonce),
    "gaslimit" : web3.toHex(50000)
};

var tx = new Tx(raw_tx);
var privateKey = Buffer.from('969af3b990653b01518369655df878775146201ac5ef44e69abc87ffa9adf74a', 'hex');
tx.sign(privateKey);
var serializedTx = tx.serialize();
console.log(serializedTx.toString('hex'));
web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'), function(err,hash){
    if(!err){
        console.log('RawTransaction hash值:',hash);
        //再次调用get()方法输出state数据
        result = web3.eth.call(tx_get);
        console.info('方法二修改变量后的值:',result);
    } else {
        console.log(err);
    }
});