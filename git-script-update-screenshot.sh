#!/bin/bash

COMMIT_MSG=$1
git add .
git commit -m "$COMMIT_MSG"
git push origin main