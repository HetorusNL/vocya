#!/bin/bash
set -e

echo "starting deployment of vocya dashboard"

if grep -q "DebianVM" "/etc/hostname"; then
    echo "this script is executed on the machine that hosts the website"

    echo ""
    echo "removing existing content from folder"
    echo "sudo rm -r /data/caddy-data/vocya.hetorus.nl/*"
    sudo rm -rf /data/caddy-data/vocya.hetorus.nl/*

    echo ""
    echo "copying build vocya dashboard to the server root"
    echo "cp -r build/* /data/caddy-data/vocya.hetorus.nl/"
    cp -r build/* /data/caddy-data/vocya.hetorus.nl/
else
    echo "this script is executed on a different machine than the website hoster"

    echo ""
    echo "making sure server root mount point exists"
    echo "sudo mkdir /mnt/r"
    sudo mkdir -p /mnt/r

    echo ""
    echo "make sure that server root is mounted"
    echo "sudo mount -t drvfs R: /mnt/r"
    sudo mount -t drvfs R: /mnt/r

    echo ""
    echo "removing existing content from folder"
    echo "sudo rm -r /mnt/r/vocya.hetorus.nl/*"
    sudo rm -rf /mnt/r/vocya.hetorus.nl/*

    echo ""
    echo "copying vocya dashboard to the server root"
    echo "cp -r build/* /mnt/r/vocya.hetorus.nl/"
    cp -r build/* /mnt/r/vocya.hetorus.nl/
fi

echo ""
echo "finished deployment of vocya dashboard!"
