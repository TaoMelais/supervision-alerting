FROM grafana/grafana-oss:12.1.1

WORKDIR /app

# Installer git pour cloner le bot
USER root
RUN apk add --no-cache git

# Version du bot
USER grafana
ARG VERSION=main

# Cloner le repo du bot
RUN git clone --branch ${VERSION} https://github.com/TaoMelais/script_sh.git /app