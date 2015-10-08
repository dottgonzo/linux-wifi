#! /bin/bash



target='/etc/wpa_supplicant/wpa_supplicant.conf'



nettest=0





while getopts c:t:e:p:l:yvw option
	do
		case $option
		in

		        c) target=$OPTARG;;
		        t) todo=$OPTARG;;

		        e) essid=$OPTARG;;
		        p) passw=$OPTARG;;
		        l) priority=$OPTARG;;
w) working="y";;
y) force="y";;
v) verbose="y";;

		esac
	done







#wpa_writer


#target="example_wpa/wpa"


if [[ $todo  == 'reset' || -f $target ]]; then


# add, list, remove, priority
if [[ $todo  != 'reset' ]]; then


int=$(cat $target | grep -v "#" | grep -B50 -m 1 'network={' | grep -v grep | grep -v 'network')

num=$(cat $target | grep -v 'grep' |grep -v '#' | grep -c 'network={')

if [[ $todo != "list" ]]; then

list=$($0 -t list -c $target)

fi

fi



case $todo in
    add )




if [[ $essid ]] && [[ $passw ]]; then



if [[ ! $force ]]; then

echo "Are you sure?"
read sure

	if [[ $sure != 'y' ]]; then

	exit

	fi

fi




if [[ $(printf "$passw" | wc -c) -gt 7 ]]; then

wpa_passphrase "$essid" "$passw" > /dev/null
if [[ $? == 0 ]]; then


$0 -c "$target" -t remove -e "$essid" -w


	if [[ $priority ]]; then

	wpa_passphrase "$essid" "$passw" | sed "s/}/priority=$priority/g" >> $target && echo '}' >> $target

	else

	wpa_passphrase "$essid" "$passw" | sed "s/}/priority=1/g" >> $target && echo '}' >> $target

	fi






#echo "$essid network added"
#else

#echo "error by wpa_passphrase"
fi

#else

#echo "Impossible password (too short)"


fi

# else
#echo "not valid ssid or password"
 fi



;;
    remove )



if [[ $essid ]] ; then

tes=0
for (( nn=0;nn<$(echo $list | jq ". |length");nn++ )); do

if [[ $(echo $list | jq ".[$nn].ssid" | sed 's/"//g') == "$essid" ]]; then

tes=1

fi



done

if [[ $tes == 1 ]]; then

$0 -c "$target" -t reset -w

for (( nn=0;nn<$(echo $list | jq ". |length");nn++ )); do

if [[ $(echo $list | jq ".[$nn].ssid" | sed 's/"//g') != $essid ]];then
ss=$(echo $list | jq ".[$nn].ssid"| sed 's/"//g')
pswo=$(echo $list | jq ".[$nn].psk"| sed 's/"//g')
pr=$(echo $list | jq ".[$nn].priority"| sed 's/"//g')


$0 -c "$target" -t add -e "$ss" -p "$pswo" -l "$pr" -y -w
fi

#echo $list | grep -m$nn 'ssid'



done

#else

#echo "$essid not found"

fi


#else

#echo 'no essid specified'

fi

 ;;

    reset )


echo '' > $target
echo 'ctrl_interface=/var/run/wpa_supplicant' >> $target
echo 'eapol_version=2' >> $target
echo 'ap_scan=1' >> $target
echo 'fast_reauth=1' >> $target

 ;;


    list )



for (( nu=1; nu<=$num; nu++ )); do



ssid=$(cat $target | grep -v 'grep' | grep -v '#' | grep 'ssid' | sed 's/.*ssid="//g' | sed -s 's/"//g' | sed -n $nu''p)


pas=$(cat $target | grep -v 'grep' | grep '#psk="' | sed 's/.*#psk="//g' | sed -s 's/"//g'| sed -n $nu''p)

pri=$(cat $target | grep -v 'grep' | grep -v '#' | grep 'priority' | sed 's/.*priority=//g'  | sed -n $nu''p)

if [[ $working ]]; then
netwifi='{"ssid":"'$ssid'","psk":"'$pas'","priority":"'$pri'"}'

else
  netwifi='{"ssid":"'$ssid'","priority":"'$pri'"}'

fi


if [[ $nettest == 0 ]];then
netscan="$netwifi"
nettest=1
else
netscan="$netscan,$netwifi"
fi


done

echo -n '['$netscan']'


;;
    priority )

echo 'priority'
;;

*)

echo -n "$todo is not valid job"

exit

   ;;


esac


if [[ ! $working ]] && [[ $todo != 'list' ]]; then

$0 -t list -c $target

fi
else
  echo "error"

fi
