#!/bin/bash

# Read the JSON file
ENV_VARS=$(jq -r 'to_entries|map("\(.key)=\(.value|tostring)")|.[]' env.json | paste -sd, -)

# Deploy to Google Cloud Run
gcloud run deploy --platform managed --set-env-vars $ENV_VARS