var verb=require('verbo'),
linuxWifi=require('../index.js');

linuxWifi.list().then(function(list){
  verb(list)
})

linuxWifi.add("dd","ss",2).then(function(){
  linuxWifi.list().then(function(list){
    verb(list)
  })
})
