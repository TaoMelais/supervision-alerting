FROM node:20-alpine

WORKDIR /app

# Installer git pour cloner ton second repo
RUN apk add --no-cache git

# Version du bot
ARG VERSION=1.0.0

# Cloner le repo du bot (remplace par ton URL réelle)
RUN git clone --branch main https://github.com/TaoMelais/GrafAlertBot.git /app

# Installer les dépendances
RUN npm install --production

# Copier le reste du projet
COPY . .

# Lancer le bot via node start
CMD ["node", "--no-warnings", "bot.js"]