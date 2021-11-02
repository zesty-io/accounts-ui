#!/bin/bash

# What is the purpose of this script? Why was it made?

# Problem
# When cypress tests fail in CI, debug screenshots are uploaded to our cypress_screenshots bucket in zesty-dev.
# The dev has to pull them manually from the bucket to review them using gsutil or through the UI.

# Solution
# Add a simple script that abstracts the gsutil command away and making sure the dir exists.

echo "***** PULLING DEBUG SCREENSHOTS FOR LAST CI RUN *****"

PROJECT_ROOT=$(git rev-parse --show-toplevel)

SCREENSHOTS_DIR=$PROJECT_ROOT/cypress/screenshots/ci/

mkdir -p $SCREENSHOTS_DIR

gsutil cp gs://cypress_screenshots_accounts_ui/* $SCREENSHOTS_DIR/
if [ $? -ne 0 ]; then
    echo "failed to download ci screenshots"
    exit 1
fi

echo "***** SUCCESSFULLY DOWNLOADED CI SCREENSHOTS *****"
echo "saved to: $SCREENSHOTS_DIR"
