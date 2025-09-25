FROM node:20-alpine

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le reste du projet
COPY . .

# Lancer le bot via node start
CMD ["node", "--no-warnings", "src/bot.js"]