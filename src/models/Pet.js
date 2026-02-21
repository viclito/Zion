import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  category: {
    type: String,
    enum: ['silkie', 'pleasant', 'bramma', 'hen'],
    required: [true, 'Please specify the pet category.'],
  },
  avail: {
    type: String,
    required: [true, 'Please specify availability.'],
    default: 'Available',
  },
  stock: {
    type: Number,
    required: [true, 'Please specify the available stock quantity.'],
    default: 1,
    min: 0,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  mainImage: {
    type: String,
    required: [true, 'Please provide the main image URL.'],
  },
  basePrice: {
    type: Number,
    required: [true, 'Please specify the starting base price in INR.'],
  },
  discountedPrice: {
    type: Number,
    default: null,
  },
  gallery: {
    type: [String],
    default: [],
  },
  allowedDeliveryMethods: {
    type: [String],
    enum: [
      'Door Delivered',
      'Pay amount and receive through Courier',
      'Come and collect the product'
    ],
    default: ['Come and collect the product'], // Default safety to pickup
    set: v => v && v.length > 0 ? v : ['Come and collect the product']
  },
}, {
  timestamps: true,
});

// Force Mongoose to recompile the schema so Next.js HMR doesn't cache the old one
if (mongoose.models.Pet) {
  delete mongoose.models.Pet;
}

export default mongoose.model('Pet', PetSchema);
