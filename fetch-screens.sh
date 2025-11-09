#!/bin/bash

git fetch origin visuals
git checkout origin/visuals -- tests/visual-tests.spec.ts-snapshots/