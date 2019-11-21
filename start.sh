#!/bin/bash

ps -ef | grep webpack-dev-server | awk '{print $2}' | xargs kill -9

rm -fr .temp
rm -fr dist/*
 
THIS_DIR=$(dirname "$0")
pushd "$THIS_DIR"

npm run build
npm run serve & 

popd
