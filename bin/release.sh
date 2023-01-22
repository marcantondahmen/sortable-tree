#!/bin/sh

if [[ $(git status -s) ]]
then
	echo "Working directory is not clean!"
	git status -s
	echo
fi

ps | grep "webpack" | grep -v grep | awk '{print $1}' | xargs kill

echo "Choose type of release:"
echo
echo "  1) Patch (default)"
echo "  2) Minor"
echo "  3) Major"
echo
read -n 1 -p "Please select a number or press Enter for a patch: " option
echo

case $option in 
	1) version=patch;;
	2) version=minor;;
	3) version=major;;
	*) version=patch;;
esac

while true
do
	read -p "Create $version version? (y/n) " continue
	case $continue in
		[Yy]* ) 
			break
			;;
		[Nn]* ) 
			exit 0
			;;
		* ) 
			echo "Please only enter \"y\" or \"n\"."
			;;
	esac
done
echo

npm version $version
git push origin && git push origin --tags