3 containers docker sont actuellements disponible.

Container **Monitoring**:

    grafana_conf/
        send-alert/
            alerte-all-metrics.sh
            alerte-firing.sh
            alerte-ok.sh
            alerte-only-text.sh
            alerte-warning.sh
            script-loop.sh
        custom.ini
        plugins.yaml

Container **GrafAlertBot**:

    grafalertbot_conf/
        src/
            bot.js
        Dockerfile
        package.json
        .env


Container **Prometheus**:

    prometheus_conf/
        prometheus.yml

    
Fichier de configuration :

docker-compose.yml


Exécution (pour grafalertebot) : docker-compose up --build   