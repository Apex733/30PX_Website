#!/bin/bash
# Auto-sync script for 30PX Website → GitHub
# Checks for changes, commits, and pushes automatically.

REPO_DIR="/Users/aliraza/Documents/BSOM-Posts/30PX/Website"
LOG_FILE="$HOME/Library/Logs/git-auto-sync.log"
BRANCH="main"

cd "$REPO_DIR" || { echo "$(date): Cannot cd to $REPO_DIR" >> "$LOG_FILE"; exit 1; }

# Check if there are any changes (tracked or untracked)
if [ -n "$(git status --porcelain)" ]; then
    git add -A
    COMMIT_MSG="Auto-sync: $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$COMMIT_MSG" >> "$LOG_FILE" 2>&1
    git push origin "$BRANCH" >> "$LOG_FILE" 2>&1

    if [ $? -eq 0 ]; then
        echo "$(date): Successfully pushed — $COMMIT_MSG" >> "$LOG_FILE"
    else
        echo "$(date): Push FAILED" >> "$LOG_FILE"
    fi
else
    # No changes — stay silent to keep the log clean
    :
fi
