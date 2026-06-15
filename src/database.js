const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI tidak ditemukan di environment variables');
  }
  if (isConnected) return;
  await mongoose.connect(uri);
  isConnected = true;
  console.log('✓ Terhubung ke MongoDB');
}

module.exports = { connectDB };
