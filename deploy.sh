#!/bin/bash

npm run build
rsync -a build/ root@instantchatbot.net:/var/www/instantchatbot.net/

