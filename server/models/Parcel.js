import mongoose from 'mongoose';

const parcelSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverName: String,
  receiverAddress: String,
  weight: Number,
  status: { type: String, enum: ['pending','picked','in-transit','delivered'], default: 'pending' },
  trackingNumber: String,
  deliveryman: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Parcel', parcelSchema);