#!/bin/bash
for i in apache-tcpwrapper recidive ssh-iptables apache-badbots pbx-gui asterisk-iptables vsftpd-iptables;
 do fail2ban-client status $i;
 done