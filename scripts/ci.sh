#!/usr/bin/env bash
set -euo pipefail

node --version
npm --version
npm ci
npm run build
npm test
node dist/hello.js | tee /dev/stderr | grep -q "Hello, World!"
