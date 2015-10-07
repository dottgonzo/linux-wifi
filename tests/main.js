var verb=require('verbo'),
linuxWifi=require('../index.js');

linuxWifi.list().then(function(list){
  verb(list)
})
