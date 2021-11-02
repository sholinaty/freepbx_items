// run this script as $sudo -u asterisk php /path/to/FindMeFollowGet.php

//set up the environment
<?php
include '/etc/freepbx.conf';
$FreePBX = FreePBX::Create();

//run functions
$Fme=$FreePBX::Findmefollow()->get("1234","0");

//dump output
echo print_r($Fme);
