#!/usr/bin/env bash

PACKAGE=lambda-scraper.zip
OUTPUT=dist
TMP=.tmp

mkdir $TMP
mkdir $OUTPUT
rm $OUTPUT/$PACKAGE

rsync -rv --exclude=node_modules --exclude=dist --exclude=.tmp . $TMP

pushd $TMP
npm install axios jquery jsdom --save
zip -r ../$OUTPUT/$PACKAGE ./*
popd
