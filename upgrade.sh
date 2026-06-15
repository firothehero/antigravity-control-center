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
npx @vscode/vsce package --no-dependencies --allow-missing-repository --allow-star-activation

VSIX_FILE=$(ls *.vsix | head -n 1)

if [ -z "$VSIX_FILE" ]; then
    echo "❌ Error: VSIX package file could not be generated."
    exit 1
fi

echo "Generated VSIX: $VSIX_FILE"

# 4. Install into IDE — try multiple CLI paths
ANTIGRAVITY_CLI="$HOME/.antigravity-ide/antigravity-ide/bin/antigravity-ide"

echo "Re-installing extension..."
if [ -x "$ANTIGRAVITY_CLI" ]; then
    "$ANTIGRAVITY_CLI" --install-extension "$VSIX_FILE" --force
    echo "✅ Installed via antigravity-ide CLI"
elif command -v antigravity-ide &> /dev/null; then
    antigravity-ide --install-extension "$VSIX_FILE" --force
    echo "✅ Installed via antigravity-ide (PATH)"
elif command -v code &> /dev/null; then
    code --install-extension "$VSIX_FILE" --force
    echo "✅ Installed via code CLI"
elif command -v antigravity &> /dev/null; then
    antigravity --install-extension "$VSIX_FILE" --force
    echo "✅ Installed via antigravity CLI"
else
    echo "⚠️ Warning: No IDE CLI tool found."
    echo "👉 Install manually: Extensions → ⋯ → Install from VSIX → select:"
    echo "   $(pwd)/$VSIX_FILE"
fi

echo ""
echo "=== Upgrade Complete! Reload the IDE window (Cmd+Shift+P → Reload Window) ==="
