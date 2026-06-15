const { mainMenu, subMenus } = require('./menu');

const userSessions = new Map();

function getSession(jid) {
  if (!userSessions.has(jid)) {
    userSessions.set(jid, { menu: 'main' });
  }
  return userSessions.get(jid);
}

function resetSession(jid) {
  userSessions.set(jid, { menu: 'main' });
}

function handleMessage(text, jid) {
  const session = getSession(jid);
  const msg = text.toLowerCase().trim();

  if (msg === 'menu' || msg === '0') {
    resetSession(jid);
    return mainMenu;
  }

  if (session.menu === 'main') {
    const choice = parseInt(msg);
    if (choice >= 1 && choice <= 5) {
      const sub = subMenus[choice];
      if (sub && sub.body) {
        session.menu = `sub_${choice}`;
        session.subMenu = choice;
        return sub.body;
      }
    }
    return `Maaf, pilihan tidak valid. Silakan pilih nomor 1-5.\n\n${mainMenu}`;
  }

  if (session.menu && session.menu.startsWith('sub_')) {
    const subKey = session.subMenu;
    const sub = subMenus[subKey];

    if (msg === '0') {
      resetSession(jid);
      return mainMenu;
    }

    if (sub && sub.children) {
      const childContent = sub.children[msg];
      if (childContent) {
        session.menu = 'detail';
        session.parentMenu = subKey;
        return `${childContent}\n\nKetik *0* untuk kembali ke menu utama.`;
      }
    }

    if (subKey === 3 || subKey === 4) {
      resetSession(jid);
      return `Terima kasih telah menghubungi kami. Pesan Anda akan kami proses.\n\n${mainMenu}`;
    }

    return `Maaf, pilihan tidak valid.\n\n${sub.body}`;
  }

  if (session.menu === 'detail') {
    if (msg === '0') {
      resetSession(jid);
      return mainMenu;
    }
    return `Terima kasih. Pesan Anda akan kami teruskan.\n\nKetik *0* untuk kembali ke menu utama.`;
  }

  resetSession(jid);
  return mainMenu;
}

module.exports = { handleMessage, resetSession };
