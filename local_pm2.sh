#!/bin/bash 
pm2 start ecosystem.config.js && \
# pm2 start /mnt/c/Users/jaybee/Desktop/systeams/sysdevs/aja-pos/pdf_bot/local_pdf-bot-process.config.js && \
# pm2 start /mnt/c/Users/jaybee/Desktop/systeams/sysdevs/aja-pos/pdf_bot/local__cronTab.js && \
# pm2 start chromium-browser --interpreter none -- --headless --disable-gpu --disable-translate --disable-extensions --disable-background-networking --safebrowsing-disable-auto-update --disable-sync --metrics-recording-only --disable-default-apps --no-first-run --mute-audio --hide-scrollbars --disable-features=NetworkService --no-sandbox --remote-debugging-port=9222 && \
pm2 save
