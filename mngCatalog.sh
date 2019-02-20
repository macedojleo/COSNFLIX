#/bin/bash

dockerInstance="moviesDB";
dbUser="admin";
dbPass="admin";
dbInstance="MOVIES_DB";
dbTable="movies";
query="";

Log() {

	#Check required parameters:

	if [[ -z "$1" || -z "$2" ]]
	then
		echo "ERROR DURING PARSING LOG DATA. CHECK PARAMETERS";
		exit 1;
	fi;

	#Set variables:

	L_type=$1;
	L_message=$2;
	L_timeStamp=`date "+%Y/%m/%d %H:%M:%S"`;

	#Return formatted message:

	echo "$L_type | $L_timeStamp | $L_message";

}


doQuery (){


	if [[ -z "$1" || -z "$2" || -z "$3" || -z "$4" || -z "$5" || -z "$6" ]]
        then
                Log "ERROR" "SOME PARAMETER IS NULL OR IVALID. PLEASE, CHECK THEM ALL: QUERY = $1 | DOCKER INSTANCE = $2 | DBUSER = $3 | DBPASS = $4 | DBINSTANCE = $5 | DBTABLE = $6";
                exit 1;
        fi;


	#Set variables:

	Q_query=$1;
	Q_dockerInstance=$2;
	Q_dbUser=$3;
	Q_dbPass=$4;
	Q_dbInstance=$5;
	Q_dbTable=$6;
	Q_values="";

	#Building Query
	
	docker exec -i  $Q_dockerInstance mysql -u$dbUser -p$dbPass --local-infile $Q_dbInstance -e "$Q_query";

}

while getopts 'i:d:sh' OPTION; do
	case "$OPTION" in
		s)
			query="select id, name, image, link from $dbTable";
			;;

		h)
			echo -e "script usage: $(basename $0)\n$0 -i < name of csvfile containing the following format: NAME,IMAGE,MOVIE_LINK (one for each line) > | Insert the movies into DB\n$0 -d < path/name of file containing movies' ID (one for each line) >  | Delete all movies with selected IDs from DB\n$0 -s | Return all movies on catalog\n$0 -h | Show this message" >&2
			exit 0;
			;;
		i)
			if [[ -z "$OPTARG" ]]
                        then
                                Log "ERROR" "-i needs an argument"
                                exit 1;
                        fi

			CSVFile="$OPTARG";
			
			#check if file exists
			if [ ! -f $CSVFile ]
			then
				Log "Error" "File $parm does not exists";
				exit 1;
			fi
			
			lastLine=`cat $CSVFile | wc -l`;
			currentLine="1";
			while read line
			do
				name=`echo $line | awk -F"," '{ print $1 }'`;
				image=`echo $line | awk -F"," '{ print $2 }'`;
				link=`echo $line | awk -F"," '{ print $3 }'`;
				
				if [[ -z $name || -z $image || -z $link ]]
			        then
					log "Error" "One or more parameters are null";
					exit 1;
			 	fi

				if [[ $currentLine -lt $lastLine ]];
				then
					result="('$name','$image','$link'), ";
					Q_values=$Q_values$result;
					#echo "DENTRO LOOP: $Q_query";
				else
					result="('$name','$image','$link')";
					Q_values=$Q_values$result;
				fi
				let "currentLine ++";
			done < $CSVFile;

			query="INSERT INTO movies (name, image, link) VALUES "$Q_values";";
			mv $CSVFile $CSVFile.done;	
			;;
		d)
			if [[ -z "$OPTARG" ]]
			then
				Log "ERROR" "-d needs an argument"
				exit 1;
			fi
			CSVFile="$OPTARG";
                        
			#check if file exists
			if [ ! -f $CSVFile ]
                        then
                                Log "Error" "File $parm does not exists";
                                exit 1;
                        fi

			lastLine=`cat $CSVFile | wc -l`;
                        currentLine="1";
                        while read line
                        do
				if [[ ! -z $line ]]
				then
                                	if [[ $currentLine -lt $lastLine ]];
                                	then
						result="$line,";
                                        	Q_values=$Q_values$result;
                                	else
						result="$line";
                                        	Q_values=$Q_values$result;
                                	fi
                                	let "currentLine ++";
				else
					LOG "INFO" "Ignoring line $currentLine. Is it null?";
				fi
                        done < $CSVFile;

			query="DELETE FROM movies WHERE id in ($Q_values);";
			mv $CSVFile $CSVFile.done;
			;;

		?)
			echo "script usage: $(basename $0) [-i <csvfile with fields terminated by ',' for name, image and link values>] -> Insert movies into DB [-d <list with all ID's values] -> This option will be delete all movies from database [-s] -> get all movies list [h] -> help, show this message]" >&2
			exit 1
			;;
	esac
done
doQuery "$query" $dockerInstance $dbUser $dbPass $dbInstance $dbTable

