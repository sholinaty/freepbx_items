// run this script as > sudo -u asterisk php /path/to/testGetUser.php

//set up the environment
<?php
include '/etc/freepbx.conf';
$FreePBX = FreePBX::Create();

//run functions
$user=$FreePBX->Core->getUser("5133");

//dump output
echo print_r($user);
