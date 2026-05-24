#!/bin/bash
# Antigravity Control Center - Build Script
set -e

echo "=== Building Antigravity Control Center Extension ==="

# Navigate to project root directory
cd "$(dirname "$0")"

# Compile and Bundle
echo "Bundling extension with esbuild..."
npm run build

echo "=== Build Complete! ==="
