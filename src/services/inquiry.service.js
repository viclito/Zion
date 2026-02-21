import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';

export async function getInquiries(query = {}) {
  await dbConnect();
  const inquiries = await Inquiry.find(query).sort({ createdAt: -1 }).lean();
  return inquiries;
}

export async function createInquiry(data) {
  await dbConnect();
  const inquiry = await Inquiry.create(data);
  return inquiry;
}

export async function updateInquiryStatus(id, status) {
  await dbConnect();
  const inquiry = await Inquiry.findByIdAndUpdate(
    id, 
    { status }, 
    { new: true, runValidators: true }
  ).lean();
  return inquiry;
}

export async function deleteInquiry(id) {
  await dbConnect();
  const deletedInquiry = await Inquiry.findByIdAndDelete(id).lean();
  return deletedInquiry;
}
