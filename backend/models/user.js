const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true},
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['admin', 'candidate'], default: 'candidate' }
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
