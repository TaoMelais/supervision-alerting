require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const CHANNEL_ID = process.env.CHANNEL_ID;
const PORT = process.env.PORT || 4000;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
// const ROLE_ID = process.env.ROLE_ID || null;
const NAME_BOT = process.env.NAME_BOT;

// Discord ready
client.once('ready', () => {
    console.log(`✅ ${NAME_BOT} connecté en tant que ${client.user.tag}`);
});

// Fonction pour déterminer la couleur de l'embed
function getColor(status) {
    switch (status.toLowerCase()) {
        case 'ok': return 0x00ff00;       // vert
        case 'warning': return 0xffa500;  // orange
        case 'firing':
        case 'alerting': return 0xff0000; // rouge
        default: return 0xff0000;
    }
}

// Endpoint Grafana
app.post('/grafana', async (req, res) => {
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);

        // Déterminer le status depuis Grafana
        const status = req.body.state || req.body.status || 'firing';
        const title = req.body.title || 'Alerte Grafana 🚨';
        const message = req.body.message || JSON.stringify(req.body, null, 2);

        // Création de l'embed
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(message)
            .setColor(getColor(status))
            .setTimestamp()
            .setFooter({ text: `Status: ${status} | Envoyé par ${NAME_BOT} ⚡` });

        // Ajouter des champs si Grafana envoie evalMatches
        if (Array.isArray(req.body.evalMatches) && req.body.evalMatches.length > 0) {
            req.body.evalMatches.forEach(match => {
                const metric = match.metric || 'Metric';
                const value = match.value ?? 'N/A';
                embed.addFields({ name: metric, value: String(value), inline: true });
            });
        }

        // Envoi dans Discord
        if (channel) {
            const content = (ROLE_ID && (status.toLowerCase() === 'firing' || status.toLowerCase() === 'alerting'))
                ? `<@&${ROLE_ID}>`
                : null;
            await channel.send({ content, embeds: [embed] });
        }

        console.log(`✅ Alerte envoyée : ${title} [${status}]`);
        res.json({ status: 'ok' });
    } catch (err) {
        console.error('❌ Erreur lors de l’envoi Discord :', err.message);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Express server
app.listen(PORT, () => console.log(`🌐 Serveur Express sur le port ${PORT}`));

client.login(DISCORD_TOKEN);

// Fermeture propre
process.on('SIGINT', async () => {
    console.log('⏹️ Fermeture du bot...');
    await client.destroy();
    process.exit(0);
});
