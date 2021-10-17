ionic build --prod
http-server ./www -p 8200 --ssl --cert /etc/letsencrypt/live/hps-crm.fr/fullchain.pem --key /etc/letsencrypt/live/hps-crm.fr/privkey.pem &&