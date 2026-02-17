#!/bin/bash

# Get today's date in DD.MM.YYYY format
TODAY=$(date +"%d.%m.%Y")

# Update the buildNumber in app.json
sed -i '' "s/\"buildNumber\": \"[0-9]\{2\}\.[0-9]\{2\}\.[0-9]\{4\}\"/\"buildNumber\": \"$TODAY\"/" app.json

echo "iOS build number updated to: $TODAY"