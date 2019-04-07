/**
 * 根据keystore查看私钥
 * cnpm install keythereum --save
 */

"use strict";
function getPrivateKey(){
    var keythereum = require('keythereum');
    var fromkey = keythereum.importFromFile("0x09b71044eca245db15e3277ce2a7f4853a4ee12d", "/home/danny/workspace/geth/testNet");
    //recover输出为buffer类型的私钥
    var privateKey = keythereum.recover('001', fromkey);
    console.log(privateKey.toString('hex'));
}

getPrivateKey();
