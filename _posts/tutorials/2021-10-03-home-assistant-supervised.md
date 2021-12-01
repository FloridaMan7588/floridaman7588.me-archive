---
layout: post
title: "Home Assistant Supervised on Docker"
date: 2021-10-03 00:30:00 -0500
categories: [Docker, Home Assistant, Tutorial]
author: "FloridaMan"
comments: true
---

Hey, it's me again! I'm actually doing something too. Right now the thing that I'm doing is a write-up for a YouTube video that I made like half a year ago.
Yeah. Let's get started.

## Before we get started

Before we get started I need to clarify that my video uses a now outdated script for deploying Home Assistant Supervised, so in this write-up we will be using
the updated version. I also need to say that this tutorial was originally made on a VMware amd64 virtual machine, but it should work on a bare metal host. Now the lsdt thing I have to say is that this install script is for Debian 10 buster but I believe it should work on other flavours of linux as well. Please correct me if I'm wrong. Alright let's get started now.

## Step 1, installing dependencies

This tutorial is assuming that you are runnng Debian 10 Buster (and derivatives) or Debian 11 Bullseye (and derivatives). The first thing we need to do is update
our apt package lists so that we can download everything properly. We can do this by running

`sudo apt update`

and then running

`sudo apt upgrade -y`

to update any packages that need to be. Then we are going to install our dependencies with

`sudo apt install -y software-properties-common apparmor-utils apt-transport-https ca-certificates curl dbus jq network-manager`

This adds the necessary software to our system for Docker to properley run our containers. We also need to disable the ModemManager service for everything to work properly. We can do this by running

`sudo systemctl disable ModemManager`

and stop it by running

`sudo systemctl stop ModemManager`

### Step 1.1, Installing Docker

To install Docker, we will downlod and run the convenience script from the Docker website by running

`curl -fsSL get.docker.com | sudo sh`

this should completley download and install docker without much of any use interaction.

## Step 2, Install Home Assistant

To install Home Assistant we are going to simply clone and run the Home Assistant Supervised install script from GitHub by running

`curl -Lo installer.sh https://raw.githubusercontent.com/home-assistant/supervised-installer/master/installer.sh`

and running the script simple by using

`sudo bash installer.sh`

and that should do it. Just sit back and let the installer do it's thing.

## Step 3, Onboarding

At this point Home Assitant should be installed and the install script should have spit out an ip for you to connect to. For instance my video shows 192.168.81.128 at port 8123. Since I was using a GUI I was just able to connect to localhost instead, but you are probably installing in a headless environment so you NEED to connect to your devices hostname/local ip address. At this point you should see something like this: ![home-assistant-onboarding.png](/assets/images/docker/home-assistant-onboarding.png "home-assistant-onboarding.png")

Once your here, your golden. You can complete the setup by following the instructions and you'll have it completley set up.

## Wrapping Up

Well, congratulations! You've succesfully deployed an entire network of Docker container for running your smart home. Great job! This was a rather simple process but when I was first starting out these kind of articles were huge helps, so I hope this one will help you. Have a good rest of your day/night/whatever, and goodbye!
