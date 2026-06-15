const { startConnection, getSock } = require('./src/connection');
const { handleMessage } = require('./src/messages');

async function main() {
  console.log('Memulai WhatsApp Chatbot...');
  console.log('Tunggu QR Code muncul di terminal untuk scan.\n');

  await startConnection(async (sock, text, jid) => {
    try {
      const reply = handleMessage(text, jid);
      if (reply) {
        await sock.sendMessage(jid, { text: reply });
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  });

  if (process.env.PORT) {
    const http = require('http');
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('WhatsApp Bot is running!');
    });
    server.listen(process.env.PORT, () => {
      console.log(`HTTP server running on port ${process.env.PORT}`);
    });
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
