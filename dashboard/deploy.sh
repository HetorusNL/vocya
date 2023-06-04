#!/bin/bash

set -euxo pipefail

DEPLOYMENT_FOLDER=/docker/volumes/caddy/srv/vocya.hetorus.nl

echo "starting deployment of vocya dashboard"
echo "deploying to raptor:$DEPLOYMENT_FOLDER"
echo "this will delete everything in the folder and deploys vocya dashboard"
read -p "Are you sure? " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo "removing existing content from folder"
    ssh raptor sudo rm -rf $DEPLOYMENT_FOLDER/*

    echo ""
    echo "copying build vocya dashboard to the server root"
    rsync --rsync-path="sudo rsync" -av build/* raptor:$DEPLOYMENT_FOLDER/

    echo ""
    echo "changing owner of the deployed files to root:root"
    ssh raptor sudo chown -R root:root $DEPLOYMENT_FOLDER/*

    echo ""
    echo "finished deployment of vocya dashboard!"
fi
