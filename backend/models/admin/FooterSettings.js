import mongoose from 'mongoose';

const footerSettingsSchema = new mongoose.Schema({
  privacyPolicy: String,
  termsOfService: String,
  socialLinks: {
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String,
  },
});

export default mongoose.model('FooterSettings', footerSettingsSchema);
