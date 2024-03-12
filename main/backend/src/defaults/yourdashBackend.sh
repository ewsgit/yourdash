#!/bin/bash
#
# Copyright ©2024 @Ewsgit and YourDash contributors.
# YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
#

cd /yourdash || exit
sudo git pull
yarn install
cd main/backend || exit
yarn run start
