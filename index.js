var exec = require('child_process').exec,
Promise = require('promise'),
pathExists= require('path-exists'),
verb=require('verbo');


function LinuxWifi(fileconfig){
  if(fileconfig){

if(!pathExists.sync(fileconfig)){
verb('create path '+fileconfig,"info","linuxWifi")
this.reset;

} else{
  verb('test')
}
this.fileconfig=fileconfig;

} else{
  this.fileconfig='/etc/wpa_supplicant/wpa_supplicant.conf';

}
}


  LinuxWifi.prototype.add=function(essid,passw,priority){

    return new Promise(function (resolve, reject) {

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

exec(__dirname+'/wpa_writer.sh -c "'+this.fileconfig+'" -e"'+essid+'" -p"'+passw+'" -l"'+priority+'" -t add -y',function(err, stdout, stderr) {
  resolve(stdout);
});

} else {

exec(__dirname+'/wpa_writer.sh -c "'+this.fileconfig+'" -e"'+essid+'" -p"'+passw+'" -t add -y',function(err, stdout, stderr) {
  resolve(stdout);
});


}


}

})



  };
  LinuxWifi.prototype.list=function(){
    return new Promise(function (resolve, reject) {

    exec(__dirname+'/wpa_writer.sh -c "'+this.fileconfig+'" -t list',function(err, stdout, stderr) {
      resolve(stdout);
});
})
  };
  LinuxWifi.prototype.reset=function(essid){
    return new Promise(function (resolve, reject) {

    exec(__dirname+'/wpa_writer.sh -c "'+this.fileconfig+'" -t reset -y',function(err, stdout, stderr) {
      resolve(stdout);
});
})
  };

module.exports=LinuxWifi;
