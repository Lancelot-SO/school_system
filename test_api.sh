#!/bin/bash
# Get token from the running frontend's localStorage isn't possible via CLI,
# so let's test the endpoint availability first
echo "=== Testing GET /api/teachers ==="
curl -s -w "\nHTTP_CODE: %{http_code}\n" https://lumi-api.artfricastudio.com/api/teachers \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" 2>&1 | head -5

echo ""
echo "=== Testing POST /api/teachers (without auth) ==="
curl -s -w "\nHTTP_CODE: %{http_code}\n" -X POST https://lumi-api.artfricastudio.com/api/teachers \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test"}' 2>&1 | head -5
