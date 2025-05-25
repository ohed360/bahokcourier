import express from 'express';
import Parcel from '../models/Parcel.js';
import auth from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.post('/', auth(['customer']), async (req, res) => {
  const { receiverName, receiverAddress, weight } = req.body;
  const parcel = new Parcel({
    sender: req.user.id,
    receiverName, receiverAddress, weight,
    trackingNumber: 'TRK-' + uuidv4()
  });
  await parcel.save();
  res.json(parcel);
});

router.get('/', auth(), async (req, res) => {
  let parcels;
  if (req.user.role==='customer') parcels = await Parcel.find({ sender: req.user.id });
  else if (req.user.role==='deliveryman') parcels = await Parcel.find({ deliveryman: req.user.id });
  else parcels = await Parcel.find();
  res.json(parcels);
});

router.patch('/:id/status', auth(['deliveryman','admin']), async (req, res) => {
  const { status } = req.body;
  const parcel = await Parcel.findById(req.params.id);
  parcel.status = status;
  parcel.deliveryman = req.user.id;
  await parcel.save();
  res.json(parcel);
});

export default router;