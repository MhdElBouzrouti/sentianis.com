#!/usr/bin/env bash
# ==============================================================================
# Setup DNS for sentianis.com on Porkbun
#
# GitHub Pages Custom Domain Requirements:
# 1. Apex Domain (@ / sentianis.com):
#    A -> 185.199.108.153
#    A -> 185.199.109.153
#    A -> 185.199.110.153
#    A -> 185.199.111.153
# 2. Subdomain (www):
#    CNAME -> mhdelbouzrouti.github.io
# ==============================================================================

set -e

DOMAIN="sentianis.com"
GITHUB_USER="mhdelbouzrouti"
CNAME_TARGET="${GITHUB_USER}.github.io"

echo "========================================================"
echo "    PORKBUN DNS CONFIGURATION FOR SENTIANIS.COM        "
echo "========================================================"

# Check if environment variables are provided
API_KEY="${PORKBUN_API_KEY:-$1}"
SECRET_KEY="${PORKBUN_SECRET_KEY:-$2}"

if [ -z "$API_KEY" ] || [ -z "$SECRET_KEY" ]; then
    echo "Porkbun API Key or Secret Key not provided via environment or arguments."
    echo ""
    echo "To configure automatically via Porkbun API:"
    echo "  export PORKBUN_API_KEY=\"pk1_...\""
    echo "  export PORKBUN_SECRET_KEY=\"sk1_...\""
    echo "  ./scripts/setup-porkbun-dns.sh"
    echo ""
    echo "--------------------------------------------------------"
    echo "MANUAL CONFIGURATION GUIDE (in Porkbun Dashboard):"
    echo "1. Connect to https://porkbun.com/account/domains"
    echo "2. Find domain '$DOMAIN' and click 'Details' -> 'DNS Records' (Edit)"
    echo "3. Remove any default parking / parking page records"
    echo "4. Add the following 4 Type A records (Leave Subdomain empty or '@'):"
    echo "   - Type: A | Host: (blank or @) | Answer: 185.199.108.153 | TTL: 600"
    echo "   - Type: A | Host: (blank or @) | Answer: 185.199.109.153 | TTL: 600"
    echo "   - Type: A | Host: (blank or @) | Answer: 185.199.110.153 | TTL: 600"
    echo "   - Type: A | Host: (blank or @) | Answer: 185.199.111.153 | TTL: 600"
    echo "5. Add the CNAME record for 'www':"
    echo "   - Type: CNAME | Host: www | Answer: $CNAME_TARGET | TTL: 600"
    echo "6. Click Submit. Propagation usually takes 1 to 10 minutes."
    echo "--------------------------------------------------------"
    exit 0
fi

echo "Authenticating with Porkbun API..."
PING_RESP=$(curl -s -X POST "https://api.porkbun.com/api/json/v3/ping" \
  -H "Content-Type: application/json" \
  -d "{\"apikey\":\"$API_KEY\",\"secretapikey\":\"$SECRET_KEY\"}")

if ! echo "$PING_RESP" | grep -q '"status":"SUCCESS"'; then
    echo "Error: Porkbun authentication failed: $PING_RESP"
    echo "Please ensure API Access is enabled on your Porkbun domain settings."
    exit 1
fi

echo "Authentication successful!"

IPS=("185.199.108.153" "185.199.109.153" "185.199.110.153" "185.199.111.153")

for IP in "${IPS[@]}"; do
    echo "Creating A record: $DOMAIN -> $IP..."
    curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/create/$DOMAIN" \
      -H "Content-Type: application/json" \
      -d "{\"apikey\":\"$API_KEY\",\"secretapikey\":\"$SECRET_KEY\",\"name\":\"\",\"type\":\"A\",\"content\":\"$IP\",\"ttl\":\"600\"}"
    echo ""
done

echo "Creating CNAME record: www.$DOMAIN -> $CNAME_TARGET..."
curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/create/$DOMAIN" \
  -H "Content-Type: application/json" \
  -d "{\"apikey\":\"$API_KEY\",\"secretapikey\":\"$SECRET_KEY\",\"name\":\"www\",\"type\":\"CNAME\",\"content\":\"$CNAME_TARGET\",\"ttl\":\"600\"}"
echo ""

echo "Porkbun DNS configuration completed!"
