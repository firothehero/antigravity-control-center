#!/bin/bash
# Antigravity Control Center - Upgrade Script
set -e

echo "=== Upgrading Antigravity Control Center Extension ==="

# Navigate to project root
cd "$(dirname "$0")"

# 1. Clean previous VSIX packages
echo "Cleaning old VSIX packages..."
rm -f *.vsix

# 2. Re-install & build
echo "Rebuilding extension dependencies and assets..."
npm install
npm run build

# 3. Package to VSIX
echo "Packaging new VSIX installer..."
npx @vscode/vsce package --no-dependencies --allow-missing-repository --allow-star-activation -o antigravity-control-center-0.1.0.vsix

VSIX_FILE=$(ls *.vsix | head -n 1)

if [ -z "$VSIX_FILE" ]; then
    echo "❌ Error: VSIX package file could not be generated."
    exit 1
fi

echo "Generated VSIX: $VSIX_FILE"

# 4. Install into IDE
echo "Re-installing extension..."
if command -v code &> /dev/null; then
    code --install-extension "$VSIX_FILE" --force
elif command -v antigravity &> /dev/null; then
    antigravity --install-extension "$VSIX_FILE" --force
else
    echo "⚠️ Warning: Neither 'code' nor 'antigravity' command-line tools were found in your PATH."
    echo "👉 You can install it manually in the IDE by going to Extensions -> '...' menu -> 'Install from VSIX...' and selecting:"
    echo "   $(pwd)/$VSIX_FILE"
fi

echo "=== Upgrade Sequence Completed! ==="
