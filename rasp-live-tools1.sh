#!/bin/bash
#sudo su
dpkg-reconfigure tzdata
sudo ntpd -gq
apt-get update
apt-get -y install python-smbus i2c-tools
apt-get -y purge fake-hwclock
sudo update-rc.d -f fake-hwclock remove
mount /dev/mmcblk0p1 /mnt
echo disable_overscan=1 >> /mnt/config.txt
echo hdmi_group=1 >> /mnt/config.txt
echo hdmi_hot_plug=1 >> /mnt/config.txt
echo hdmi_mode=33 >> /mnt/config.txt
echo disable_splash=1 >> /mnt/config.txt
echo boot_delay=0 >> /mnt/config.txt

echo elevator=deadline quiet datadev=mmcblk0p2 bootmenutimeout=0 logo.nologo console=tty3 splash loglevel=3 vt.global_cursor_default=0 plymouth.ignore-serial-consoles > /mnt/cmdline.txt

echo dtparam=i2c_arm=on >> /mnt/config.txt
echo dtoverlay=i2c-rtc,ds3231 >> /mnt/config.txt
echo i2c-bcm2708 >> /etc/modules
echo i2c-dev >> /etc/modules
echo rtc-ds1307 >> /etc/modules

modprobe i2c-bcm2708
ntpd -gq
hwclock -w
apt-get update
apt-get install -y git unclutter chromium-browser
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs
apt-get install -y build-essential
git clone https://github.com/petrix/live-tools.git
cd live-tools

npm i npm@latest -g
npm i pm2 -g
pm2 startup
npm install
pm2 start index.js
pm2 save
cp /opt/p3xx/live-tools/lib/autostart.conf /home/pi/.config/lxsession/LXDE-pi/autostart
cp /opt/p3xx/live-tools/lib/CASPAR-CG-bootloader.png /usr/share/plymouth/themes/pix/splash.png

reboot
