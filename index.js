const tmi = require("tmi.js");

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

client.connect();

client.on("connected", () => {
    console.log("🤖 LucaX_MC ist mit Twitch verbunden!");
});

client.on("message", (channel, tags, message, self) => {
    if (self) return;

    if (message.toLowerCase() === "!commands") {
        client.say(channel, "🤖 Commands: !commands | !discord | !uptime");
    }

    if (message.toLowerCase() === "!discord") {
        client.say(channel, "💬 Discord: Dein Discord-Link kommt hier rein!");
    }

    if (message.toLowerCase() === "!uptime") {
        client.say(channel, "⏱️ Der Uptime-Command kommt als Nächstes!");
    }
});
