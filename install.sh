#!/bin/bash
# Antigravity Control Center - Install Script
set -e

echo "=== Installing Antigravity Control Center Extension ==="

# Navigate to project root
cd "$(dirname "$0")"

# 1. Install npm dependencies
echo "Installing NPM dependencies..."
npm install

# 2. Build the extension
echo "Compiling extension..."
npm run build

# 3. Package to VSIX
echo "Packaging extension into VSIX..."
npx @vscode/vsce package --no-dependencies --allow-missing-repository --allow-star-activation -o antigravity-control-center-0.1.0.vsix

# Find the generated VSIX file
VSIX_FILE=$(ls *.vsix | head -n 1)

if [ -z "$VSIX_FILE" ]; then
    echo "❌ Error: VSIX package file could not be generated."
    exit 1
fi

echo "Generated VSIX: $VSIX_FILE"

# 4. Install into IDE
echo "Attempting to install extension..."
if command -v code &> /dev/null; then
    echo "Installing via 'code' command..."
    code --install-extension "$VSIX_FILE"
elif command -v antigravity &> /dev/null; then
    echo "Installing via 'antigravity' command..."
    antigravity --install-extension "$VSIX_FILE"
else
    echo "⚠️ Warning: Neither 'code' nor 'antigravity' command-line tools were found in your PATH."
    echo "👉 You can install it manually in the IDE by going to Extensions -> '...' menu -> 'Install from VSIX...' and selecting:"
    echo "   $(pwd)/$VSIX_FILE"
fi

echo "=== Installation Sequence Completed! ==="
