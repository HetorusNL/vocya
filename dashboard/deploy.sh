#!/bin/bash
set -e

echo "starting deployment of vocya dashboard"

echo ""
echo "removing existing content from folder"
echo "sudo rm -r /data/caddy-data/vocya.hetorus.nl/*"
sudo rm -rf /data/caddy-data/vocya.hetorus.nl/*

echo ""
echo "copying build vocya dashboard to the server root"
echo "cp -r build/* /data/caddy-data/vocya.hetorus.nl/"
cp -r build/* /data/caddy-data/vocya.hetorus.nl/

echo ""
echo "finished deployment of vocya dashboard!"
