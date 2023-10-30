import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: BigInt,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  verificationToken: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
