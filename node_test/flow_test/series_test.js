var flow = require('nimble');
flow.series([
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
    }
]);

