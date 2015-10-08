var exec = require('child_process').exec,
Promise = require('promise'),
pathExists= require('path-exists'),
verb=require('verbo');


function LinuxWifi(fileconfig){
  if(fileconfig){



this.fileconfig=fileconfig;

if(!pathExists.sync(fileconfig)){
verb('create path '+fileconfig,"info","linuxWifi")
this.reset();
}

console.log(fileconfig)
} else{
  this.fileconfig='/etc/wpa_supplicant/wpa_supplicant.conf';

}
}


  LinuxWifi.prototype.add=function(essid,passw,priority){
var fileconfig=this.fileconfig;





            return new Promise(function (resolve, reject) {
              console.log(essid)




if(!essid){
  reject('no essid specified');
verb('no essid specified',"error","LinuxWifi")
}else if(!passw){
  reject('no password specified');
verb('no password specified',"error","LinuxWifi")
}else if(passw.length<7){ // controllare se 6 è ok
  reject('password too short');
verb('password specified is too short',"error","LinuxWifi")
} else{

  if (priority && priority != 'undefined'){

exec(__dirname+'/wpa_writer.sh -c "'+fileconfig+'" -e"'+essid+'" -p"'+passw+'" -l"'+priority+'" -t add -y',function(err, stdout, stderr) {
  resolve(JSON.parse(stdout))
});

} else {

exec(__dirname+'/wpa_writer.sh -c "'+fileconfig+'" -e"'+essid+'" -p"'+passw+'" -t add -y',function(err, stdout, stderr) {
  resolve(JSON.parse(stdout))
});


}


}
});



}



  LinuxWifi.prototype.list=function(){
    var fileconfig=this.fileconfig;

    return new Promise(function (resolve, reject) {

    exec(__dirname+'/wpa_writer.sh -c "'+fileconfig+'" -t list',function(err, stdout, stderr) {
      resolve(JSON.parse(stdout))
});
})
  };
  LinuxWifi.prototype.reset=function(essid){
    var fileconfig=this.fileconfig;
console.log("dd")
    return new Promise(function (resolve, reject) {

    exec(__dirname+'/wpa_writer.sh -c "'+fileconfig+'" -t reset -y',function(err, stdout, stderr) {
      resolve(JSON.parse(stdout))
});
})
  };

module.exports=LinuxWifi;
