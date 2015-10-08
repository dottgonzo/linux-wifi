var verb=require('verbo'),
Wifi=require('../index.js');
var wlan=new Wifi();
console.log(wlan)
wlan.list().then(function(list){
  verb(list)
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})

wlan.addwpa("dd","sdddddddddddddds",2).then(function(){
  wlan.list().then(function(list){
    verb(list)
  })
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})
wlan.addwpa("ddx","yyyyyyyyyyyyysss").then(function(){
  wlan.list().then(function(list){
    verb(list)
  })
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})
