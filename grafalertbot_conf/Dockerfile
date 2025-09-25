FROM node:20-alpine

WORKDIR /app

# Copier uniquement les fichiers nécessaires
COPY .env ./
COPY package.json package-lock.json ./
COPY node_modules ./node_modules
COPY src ./src

# Installer les dépendances (optionnel si node_modules déjà copié)
# RUN npm install --production --silent

# Commande par défaut
CMD ["npm", "start"]
