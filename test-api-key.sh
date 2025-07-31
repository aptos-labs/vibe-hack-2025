#!/bin/bash
# Test script for new API key
# Usage: ./test-api-key.sh YOUR_REAL_API_KEY

if [ -z "$1" ]; then
    echo "Usage: ./test-api-key.sh YOUR_REAL_API_KEY"
    exit 1
fi

API_KEY="$1"

echo "🧪 Testing API key: ${API_KEY:0:20}..."

# Test API key with Aptos fullnode
curl -s -H "Authorization: Bearer $API_KEY" \
"https://fullnode.testnet.aptoslabs.com/v1/accounts/0x5bd3338c9f09619c16a5207af405b84e98d041c8194ea90c2243be7dba513423/modules" | \
if grep -q "name"; then
    echo "✅ API key works!"
else
    echo "❌ API key failed or rate limited"
fi