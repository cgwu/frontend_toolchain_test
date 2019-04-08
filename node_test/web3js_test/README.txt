启动geth命令：
$ geth --datadir testNet --ws --wsaddr=192.168.50.168 --rpc --rpcaddr=192.168.50.168 --rpcport 8545 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,admin,shh,txpool,debug,miner" --dev console 2>> test.log
$ tail -f -f test.log   #监控日志
