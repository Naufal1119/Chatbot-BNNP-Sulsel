const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const pino = require('pino');

let sock = null;

async function startConnection(onMessage) {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    browser: ['WA Chatbot', 'Chrome', '1.0.0']
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('\n⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜');
      console.log('⬜             SCAN QR CODE INI DENGAN WHATSAPP ANDA             ⬜');
      console.log('⬜        Buka WhatsApp > 3 Titik > Linked Devices               ⬜');
      console.log('⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜\n');
      qrcode.generate(qr, { small: true });
      console.log('\n⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜\n');
    }

    if (connection === 'open') {
      console.log('✓ WhatsApp terhubung!');
      console.log(`✓ Nomor: ${update.qr ? 'Menunggu...' : sock.user?.id || 'Terkoneksi'}`);
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('✗ Koneksi terputus. Reconnect:', shouldReconnect);
      if (shouldReconnect) {
        startConnection(onMessage);
      } else {
        console.log('✗ WhatsApp terlogout. Hapus folder auth_info dan jalankan ulang.');
      }
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async (messageUpsert) => {
    const message = messageUpsert.messages[0];
    if (!message.key.fromMe && message.message?.conversation) {
      const text = message.message.conversation;
      const jid = message.key.remoteJid;
      if (onMessage) {
        await onMessage(sock, text, jid);
      }
    }
  });

  return sock;
}

function getSock() {
  return sock;
}

module.exports = { startConnection, getSock };
