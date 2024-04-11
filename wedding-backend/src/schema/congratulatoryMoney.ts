import * as mongoose from 'mongoose';

const people = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  phone: { type: String, required: false },
  money: { type: Number, required: true },
  ticket: { type: Number, required: true },
});

export const CongratulatoryMoneySchema = new mongoose.Schema(
  {
    weddingId: { type: String, required: true },
    groom: { type: [people], required: true, default: [] },
    bride: { type: [people], required: true, default: [] },
    groomMoney: { type: Number, required: true, default: 0 },
    brideMoney: { type: Number, required: true, default: 0 },
    totalMoney: { type: Number, required: true, default: 0 },
  },
  { collection: 'congratulatoryMoney' },
);
