# Foreverdale

Very early Everdale private server

## Setup

### Client

Client download (when server actually good)

**Making your own:**

1. `pip install frida-gadget`
2. `frida --version` - If none install requirements.txt, if not v16 make venv
3. `frida-gadget --frida-version 16.7.19 --sign everdale.apk`
4. Install

### Server

1. Start server via build.sh
2. Open apk then run frida.sh