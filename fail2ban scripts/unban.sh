#!/bin/bash
echo $1
fail2ban-client status asterisk-iptables
fail2ban-client set asterisk-iptables unbanip $1