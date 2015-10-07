var verb=require('verbo'),
linuxWifi=require('../index.js');

linuxWifi.list().then(function(list){
  verb(list)
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})

linuxWifi.add("dd","sdddddddddddddds",2).then(function(){
  linuxWifi.list().then(function(list){
    verb(list)
  })
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})
linuxWifi.add("ddx","yyyyyyyyyyyyysss").then(function(){
  linuxWifi.list().then(function(list){
    verb(list)
  })
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})
