import mongoose from "../../app/database-mongo.js";

const schema = mongoose.Schema({
  title : { type: String, unique: true },
  deezerId: {type: Number,unique:true},
  artist : { type: String},
  album : { type: String},
  preview : { type: String},
  image : { type: String},
  addedAt: { type: Date, default: Date.now()}
});
export default mongoose.model('song', schema);