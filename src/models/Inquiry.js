import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the sender name'],
  },
  email: {
    type: String,
    // Email may be optional if they only provide a phone number in certain forms
    default: '',
  },
  phone: {
    type: String,
    required: [true, 'Please provide the sender phone number'],
  },
  subject: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  category: {
    // Defines what specific pet category or page the inquiry originated from
    type: String,
    default: 'General',
  },
  type: {
    type: String,
    enum: ['General Contact', 'Pet Inquiry'],
    default: 'General Contact',
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Archived'],
    default: 'New',
  },
}, {
  timestamps: true,
});

if (mongoose.models.Inquiry) {
  delete mongoose.models.Inquiry;
}

export default mongoose.model('Inquiry', InquirySchema);
