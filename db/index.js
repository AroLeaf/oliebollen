import mongoose from 'mongoose';

export default mongoose.model('Order', new mongoose.Schema({
  name: String,
  email: String,
  oliebollen: Number,
  rolletjes: Number,
  address: String,
  isForDelivery: Boolean,
  cancelled: Boolean,
}));

mongoose.connect(process.env.MONGO);