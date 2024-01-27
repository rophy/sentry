#!/bin/bash

set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

ls ${SCRIPT_DIR}/*.patch | sort > /tmp/patches.txt

while read p; do
  echo "Applying ${p}..."
  git apply "${p}"
  git add .
  git commit -m "Apply patch ${p}"
done </tmp/patches.txt

