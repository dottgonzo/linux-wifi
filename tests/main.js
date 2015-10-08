var verb=require('verbo'),
Wifi=require('../index.js');
var wlan=new Wifi('/tmp/wpatest');
console.log(wlan);
wlan.reset().then(function(list){
  verb(list,"info","reset")

  wlan.add("drthdx","yyyyyyyrtrthtthtryyyyyysss").then(function(){

    wlan.add("drtrttrhtd","sdddddddddddddds",2).then(function(){
      wlan.list().then(function(list){
        verb(list,"info","add")
      })
    }).catch(function(err){
      verb(err,"error","add")
    })


}).catch(function(err){
  verb(err,"error","reset")
});
}).catch(function(err){
  verb(err,"error","reset")
});
