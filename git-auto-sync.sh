#!/bin/bash
# Auto-sync 30PX Website → GitHub
# Runs as a background loop, checking every 60 seconds.
# Usage: source this or run: nohup bash git-auto-sync.sh &

REPO_DIR="/Users/aliraza/Documents/BSOM-Posts/30PX/Website"
LOG_FILE="$HOME/Library/Logs/git-auto-sync.log"
LOCK_FILE="/tmp/git-auto-sync.lock"
BRANCH="main"

# Prevent duplicate instances
if [ -f "$LOCK_FILE" ] && kill -0 "$(cat "$LOCK_FILE")" 2>/dev/null; then
    exit 0
fi
echo $$ > "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exit' INT TERM EXIT

echo "$(date): Auto-sync started (PID $$)" >> "$LOG_FILE"

while true; do
    cd "$REPO_DIR" || { echo "$(date): Cannot cd to $REPO_DIR" >> "$LOG_FILE"; sleep 60; continue; }

    if [ -n "$(git status --porcelain)" ]; then
        git add -A
        MSG="Auto-sync: $(date '+%Y-%m-%d %H:%M:%S')"
        git commit -m "$MSG" >> "$LOG_FILE" 2>&1
        git push origin "$BRANCH" >> "$LOG_FILE" 2>&1

        if [ $? -eq 0 ]; then
            echo "$(date): Pushed — $MSG" >> "$LOG_FILE"
        else
            echo "$(date): Push FAILED" >> "$LOG_FILE"
        fi
    fi

    sleep 60
done
