# School

#### School Management


## Deploy
### Ubuntu
git clone this project in /opt
``sudo nano /etc/systemd/system/school.service``
past this:
``
[Unit]
Description=React School App Service
After=network.target

[Service]
ExecStart=/usr/bin/node /opt/school/pages/index.js
WorkingDirectory=/opt/school
Restart=always
User=root
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
``
