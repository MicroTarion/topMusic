import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB);

export default mongoose;