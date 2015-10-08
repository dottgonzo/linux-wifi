var verb=require('verbo'),
Wifi=require('../index.js');
var wlan=new Wifi('/tmp/wpatest');
console.log(wlan);
wlan.reset().then(function(list){
  verb(list,"info","reset")
}).catch(function(err){
  verb(err,"error","LinuxWifi")
});
wlan.list().then(function(list){
  verb(list)
}).catch(function(err){
  verb(err,"error","LinuxWifi")
});
wlan.list().then(function(list){
  verb(list)
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})

wlan.add("dd","sdddddddddddddds",2).then(function(){
  wlan.list().then(function(list){
    verb(list,"info","add")
  })
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})
wlan.add("ddx","yyyyyyyyyyyyysss").then(function(){
  wlan.list().then(function(list){
    verb(list)
  })
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})
