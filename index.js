const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    if (msg.body.match(linkRegex)) {
        if (msg.from.endsWith('@g.us')) { 
            await msg.delete(true);
        }
    }
});

client.initialize();
