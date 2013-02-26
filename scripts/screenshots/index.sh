#!/bin/bash
echo 'screenshot taking'
export DISPLAY=:0.0
/usr/bin/xwd -root -out file.xwd
convert file.xwd current.jpg
convert current.jpg -resize 320 mini.jpg
cp current.jpg ./app/static
cp mini.jpg ./app/static

