var verb=require('verbo'),
linuxWifi=require('../index.js');

linuxWifi.list().then(function(list){
  verb(list)
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})

linuxWifi.add("dd","ss",2).then(function(){
  linuxWifi.list().then(function(list){
    verb(list)
  })
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})
linuxWifi.add("ddx","sss").then(function(){
  linuxWifi.list().then(function(list){
    verb(list)
  })
}).catch(function(err){
  verb(err,"error","LinuxWifi")
})
