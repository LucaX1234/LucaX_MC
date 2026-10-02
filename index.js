const tmi = require("tmi.js");
const http = require("http");

const PORT = process.env.PORT || 3000;

// Kleiner Webserver für Render
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("LucaX_MC ist online! 🤖");
});

server.listen(PORT, () => {
    console.log(`Webserver läuft auf Port ${PORT}`);
});

// Twitch-Bot
const client = new tmi.Client({
    options: {
        debug: true
    },

    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },

    channels: [
        process.env.TWITCH_CHANNEL
    ]
});

client.connect()
    .then(() => {
        console.log("🤖 LucaX_MC ist mit Twitch verbunden!");
    })
    .catch((error) => {
        console.error("❌ Twitch-Verbindung fehlgeschlagen:", error);
    });

client.on("message", (channel, tags, message, self) => {
    if (self) return;

    const command = message.toLowerCase().trim();

    if (command === "!commands") {
        client.say(
            channel,
            "🤖 LucaX_MC Commands: !commands | !discord | !uptime"
        );
    }

    if (command === "!discord") {
        client.say(
            channel,
            "💬 Discord-Link kommt noch!"
        );
    }

    if (command === "!uptime") {
        client.say(
            channel,
            "⏱️ LucaX_MC ist online!"
        );
    }
});
