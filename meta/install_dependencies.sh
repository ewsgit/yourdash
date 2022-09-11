#!/bin/bash

#
# Copyright © 2022 Ewsgit
# All rights reserved.
# Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
#

echo "#####################################"
echo "  DevDash | Installing dependencies  "
echo "#####################################"

echo "#####################################"
echo "          Installing  Tauri          "
echo "#####################################"

source /etc/os-release
if [[ $PRETTY_NAME == "Arch Linux" || $PRETTY_NAME == "Artix" || $PRETTY_NAME == "Manjaro" ]]; then
  echo "Detected Arch Linux Distro"
  sudo pacman -Syu
  sudo pacman -S --needed \
    webkit2gtk \
    base-devel \
    curl \
    wget \
    openssl \
    appmenu-gtk-module \
    gtk3 \
    libappindicator-gtk3 \
    librsvg \
    libvips
fi

if [[ $PRETTY_NAME == "Ubuntu" || $PRETTY_NAME == "Debian" ]]; then
  echo "Detected Ubuntu Linux Distro"
  sudo apt update
  sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
fi

if [ $PRETTY_NAME == "Fedora" ]; then
  sudo dnf check-update
  sudo dnf install webkit2gtk3-devel.x86_64 \
    openssl-devel \
    curl \
    wget \
    libappindicator-gtk3 \
    librsvg2-devel
  sudo dnf group install "C Development Tools and Libraries"
fi

echo "#####################################"
echo "           Installing Rust           "
echo "#####################################"

curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

cd ./src

cd ./frontend/

npm i

cd ../desktop_client/

npm i

cd ./tauri-remake/

npm i

cd ../../backend/personal/

npm i

cd ../../../

echo "#####################################"
echo "               Done :D               "
echo "#####################################"