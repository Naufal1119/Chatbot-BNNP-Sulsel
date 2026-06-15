const mongoose = require('mongoose');

const credsSchema = new mongoose.Schema({
  _id: String,
  data: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const keySchema = new mongoose.Schema({
  _id: String,
  type: String,
  data: mongoose.Schema.Types.Mixed
}, { timestamps: true });

keySchema.index({ type: 1 });

const Creds = mongoose.model('Creds', credsSchema);
const Key = mongoose.model('Key', keySchema);

async function useMongoDBAuthState() {
  let creds = await Creds.findById('whatsapp-creds');

  const writeToMongo = async (data, type) => {
    if (type === 'creds') {
      await Creds.findByIdAndUpdate('whatsapp-creds', { data }, { upsert: true });
    } else {
      const bulkOps = Object.entries(data[type] || {}).map(([id, value]) => ({
        updateOne: {
          filter: { _id: `${type}-${id}`, type },
          update: { data: value },
          upsert: true
        }
      }));
      if (bulkOps.length > 0) {
        await Key.bulkWrite(bulkOps);
      }
    }
  };

  const state = {
    creds: creds ? creds.data : null,
    keys: {
      get: async (type, ids) => {
        const keys = await Key.find({ type, _id: { $in: ids.map(id => `${type}-${id}`) } });
        const result = {};
        for (const key of keys) {
          const id = key._id.replace(`${type}-`, '');
          result[id] = key.data;
        }
        return result;
      },
      set: async (data) => {
        for (const type of Object.keys(data)) {
          await writeToMongo(data, type);
        }
      },
      has: async (ids) => {
        const keys = await Key.find({ type: { $in: Object.keys(ids) } }).limit(1);
        return keys.length > 0;
      }
    }
  };

  const saveCreds = async () => {
    await writeToMongo({ creds: state.creds }, 'creds');
  };

  return { state, saveCreds };
}

module.exports = { useMongoDBAuthState };
