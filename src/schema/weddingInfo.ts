import * as mongoose from 'mongoose';

export const UserInfoSchema = new mongoose.Schema({
  date: { type: String, required: true },
  people: {
    type: {
      groomName: String,
      groomFather: String,
      groomMother: String,
      brideName: String,
      brideFather: String,
      brideMother: String,
    },
    required: true,
  },
  company: { type: String, required: false },
  hall: { type: String, required: false },
}, {collection: 'weddingInfo'});
