#!/bin/bash

# new-log.sh
# Generates a new MDX post with YAML frontmatter

if [ -z "$1" ]; then
  echo "Usage: ./new-log.sh <slug>"
  exit 1
fi

SLUG=$1
DATE=$(date +"%Y-%m-%d")
FILEPATH="src/content/log/${SLUG}.mdx"

mkdir -p src/content/log

cat <<EOF > $FILEPATH
---
title: "Untitled"
date: "${DATE}"
excerpt: ""
---

Write your log here...
EOF

echo "Created new log entry at $FILEPATH"
