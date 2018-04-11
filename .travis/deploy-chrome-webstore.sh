#!/bin/bash
set -ev;

webstore upload --source dist/chrome.zip --extension-id $GWS_EXTENSION_ID --client-id $GWS_CLIENT_ID --client-secret $GWS_CLIENT_SECRET --refresh-token $GWS_REFRESH_TOKEN
webstore publish --extension-id $GWS_EXTENSION_ID