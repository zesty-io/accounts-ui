#!/bin/bash

# What is the purpose of this script? Why was it made?

# Problem
# Cypress tests require logging as an existing user and we don't wan't to check the existing users password into version control.

# Solution
# Keep the credentials in the encrypted ci secrets file in the gcp bucket for ci and source the creds from there.

echo "***** REMOVING OUTDATED SECRETS *****"
rm ./ci/.env && rm ./ci/.enc

echo "***** PULLING LATEST CI ENVIRONMENT CONFIGURATION *****"

BUCKET="gs://ci_secrets_dev"

gsutil cp $BUCKET/ci.enc ./ci/.enc
if [ $? -ne 0 ]; then
    echo "failed to pull ciphertext file from $BUCKET" && exit 1
fi

echo "***** DECRYPTING CI ENVIRONMENT CONFIGURATION *****"

gcloud kms decrypt \
    --keyring services \
    --key ci \
    --project zesty-stage \
    --location global \
    --ciphertext-file ./ci/.enc \
    --plaintext-file ./ci/.env

if [ $? -ne 0 ]; then
    echo "failed to decrypt ci secrets"
    echo "if you received a permissions error ask your manager to make sure you have the roles/cloudkms.cryptoKeyDecrypter role" && exit 1
fi

echo "***** SUCCESSFULLY DOWNLOADED CI ENVIRONMENT CONFIGURATION *****"