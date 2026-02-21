import dbConnect from '@/lib/db';
import Offer from '@/models/Offer';

export async function getOffers(query = {}) {
  await dbConnect();
  // Sort by newest first
  const offers = await Offer.find(query).sort({ createdAt: -1 }).lean();
  return offers;
}

export async function getOfferById(id) {
  await dbConnect();
  const offer = await Offer.findById(id).lean();
  return offer;
}

export async function createOffer(data) {
  await dbConnect();
  const offer = await Offer.create(data);
  return offer;
}

export async function updateOffer(id, data) {
  await dbConnect();
  const offer = await Offer.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
  return offer;
}

export async function deleteOffer(id) {
  await dbConnect();
  const deletedOffer = await Offer.findByIdAndDelete(id).lean();
  return deletedOffer;
}
