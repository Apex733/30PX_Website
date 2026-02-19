# Git Auto-Sync Setup

## Overview

This project auto-syncs to GitHub every **60 seconds**. Any file change in this folder is automatically committed and pushed — no manual `git add/commit/push` needed.

- **Repo:** `https://github.com/Apex733/30PX_Website`
- **Branch:** `main`
- **Remote:** `origin`

## How It Works

A background shell script (`git-auto-sync.sh`) runs in a loop:

1. Checks `git status --porcelain` for uncommitted changes
2. If changes exist → `git add -A` → `git commit` → `git push origin main`
3. Sleeps 60 seconds, then repeats
4. Uses a lock file (`/tmp/git-auto-sync.lock`) to prevent duplicate instances
5. Logs all activity to `~/Library/Logs/git-auto-sync.log`

## Auto-Start

The sync process auto-starts via a block in `~/.zshrc`. Whenever a new Terminal window opens, it checks if the sync is already running — if not, it starts it in the background.

## Key Files

| File | Location | Purpose |
|------|----------|---------|
| `git-auto-sync.sh` | This directory | Background sync loop script |
| `.gitignore` | This directory | Excludes `git-auto-sync.sh` from commits |
| `~/.zshrc` | Home directory | Auto-starts sync on Terminal open |
| `/tmp/git-auto-sync.lock` | Temp | Stores PID to prevent duplicates |
| `~/Library/Logs/git-auto-sync.log` | Logs | All sync activity logged here |

## Commands

```bash
# Check if sync is running
ps aux | grep git-auto-sync | grep -v grep

# View live log
tail -f ~/Library/Logs/git-auto-sync.log

# Stop sync
kill $(cat /tmp/git-auto-sync.lock)

# Restart sync
nohup bash /Users/aliraza/Documents/BSOM-Posts/30PX/Website/git-auto-sync.sh > /dev/null 2>&1 &
```

## Important Notes

- Commit messages are auto-generated: `Auto-sync: YYYY-MM-DD HH:MM:SS`
- After a Mac restart, open Terminal once to resume sync
- macOS LaunchAgents and crontab were not used because macOS TCC (privacy) blocks them from accessing `~/Documents`
- The `bash -c` background process approach was chosen because Terminal inherits Full Disk Access permissions
