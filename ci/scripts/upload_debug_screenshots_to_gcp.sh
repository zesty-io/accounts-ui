#!/bin/bash

# This script is for CI only.

# What is the purpose of this script? Why was it made?

# Problem
# Cypress tests generate screenshots when they fail.
# However, we can't review them in the CI logs.

# Solution
# Persist the screenshots to our cypress_screenshots bucket in zesty-dev.

echo "****** SEARCHING FOR SCREENSHOTS OF FAILED TESTS *****"

SCREENSHOTS_DIR="/home/runner/work/accounts-ui/accounts-ui/cypress/screenshots/"

find $SCREENSHOTS_DIR -type f -name "*.png" | while read screenshot; do
    file=$(basename "$screenshot")
    echo "uploading $file"
    gsutil cp "$screenshot" gs://cypress_screenshots_accounts_ui/"$file"
    if [ $? -ne 0 ]; then
        echo "failed to upload $file"
        exit 1
    fi
done