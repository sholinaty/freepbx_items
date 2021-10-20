## **Integrate 3rd party tools with FreePBX**

> You can use this code for any CRM integration, using WebHooks, from the events listener you can send to any endpoint you'd like. 

This code would help you integrate FreePBX call logging and missed calls into your without any need to change FreePBX core modules or doing anything fancy.

It's a very simple approach by connecting to Asterisk Manager (the VoIP engine used by FreePBX) and listen for events in real time.

## Step 1

Login in your FreePBX and add a user for Asterisk Manager which would have only Read Permissions.

> **Settings** -> **Asterisk Manager Users**
>
> Permit connections only from localhost, which is 127.0.0.1/255.255.255.0 as a default value

## Step 2

Login as root in your hosted FreePBX Linux box, then in asterisk console enable Asterisk CDR manager module, so you can read CDR (call logs) event in real time

> ssh root@your-freepbx-box

before loading the module, check if the configuration file exits for this module, if not you should create cdr_manager.conf in /etc/asterisk folder

> [root@freepbx ~]# touch /etc/asterisk/cdr_manager.conf

Then opnen this file with your preferred command line editor (vim or nano or whatever) and put the following into that file:

```
[general]
enabled = yes

[mappings]
recordingfile => recordingfile
```

Then you can enter asterisk console and enable the module

> [root@freepbx ~]# asterisk -rvvvvvvvvv

> freepbx*CLI> module load cdr_manager.so

Now you should be ready to listen to real time events from Asterisk.

## Step 3

While in your FreePBX command line terminal, create a folder in /opt so you can clone this repository there

> [root@freepbx ~]# mkdir /opt/ami_listener

> [root@freepbx ~]# cd /opt/ami_listener

You should install this module/code by moving it to the /opt/ami_listener folder

Then you need to install dependences

> [root@freepbx ~]# npm install

## Step 4

After creating the Asterisk Manager user from the step one, put those credentials in the config.js file (from the files you cloned on this repository), specifically in the asterisk_user and asterisk_pass keys

```
{
    ...
    asterisk_user: 'Your User',
    asterisk_pass: 'Your Pass',
    ...
}
```

Also add any other relevant values in the config.js file.

## Step 5

You can run this software by running the following command from the command line.

> [root@freepbx ~]# node /opt/ami_listener/init.js

In order to have this a running process in your FreePBX box you should configure it as a service, which is out of scope of this proof of concept document.