#!/bin/bash

set -e
git init
echo '__pycache__/' > .gitignore
git config user.email "admin@sentry.local"
git config user.name "admin"
git add .
git commit -m 'Initial commit'
