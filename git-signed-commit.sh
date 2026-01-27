#!/bin/bash
# Signed commit via Git Bash (Windows). Usage: git add . && bash git-signed-commit.sh "message"
export GNUPGHOME=~/.gnupg
cd "$(git rev-parse --show-toplevel)" || exit 1
git commit -m "${1:-chore: signed commit}" -S
