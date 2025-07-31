#!/bin/bash

echo "🚀 Easy Project Initialization Setup"
echo "===================================="
echo ""

# Check if private key is provided as argument
if [ -z "$1" ]; then
    echo "❌ Error: Private key required"
    echo ""
    echo "Usage: ./scripts/easy-setup.sh YOUR_PRIVATE_KEY"
    echo ""
    echo "Example: ./scripts/easy-setup.sh 0x1234567890abcdef..."
    echo ""
    echo "⚠️  Make sure your private key is for the account that deployed the contract:"
    echo "   Address: 0x5bd3338c9f09619c16a5207af405b84e98d041c8194ea90c2243be7dba513423"
    echo ""
    exit 1
fi

# Set the private key (remove 0x prefix if present)
PRIVATE_KEY="$1"
if [[ $PRIVATE_KEY == 0x* ]]; then
    PRIVATE_KEY="${PRIVATE_KEY:2}"
fi

echo "🔑 Setting up private key..."
export APTOS_PRIVATE_KEY="$PRIVATE_KEY"

echo "📋 Initializing projects in smart contract..."
echo "   This will initialize all 4 projects:"
echo "   - Project '1' (AptosRaise)"
echo "   - Project '2' (AptosTodo)"  
echo "   - Project 'mdoy56jg-ej1gw' (On Aptos)"
echo "   - Project 'mdrmvoex-hx59o' (aptos-feature-explorer)"
echo ""

# Run the initialization
npx tsx scripts/initialize-projects.ts

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! All projects are now initialized!"
    echo "✅ The voting system should work now - no more warnings!"
    echo ""
    echo "🔄 Refresh your app to see the changes take effect."
else
    echo ""
    echo "❌ Initialization failed. Check the error messages above."
fi