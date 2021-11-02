// run this script as $sudo -u asterisk php /path/to/testGetUser.php

//set up the environment
<?php
include '/etc/freepbx.conf';
$FreePBX = FreePBX::Create();

//run functions
$Fme=$FreePBX::Findmefollow()->del("1234");

//dump output
echo print_r($Fme);
