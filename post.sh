#!/bin/sh

# How to use
# ./post "Title" "Description"g

binpath=$(cd `dirname $0`; pwd)
postpath="${binpath}/_posts"
date=$(date +"%Y-%m-%d")
time=$(date +"%T")
filename="$postpath/$date-$(echo $1 | sed 's/[ _+()!@#$%^&*.]/-/g' | sed 's/-+/-/g' | tr [:upper:] [:lower:]).markdown"
touch $filename
echo "---
layout: post
title: \"$1\"
description:
date: $date $time
categories: \"$2\"
---" > $filename
if [ $? -eq 0 ];then
    echo "\033[32;40mAdd post ${filename} Successful! \033[0m"
else
    echo "\033[31;40mTo add ${filename} Fail! \033[0m"
fi