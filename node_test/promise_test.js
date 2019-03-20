
function cook() {
    console.log('开始做饭');
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('做饭完毕');
            //resolve('鸡蛋炒饭');
            reject('烧焦的米饭');
        }, 1000);
    });
    return p;
}
function eat(data) {
    console.log('开始吃饭:' + data);
    var p = new Promise(function(resolve, reject){
        setTimeout(function() {
            console.log('吃饭完毕');
            resolve('一只碗和一双筷子');
        }, 2000);
    });
    return p;
}
function wash(data) {
    console.log('开始洗碗:' + data);
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('洗碗完毕');
            resolve('干净的碗筷');
        },1000);
    });
    return p;
}
/*
cook()
    .then(function(data){
        return eat(data);
    })
    .then(function(data){
        return wash(data);
    })
    .then(function(data){
        console.log(data);
    });
*/
console.log('---------');
cook()
    .then(
        eat,
        function(data){
            console.log(data + '没法吃');
            return new Promise((resolve, reject) => reject('没动过的碗'));
        }
    )
    .then(
        wash,
        function(data){
            console.log('wash: '+data);
            return new Promise((resolve, reject) => resolve('碗'));
            //return new Promise((resolve, reject) => reject('碗'));
        }
    )
    .then(
        function(data){
            console.log('resolve:' + data);
        },
        (data) => {
            console.log('reject:' + data);
        }
    );



