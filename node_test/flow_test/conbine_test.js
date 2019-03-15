var flow = require('nimble');
flow.series([
    function(callback) {
        setTimeout(function(){
            console.log('S# first');
            callback();
        },2000);
    },

    function (callback) {
        flow.parallel(
        [
            function(callback){
                setTimeout(function(){
                    console.log('exec 1');
                    callback();
                }, 1000);
            },

            function(callback){
                setTimeout(function(){
                    console.log('exec 2');
                    callback();
                }, 500);
            },

            function(callback){
                setTimeout(function(){
                    console.log('exec 3');
                    callback();
                }, 100);
            },
        ],
            callback);     //并行执行完成，再调用回调
    },
    function(callback) {
        setTimeout(function(){
            console.log('S# last');
            callback();
        },500);
    }
]);


