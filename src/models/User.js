import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address.'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Don't return password by default
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
  },
  isApproved: {
    type: Boolean,
    default: function() {
      // By default, regular users are approved. Admins need specific email approval.
      if (this.role === 'user') return true;
      return false;
    }
  },
  approvalToken: {
    type: String,
    select: false,
  },
  // Extended User Profile
  address: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  details: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
