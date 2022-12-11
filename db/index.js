import mongoose from 'mongoose';

export default mongoose.model('Order', new mongoose.Schema({
  name: String,
  phone: String,
  count: Number,
}));

mongoose.connect(process.env.MONGO);