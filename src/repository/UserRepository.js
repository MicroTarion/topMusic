import mongoose from "../../app/database-mongo.js";

const schema = mongoose.Schema({
  email : { type: String, unique: true },
  lastname : { type: String},
  firstname : { type: String},
  password : { type: String},
  createdAt: { type: Date, default: Date.now()}
});
export default mongoose.model('user', schema);