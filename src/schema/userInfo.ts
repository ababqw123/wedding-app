import * as mongoose from 'mongoose';

export const UserInfoSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  pass: { type: String, required: true },
  phone: { type: String, required: false },
  name: { type: String, required: false },
}, {collection: 'userInfo'});
