// run this script as $sudo -u asterisk php /path/to/findmeAdd.php

//set up the environment
<?php
include '/etc/freepbx.conf';
$FreePBX = FreePBX::Create();

//create array
$addInput = array(
		'strategy' => 'ringallv2-prim',
		'grptime' => '20',
		'ddial' => '',
		'grplist' => '5133-*505133',
	);
//run functions
$Fme=$FreePBX::Findmefollow()->add('5133',$addInput);

//dump output
echo print_r($Fme);
