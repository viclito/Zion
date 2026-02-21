import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an offer title.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide an offer description.'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an offer image URL.'],
  },
  discountCode: {
    type: String,
    default: '',
    uppercase: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed_amount', 'free_item', 'none'],
    default: 'none',
  },
  discountValue: {
    type: Number,
    default: null,
  },
  freeItemDescription: {
    type: String,
    default: '',
  },
  minOrderValue: {
    type: Number,
    default: 0,
  },
  validUntil: {
    type: Date,
    default: null, // Null means it never expires naturally
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  targetLink: {
    type: String,
    default: '/',
  }
}, {
  timestamps: true,
});

// Force Mongoose to recompile the schema so Next.js HMR doesn't cache the old one
if (mongoose.models.Offer) {
  delete mongoose.models.Offer;
}

export default mongoose.model('Offer', OfferSchema);
