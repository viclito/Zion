import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const OrderSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Snapshot of customer details at the time of order in case they change their profile later
  customerSnapshot: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    details: { type: String, default: '' },
  },
  deliveryMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  appliedDiscountCode: {
    type: String,
    default: '',
  },
  discountBreakdown: {
    type: String,
    default: '',
  },
  messages: {
    type: [MessageSchema],
    default: [],
  },
  adminHasReplied: {
    type: Boolean,
    default: false,
  },
  expectedDeliveryDate: {
    type: Date,
    default: null,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  feedback: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

// Force Mongoose to recompile the schema so Next.js HMR doesn't cache the old one
if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

export default mongoose.model('Order', OrderSchema);
