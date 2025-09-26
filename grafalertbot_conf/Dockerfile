FROM node:20-alpine

WORKDIR /app

# Installer git pour cloner le bot
RUN apk add --no-cache git

# Version du bot
ARG VERSION=1.0.1

# Cloner le repo du bot
RUN git clone --branch v${VERSION} https://github.com/TaoMelais/GrafAlertBot.git /app

# Installer les dépendances
RUN npm install --production

# Copier le reste du projet
COPY . .

# Lancer le bot via node start
CMD ["node", "--no-warnings", "bot.js"]