#!/bin/bash

# What is the purpose of this script? Why was it made?

# Problem
# The test can not run properly because of DNS routing issues for the url we want to use.

# Solution
# Add dns entries into the /etc/hosts file to support being able to run the tests.

echo "***** ADDING MISSING ENTRIES TO /etc/hosts FILE IF NECESSARY"

if [ $(cat /etc/hosts | grep 'accounts.dev.zesty.io' | wc -l) -gt 0 ]; then
echo "entry '127.0.0.1 'accounts.dev.zesty.io' already exists in /etc/hosts"
else
    echo "adding entry for '127.0.0.1 accounts.dev.zesty.io' to /etc/hosts"
    sudo echo "127.0.0.1 accounts.dev.zesty.io" | sudo tee -a /etc/hosts
    if [ $? -ne 0 ]; then
        echo "failed to add entry for '127.0.0.1 accounts.dev.zesty.io'"
        exit 1
    fi
fi