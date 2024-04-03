import * as mongoose from 'mongoose';

const HallSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  floor: { type: Number, required: true },
  size: { type: String, required: true }
});

export const CompanyInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  addr: { type: String, required: true },
  phone: { type: String, required: false },
  hallList: { type: [HallSchema], required: false },
}, {collection: 'companyInfo'});
