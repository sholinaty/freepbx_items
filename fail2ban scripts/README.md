a collection of scripts for intearacting with fail2ban on a freepbx / sangoma linux server.

usage:

./getbans.sh
-- shows you the currently banned IPs

./unban.sh 1.2.3.4
-- unban the specific IP Address from any/all jails

./getasteriskbans.sh
-- only check the asterisk jail
