var exec = require('child_process').exec,
Promise = require('promise'),
verb=require('verbo');

module.exports={

  add:function(essid,passw,priority){

    return new Promise(function (resolve, reject) {

if(!essid){
  reject('no essid specified');
verb('no essid specified',"error","LinuxWifi")
}else if(!passw){
  reject('no password specified');
verb('no password specified',"error","LinuxWifi")

} else{

  if (priority && priority != 'undefined'){

exec(__dirname+'/wpa_writer.sh -e"'+essid+'" -p"'+passw+'" -l"'+priority+'" -t add -y',function(err, stdout, stderr) {
  resolve(stdout);
});

} else {

exec(__dirname+'/wpa_writer.sh -e"'+essid+'" -p"'+passw+'" -t add -y',function(err, stdout, stderr) {
  resolve(stdout);
});


}


}

})



  },
  list:function(){
    return new Promise(function (resolve, reject) {

    exec(__dirname+'/wpa_writer.sh -t list',function(err, stdout, stderr) {
      resolve(stdout);
});
})
  }

}
