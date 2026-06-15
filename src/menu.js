const mainMenu = `
*Halo! Selamat datang di Layanan Chatbot*

Silakan pilih menu di bawah ini dengan membalas nomor:

1️⃣ *Informasi Layanan*
2️⃣ *Cek Status*
3️⃣ *Panduan Pendaftaran*
4️⃣ *Hubungi Customer Service*
5️⃣ *FAQ*

Ketik *0* untuk mengulang menu ini
Ketik *menu* kapan saja untuk kembali ke menu utama
`;

const subMenus = {
  1: {
    title: '*INFORMASI LAYANAN*',
    body: `Berikut adalah layanan yang tersedia:

a. Layanan Pengaduan
b. Informasi Produk
c. Jadwal Operasional
d. Lokasi Kantor

Ketik huruf (a/b/c/d) untuk detail lebih lanjut.
Ketik *0* untuk kembali ke menu utama.`,
    children: {
      a: 'Untuk layanan pengaduan, silakan hubungi kami di nomor CS atau kirimkan detail keluhan Anda dengan format:\n\n*Nama:*\n*Keluhan:*\n*Tanggal Kejadian:*\n\nKami akan merespon dalam 1x24 jam.',
      b: 'Kami menyediakan berbagai produk dan layanan. Untuk info lebih lanjut, silakan kunjungi website resmi kami atau hubungi customer service.',
      c: 'Jam operasional kami:\n\nSenin - Jumat: 08.00 - 17.00\nSabtu: 08.00 - 14.00\nMinggu & Hari Libur: Tutup',
      d: 'Kantor pusat kami berlokasi di:\n\nJl. Contoh Alamat No. 123\nJakarta Pusat, 12345\n\nCabang lain dapat dilihat di website resmi.'
    }
  },
  2: {
    title: '*CEK STATUS*',
    body: `Silakan pilih:

a. Cek Status Pendaftaran
b. Cek Status Pengaduan
c. Cek Status Pembayaran

Ketik huruf (a/b/c) untuk memilih.
Ketik *0* untuk kembali ke menu utama.`,
    children: {
      a: 'Untuk cek status pendaftaran, silakan kirimkan nomor registrasi Anda.\n\nContoh: *REG123456*',
      b: 'Untuk cek status pengaduan, silakan kirimkan nomor tiket pengaduan Anda.\n\nContoh: *TKT789012*',
      c: 'Untuk cek status pembayaran, silakan kirimkan nomor invoice Anda.\n\nContoh: *INV345678*'
    }
  },
  3: {
    title: '*PANDUAN PENDAFTARAN*',
    body: `Berikut panduan pendaftaran:

1. Siapkan dokumen berikut:
   - KTP
   - KK
   - Foto 3x4

2. Kunjungi kantor terdekat atau daftar online melalui website

3. Isi formulir pendaftaran dengan lengkap

4. Tunggu konfirmasi via WhatsApp/Email

Untuk info lebih lanjut, hubungi CS kami.
Ketik *0* untuk kembali ke menu utama.`
  },
  4: {
    title: '*HUBUNGI CUSTOMER SERVICE*',
    body: `Anda dapat menghubungi Customer Service melalui:

📞 Telepon: 021-12345678
📧 Email: cs@perusahaan.com
💬 WhatsApp: 08123456789

Atau kirim pesan langsung ke sini dan kami akan membantu Anda.

Ketik *0* untuk kembali ke menu utama.`
  },
  5: {
    title: '*FAQ - FREQUENTLY ASKED QUESTIONS*',
    body: `Pertanyaan yang sering diajukan:

1. Bagaimana cara reset password?
2. Berapa lama proses pendaftaran?
3. Apakah ada biaya pendaftaran?
4. Bagaimana cara upgrade akun?

Ketik nomor (1/2/3/4) untuk melihat jawaban.
Ketik *0* untuk kembali ke menu utama.`,
    children: {
      1: 'Untuk reset password, silakan klik "Lupa Password" di halaman login dan ikuti instruksi yang dikirimkan ke email Anda.',
      2: 'Proses pendaftaran biasanya memakan waktu 1-3 hari kerja setelah dokumen lengkap diterima.',
      3: 'Pendaftaran *GRATIS* tidak dipungut biaya apapun. Waspada penipuan!',
      4: 'Untuk upgrade akun, silakan hubungi customer service kami dengan menyertakan data diri Anda.'
    }
  }
};

module.exports = { mainMenu, subMenus };
