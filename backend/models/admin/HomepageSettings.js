import mongoose from 'mongoose';

const homepageSettingsSchema = new mongoose.Schema({
    fontSize: { type: String, required: true },
    bgColor: { type: String, required: true },
    privacyPolicy: { type: String, required: true },
    termsOfService: { type: String, required: true },
    socialLinks: {
        twitter: { type: String },
        facebook: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
    },
});

const HomepageSettings = mongoose.model('HomepageSettings', homepageSettingsSchema);

export default HomepageSettings;
